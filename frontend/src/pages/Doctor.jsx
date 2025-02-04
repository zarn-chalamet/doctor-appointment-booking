import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../assets/assets_frontend/assets";

export default function Doctor() {
  const { id } = useParams();
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    const foundDoctor = doctors.find((doctor) => doctor._id === id);
    setCurrentDoctor(foundDoctor);
  }, [id]);

  if (!currentDoctor) {
    return <p className="text-center text-gray-500">Loading doctor details...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row w-full max-w-3xl">
        
        {/* Doctor Image (Left Side) */}
        <div className="flex justify-center md:justify-start">
          <img
            src={currentDoctor.image}
            alt={currentDoctor.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-lg border-4 border-blue-500 object-cover"
          />
        </div>

        {/* Doctor Details (Right Side) */}
        <div className="md:ml-6 mt-4 md:mt-0 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">{currentDoctor.name}</h2>
          <p className="text-blue-600 font-medium">{currentDoctor.speciality}</p>

          <div className="mt-4 space-y-3 text-gray-700">
            <p><strong>🎓 Degree:</strong> {currentDoctor.degree}</p>
            <p><strong>💼 Experience:</strong> {currentDoctor.experience}</p>
            <p><strong>📝 About:</strong> {currentDoctor.about}</p>
            <p><strong>💰 Fees:</strong> ${currentDoctor.fees}</p>
            <p><strong>📍 Address:</strong> {currentDoctor.address.line1}, {currentDoctor.address.line2}</p>
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
