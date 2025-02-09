import React, { useContext, useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import { AdminContext } from '../contextApi/AdminContext';
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [loginState,setLoginState] = useState("Doctor");

    const {setAToken,backendUrl} = useContext(AdminContext);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if(loginState === 'Admin'){
          const {data} = await axios.post(backendUrl + "/api/admin/login",{email,password})

          if(data.success){
            localStorage.setItem('aToken',data.token)
            setAToken(data.token)
            navigate("/admin");
          }else{
            toast.error(data.message)
          }
        }else{
          //doctor login
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800"><span className='text-blue-500'>{loginState}</span> Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

  

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Doctor login?{" "}
            <span onClick={()=> loginState === 'Doctor' ? setLoginState("Admin"):setLoginState("Doctor")} className="text-blue-500 hover:underline focus:outline-none">
              Login here
            </span>
        </p>
      </div>
    </div>
  )
}
