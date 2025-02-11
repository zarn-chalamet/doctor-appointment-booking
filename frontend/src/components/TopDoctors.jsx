import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";


export default function TopDoctors() {
    const {doctors} = useContext(AuthContext)
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-16 px-10">
        {/* header */}
        
        <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
        <p className="sm:w-1/3 text-center text-sm">Simply browse through extensive list of trusted doctors.</p>
        
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
            
            {doctors.slice(0,12).map((doctor,index) => (
                
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
        </div>
        <button onClick={()=> {navigate('/doctors');scrollTo(0,0)}} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">More</button>
    </div>
  )
}
