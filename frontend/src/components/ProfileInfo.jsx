import { useContext, useState } from "react";
import { getInitials } from "../utils/helper";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";

export const ProfileInfo = ({ onLogout }) => {
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      
      if(data.success){
        navigate('/email-verify');
        toast.success(data.message);
      }else{
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-blue-400 cursor-pointer"
          onClick={toggleModal}
        >
          {getInitials(userData?.username || "Guest")}
        </div>
        
      </div>

      {isModalOpen && (
        <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4">
          <ul className="space-y-2">
            <li>
              <button
                className="w-full text-left text-slate-900 hover:bg-slate-100 px-2 py-1 rounded"
                onClick={() => {
                  navigate("/profile")
                  toggleModal();
                }}
              >
                View Profile
              </button>
            </li>
            <li>
              <button
                className="w-full text-left text-slate-900 hover:bg-slate-100 px-2 py-1 rounded"
                onClick={() => {
                  navigate("/my-appointments")
                  toggleModal();
                }}
              >
                My Appointment
              </button>
            </li>
            { userData && !userData.isAccountVerified && (
              <li>
              <button
                className="w-full text-left text-slate-900 hover:bg-slate-100 px-2 py-1 rounded"
                onClick={() => {
                  console.log("Verify Account");
                  sendVerificationOtp();
                  toggleModal();
                }}
              >
                Verify Account
              </button>
            </li>
            )}
            
            <li>
              <button
                className="w-full text-left text-red-600 hover:bg-red-100 px-2 py-1 rounded"
                onClick={() => {
                  onLogout();
                  toggleModal();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
