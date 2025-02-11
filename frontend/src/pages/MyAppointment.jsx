import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import { changeDateFormat } from "../utils/helper";
import { toast } from "react-toastify";
import axios from "axios";

export default function MyAppointment() {
  
  const {appointments,getUserAppointments,backendUrl} = useContext(AuthContext);

  const cancelAppointment = async (appointmentId) => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl+"/api/auth/cancel-appointment",{appointmentId})

      if(data.success){
        toast.success(data.message)
        getUserAppointments();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    getUserAppointments();
  },[])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Appointments</h2>

      <div className="space-y-4">
        {appointments.map((item, index) => (
          
          <div key={index} className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-md p-4">
            {/* Doctor Image */}
            <div className="w-full md:w-1/4 flex justify-center md:justify-start">
              <img
                src={item.doctor.image}
                alt={item.doctor.name}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-blue-500"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 p-4">
              <h3 className="text-lg font-bold text-gray-700">{item.doctor.name}</h3>
              <p className="text-blue-600 font-medium">{item.doctor.speciality}</p>
              <p className="text-gray-600 mt-2">
                <strong>Address:</strong> {item.doctor.address}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold text-gray-800">Date & Time:</span> {changeDateFormat(item.slotDate) + " | " + item.slotTime} 
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-2">
              {
                !item.cancelled && <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Pay Online
              </button>
              }
              {
                !item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Cancel Appointment
              </button>
              }
              {
                item.cancelled && <button className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition ">
                Appointment Cancelled
              </button>
              }
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
