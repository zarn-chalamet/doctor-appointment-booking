import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../contextApi/AdminContext";
import { changeDateFormat } from "../../utils/helpers";

export default function AllAppointments() {
  const { appointments, getAllAppointments } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  // Function to handle search
  const handleSearch = (appointments) => {
    return appointments.filter((appointment) => {
      const userName = appointment.user.username.toLowerCase();
      const doctorName = appointment.doctor.name.toLowerCase();
      const searchQueryLower = searchQuery.toLowerCase();
      return userName.includes(searchQueryLower) || doctorName.includes(searchQueryLower);
    });
  };

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
  const filteredAppointments = handleFilter(handleSearch(appointments));

  // Handle filter button click
  const handleFilterClick = (status) => {
    setFilter(status);
  };

  // Update appointments when component mounts
  useEffect(() => {
    getAllAppointments();
  }, [getAllAppointments]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Page Title */}
      <h2 className="sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">All Appointments</h2>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search appointments..."
          className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 sm:mb-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* User Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <span className="font-semibold text-gray-700 text-center sm:text-left">{index + 1}</span>
              <img className="w-12 h-12 rounded-full object-cover border mx-auto sm:mx-0" src={appointment.user.image} alt="User" />
              <div className="text-center sm:text-left">
                <p className="text-gray-800 font-medium">{appointment.user.username}</p>
                <p className="text-sm text-gray-500">{appointment.user.dob}</p>
              </div>
            </div>

            {/* Appointment Date & Time */}
            <p className="text-gray-600 text-sm text-center sm:text-left mt-2 sm:mt-0">
              {changeDateFormat(appointment.slotDate)} | {appointment.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 sm:mt-0">
              <img className="w-12 h-12 rounded-full object-cover border mx-auto sm:mx-0" src={appointment.doctor.image} alt="Doctor" />
              <p className="text-gray-800 font-medium text-center sm:text-left">{appointment.doctor.name}</p>
            </div>

            {/* Cancel Button */}
            <button className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition">
              <span className="text-center mb-1">x</span>
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
