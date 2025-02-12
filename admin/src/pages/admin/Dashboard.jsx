import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../contextApi/AdminContext';
import { assets } from '../../assets/assets_admin/assets';
import { changeDateFormat } from '../../utils/helpers';
import DashboardCard from '../../components/DashboardCard';

export default function Dashboard() {
  const { aToken, dashboardData, getDashboardData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken, getDashboardData]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctors count */}
        <DashboardCard 
          icon={assets.doctor_icon} 
          count={dashboardData?.doctors || 0} 
          label="Doctors" 
        />

        {/* Appointments count */}
        <DashboardCard 
          icon={assets.appointments_icon} 
          count={dashboardData?.appointments || 0} 
          label="Appointments" 
        />

        {/* Patients count */}
        <DashboardCard 
          icon={assets.patients_icon} 
          count={dashboardData?.patients || 0} 
          label="Patients" 
        />
      </div>

      {/* Latest Appointments */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <img src={assets.appointment_icon} alt="Appointment Icon" className="w-6 h-6" />
          <p className="text-lg font-semibold">Latest Appointments</p>
        </div>
        <div>
          {dashboardData?.latestAppointments?.length ? (
            dashboardData.latestAppointments.map((appointment, index) => (
              <div
                className="flex justify-between items-center p-4 border-b last:border-b-0"
                key={index}
              >
                <div className="flex items-center gap-3">
                  <img className="w-14 h-14 rounded-full object-cover" src={appointment.doctor.image} alt={appointment.doctor.name} />
                  <div>
                    <p className="font-semibold">{appointment.doctor.name}</p>
                    <p className="text-sm text-gray-600">Booking on {changeDateFormat(appointment.slotDate)}</p>
                  </div>
                </div>
                <button className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                  <span className="text-center mb-1">x</span>
                </button>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No recent appointments available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
