import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../contextApi/DoctorContext";

export default function DoctorProfile() {
  const { dToken, currentDoctor, getProfileData, changeAvailability } = useContext(DoctorContext);

  useEffect(() => {
    getProfileData();
  }, [dToken]);

  return (
    <div className="p-6 flex justify-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          <img
            src={currentDoctor.image}
            alt="Doctor"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{currentDoctor.name}</h2>
          <p className="text-gray-600">{currentDoctor.speciality}</p>
          <div className="flex flex-row items-center gap-2">
            <input className="mt-2" type="checkbox" onChange={()=>changeAvailability()} checked={currentDoctor.available}/>
            <p
              className={`text-sm px-3 py-1 rounded-full mt-2 ${
                currentDoctor.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              {currentDoctor.available ? "Available" : "Not Available"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">{currentDoctor.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Degree:</span>
            <span className="text-gray-800">{currentDoctor.degree}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Experience:</span>
            <span className="text-gray-800">{currentDoctor.experience} years</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Address:</span>
            <span className="text-gray-800">{currentDoctor.address}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Fees:</span>
            <span className="text-green-600 font-semibold">${currentDoctor.fees}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
