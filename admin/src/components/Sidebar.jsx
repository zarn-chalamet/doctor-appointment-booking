import React, { useContext, useState } from 'react';
import { AdminContext } from '../contextApi/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { FiMenu } from 'react-icons/fi'; // Importing a menu icon

export default function Sidebar() {
  const { aToken } = useContext(AdminContext);
  const [collapsed, setCollapsed] = useState(false); // Sidebar toggle state

  return (
    <div className={`h-full ${collapsed ? 'w-20' : 'w-64'} bg-white shadow-lg px-4 py-6 border-r-2 transition-all duration-300`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className="mb-4 p-2 rounded-lg hover:bg-gray-200 transition w-full flex justify-center"
      >
        <FiMenu className="text-gray-600 text-xl" />
      </button>

      {aToken && (
        <ul className="space-y-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center ${collapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              } transition`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
            {!collapsed && <p className="text-sm font-medium">Dashboard</p>}
          </NavLink>

          <NavLink
            to="/admin/appointments"
            className={({ isActive }) =>
              `flex items-center ${collapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              } transition`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
            {!collapsed && <p className="text-sm font-medium">Appointments</p>}
          </NavLink>

          <NavLink
            to="/admin/add-doctor"
            className={({ isActive }) =>
              `flex items-center ${collapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              } transition`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
            {!collapsed && <p className="text-sm font-medium">Add Doctor</p>}
          </NavLink>

          <NavLink
            to="/admin/doctors-list"
            className={({ isActive }) =>
              `flex items-center ${collapsed ? 'justify-center' : 'gap-4'} px-4 py-3 rounded-lg ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600 border-2'
              } transition`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-5 h-5" />
            {!collapsed && <p className="text-sm font-medium">Doctors List</p>}
          </NavLink>
        </ul>
      )}
    </div>
  );
}
