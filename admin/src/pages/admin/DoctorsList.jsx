import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../contextApi/AdminContext'

export default function DoctorsList() {
  const {aToken,doctors,changeAvailability,getAllDoctors} = useContext(AdminContext);

  useEffect(() => {
      if (aToken) {
        getAllDoctors();
      }
    }, [aToken, getAllDoctors]);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All Doctors</h2>
      <div className="grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
      {doctors.map((doctor,index) => (
        <div onClick={()=>{}} key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:transition-all duration-500">
                    
            <img className="bg-blue-50" src={doctor.image} alt="" />
            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center">
                    <input type="checkbox" onChange={()=>changeAvailability(doctor._id)} checked={doctor.available}/>
                    <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
            </div>
        </div>
          ) 
            
          )}
        </div>
      </div>
      
  )
}
