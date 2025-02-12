import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../contextApi/DoctorContext'
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DSidebar from "../../components/DSidebar"

export default function Dlayout() {

  const {dToken,setDToken} = useContext(DoctorContext);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(dToken)
  },[dToken])

  const logout = () => {
    dToken && setDToken("");
    dToken && localStorage.removeItem('dToken')
    navigate("/")
  }
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        <div className="">
          <DSidebar/>
        </div>
        <div className="flex-1 p-6 bg-white shadow-inner overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
