import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../contextApi/AdminContext";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const {aToken,setAToken} = useContext(AdminContext)

  const logout = () => {
    aToken && setAToken("");
    aToken && localStorage.removeItem('aToken')
    navigate("/")
  }
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className="bg-blue-500 text-white text-sm px-10 py-2 rounded-full ">Logout</button>
    </div>
  );
}
