import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import {ProfileInfo} from "../components/ProfileInfo"

export default function Navbar() {
  const { isLoggedIn, backendUrl, setUserData, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("isLoggedIn")
  console.log(isLoggedIn)

  const onLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl+"/api/auth/logout");
      if(data.success){
        setIsLoggedIn(false)
        setUserData(false)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div>
        <NavLink to="/">
          <img src={assets.logo} alt="Logo" className="h-10" />
        </NavLink>
      </div>

      {/* Navigation NavLinks */}
      <div className="flex space-x-6">
        <NavLink to="/" className="text-gray-500
         hover:text-blue-500 font-medium">
          <span>HOME</span>
        </NavLink>
        <NavLink
          to="/doctors"
          className="text-gray-500
           hover:text-blue-500 font-medium"
        >
          <span>ALL DOCTORS</span>
        </NavLink>
        <NavLink
          to="/about"
          className="text-gray-500
           hover:text-blue-500 font-medium"
        >
          <span>ABOUT</span>
        </NavLink>
        <NavLink
          to="/contact"
          className="text-gray-500
           hover:text-blue-500 font-medium"
        >
          <span>CONTACT</span>
        </NavLink>
      </div>

      {/* Create Account Button */}
      {
        !isLoggedIn ?
        (<div>
          <button onClick={()=>{navigate("/register"); scrollTo(0,0)}} className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
            Create Account
          </button>
        </div>)
        :
        (
          <ProfileInfo onLogout={onLogout}/>
        )
      }
    </nav>
  );
}
