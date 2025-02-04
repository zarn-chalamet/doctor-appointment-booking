import React from "react";
import { doctors } from "../assets/assets_frontend/assets";

export default function MyAppointment() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Appointments</h2>

      <div className="space-y-4">
        {doctors.slice(0, 2).map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-md p-4">
            {/* Doctor Image */}
            <div className="w-full md:w-1/4 flex justify-center md:justify-start">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-2 border-blue-500"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 p-4">
              <h3 className="text-lg font-bold text-gray-700">{item.name}</h3>
              <p className="text-blue-600 font-medium">{item.speciality}</p>
              <p className="text-gray-600 mt-2">
                <strong>Address:</strong> {item.address.line1}, {item.address.line2}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold text-gray-800">Date & Time:</span> 25, July, 2024 | 8:30 PM
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
