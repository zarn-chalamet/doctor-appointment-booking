import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {AuthContext} from "../contextApi/AuthContext"
import RelatedDoctor from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";

export default function Doctor() {

  const {doctor,backendUrl,isLoggedIn,getDoctorById} = useContext(AuthContext)
  const { id } = useParams();
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  const getAvailableSlots = async () => {
    let today = new Date();
    let slotsArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slotsArray.push(timeSlots);
    }
    setDocSlots(slotsArray);
  };

  useEffect(()=>{
    getDoctorById(id);
    setCurrentDoctor(doctor);
  },[id,doctor])

  // useEffect(() => {
  //   const foundDoctor = doctors.find((doctor) => doctor._id === id);
  //   setCurrentDoctor(foundDoctor);
  //   console.log(foundDoctor)
  //   console.log("found doctor")
  // }, [id]);

  useEffect(() => {
    getAvailableSlots();
  }, [id]);

  if (!currentDoctor) {
    return <p className="text-center text-gray-500">Loading doctor details...</p>;
  }

  const bookAppointment = async () => {
    if(!isLoggedIn){
      toast.warn('login to book appointment')
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day +"_"+month+"_"+year

      const {data} = await axios.post(backendUrl+"/api/auth/book-appointment",{docId:currentDoctor._id,slotDate,slotTime})
      if(data.success){
        toast.success(data.message);
        getDoctorById(id);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      {/* Doctor Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row w-full max-w-4xl">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={currentDoctor.image}
            alt={currentDoctor.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-lg border-4 border-blue-500 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">{currentDoctor.name}</h2>
          <p className="text-blue-600 font-medium">{currentDoctor.speciality}</p>
        </div>
        <div className="md:ml-6 mt-4 md:mt-0 flex-1">
          <div className="mt-4 space-y-3 text-gray-700">
            <p><strong>🎓 Degree:</strong> {currentDoctor.degree}</p>
            <p><strong>💼 Experience:</strong> {currentDoctor.experience} years</p>
            <p><strong>📝 About:</strong> {currentDoctor.about}</p>
            <p><strong>💰 Fees:</strong> ${currentDoctor.fees}</p>
            <p><strong>📍 Address:</strong> {currentDoctor.address.line1}, {currentDoctor.address.line2}</p>
          </div>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-4xl">
        <p className="text-lg font-semibold text-gray-700">Booking Slots</p>

        {/* Day Selection */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-4 px-3 min-w-16 rounded-lg cursor-pointer transition-all ${
                  slotIndex === index
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-gray-300 text-gray-600"
                } hover:bg-blue-500 hover:text-white`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time Slot Selection */}
        <div className="flex items-center gap-3 w-full overflow-x-auto whitespace-nowrap mt-4 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm font-medium px-5 py-2 rounded-full cursor-pointer transition-all ${
                  item.time === slotTime
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 border border-gray-400 hover:bg-blue-400 hover:text-white"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        {/* Booking Button */}
        <div className="mt-6 flex justify-center">
          <button onClick={bookAppointment} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md">
            Book Appointment
          </button>
        </div>
      </div>

      {/* Related Doctors Section */}
      <div>
        <RelatedDoctor docId={currentDoctor._id} speciality={currentDoctor.speciality} />
      </div>
    </div>
  );
}
