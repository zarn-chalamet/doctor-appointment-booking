import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from "../../contextApi/DoctorContext";
import { assets } from '../../assets/assets_admin/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function DoctorAppointments() {
  const { backendUrl, dToken, appointments, getAppointments } = useContext(DoctorContext);

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getAppointments();
  }, [dToken]);

  // Function to handle filter
  const handleFilter = (appointments) => {
    if (filter === "All") return appointments;
    if(filter === 'Cancelled'){
      return appointments.filter((appointment) => appointment.cancelled === true)
    }
    if(filter === 'Finished'){
      return appointments.filter((appointment) => appointment.isCompleted === true)
    }
    return;
  };

  // Filter and search appointments
  const filteredAppointments = handleFilter(appointments);

  // Handle filter button click
  const handleFilterClick = (status) => {
    setFilter(status);
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments(); // Refresh data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments(); // Refresh data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-2 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Doctor Appointments</h2>

      <div>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${filter === "All" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
            onClick={() => handleFilterClick("All")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${filter === "Finished" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
            onClick={() => handleFilterClick("Finished")}
          >
            Finished
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${filter === "Cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
            onClick={() => handleFilterClick("Cancelled")}
          >
            Cancelled
          </button>
        </div>
      
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No appointments available.</p>
      ) : (
        <div className="bg-white mt-4 md:p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-left">
                <th className="p-2 md:p-4">#</th>
                <th className="p-2 md:p-4">Patient</th>
                <th className="p-2 md:p-4">Date of Birth</th>
                <th className="p-2 md:p-4">Fees</th>
                <th className="p-2 md:p-4 text-center">Status</th>
                <th className="p-2 md:p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-2 md:p-4 text-gray-700">{index + 1}</td>
                  <td className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3">
                    <img
                      src={appointment.user.image || assets.default_avatar}
                      alt="User"
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full border shadow-sm"
                    />
                    <span className="text-sm md:text-base font-medium text-gray-800">{appointment.user.username}</span>
                  </td>
                  <td className="p-2 md:p-4 text-gray-600 text-sm md:text-base">{appointment.user.dob}</td>
                  <td className="p-2 md:p-4 text-green-600 font-semibold text-sm md:text-base">${appointment.amount}</td>
                  <td className="p-2 md:p-4 text-center">
                    {appointment.cancelled ? (
                      <span className="px-2 py-1 md:px-3 md:py-1 text-red-600 bg-red-100 rounded-full text-xs md:text-sm font-semibold">Cancelled</span>
                    ) : appointment.isCompleted ? (
                      <span className="px-2 py-1 md:px-3 md:py-1 text-green-600 bg-green-100 rounded-full text-xs md:text-sm font-semibold">Completed</span>
                    ) : (
                      <span className="px-2 py-1 md:px-3 md:py-1 text-blue-600 bg-blue-100 rounded-full text-xs md:text-sm font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-2 md:p-4 flex justify-center items-center space-x-2 md:space-x-4">
                    {!appointment.cancelled && !appointment.isCompleted && (
                      <div className="flex space-x-2 md:space-x-4">
                        <button
                          onClick={() => cancelAppointment(appointment._id)}
                          className="p-1 md:p-2 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition shadow-md text-xs md:text-sm"
                        >
                          ❌ Cancel
                        </button>
                        <button
                          onClick={() => completeAppointment(appointment._id)}
                          className="p-1 md:p-2 border border-green-600 hover:bg-green-600 text-green-600 hover:text-white rounded-lg transition shadow-md text-xs md:text-sm"
                        >
                          ✅ Complete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
