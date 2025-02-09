import React, { useContext } from 'react';
import { AdminContext } from '../contextApi/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';

export default function Sidebar() {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="h-full w-64 bg-white shadow-lg px-4 py-6 border-r-2">
      {aToken && (
        <ul className="space-y-4">
          <NavLink
            to="/admin"
            end // Exact match for Dashboard
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
            <p className="text-sm font-medium">Dashboard</p>
          </NavLink>
          <NavLink
            to="/admin/appointments"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
            <p className="text-sm font-medium">Appointments</p>
          </NavLink>
          <NavLink
            to="/admin/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
            <p className="text-sm font-medium">Add Doctor</p>
          </NavLink>
          <NavLink
            to="/admin/doctors-list"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-5 h-5" />
            <p className="text-sm font-medium">Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
}
