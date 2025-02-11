import React, { useContext, useState } from "react";
// import { specialityData } from "../assets/assets_frontend/assets"; // Replace with your doctors data
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";

export default function AllDoctors() {

  const {doctors,getSpecialityData} = useContext(AuthContext);
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");

  const navigate = useNavigate();


  const filteredDoctors =
    selectedSpeciality === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.speciality === selectedSpeciality);

  return (
    <div className=" min-h-screen">

      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Speciality Filters */}
          <aside>
            <h2 className="text-lg font-semibold mb-4">Browse through the doctors</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedSpeciality("All")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedSpeciality === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
              >
                All Specialities
              </button>
              {getSpecialityData().map((speciality) => (
                <button
                  key={speciality}
                  onClick={() => setSelectedSpeciality(speciality.speciality)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedSpeciality === speciality.speciality
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {speciality.speciality}
                </button>
              ))}
            </div>
          </aside>

          {/* Doctors Grid */}
          <section className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor,index) => (
              doctor.available &&
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
          </section>
        </div>
      </main>
    </div>
  );
}
