import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext"

export default function RelatedDoctor({ docId, speciality }) {

  const {doctors} = useContext(AuthContext)
  const navigate = useNavigate();
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="w-full px-3 sm:px-0 pt-5">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Doctors</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relDocs.slice(0,12).map((doctor,index) => (
                <div onClick={()=>{navigate(`/appointments/${doctor._id}`)}} key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:transition-all duration-500">
                    
                    <img className="bg-blue-50" src={doctor.image} alt="" />
                    <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500">
                            <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                            <p>Available</p>
                        </div>
                        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                    </div>
                </div>
            ))}
      </div>
    </div>
  );
}
