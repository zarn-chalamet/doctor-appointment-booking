import axios from "axios";
import { useContext, useEffect, useRef} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextApi/AuthContext";

export default function EmailVerify() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const { backendUrl, isLoggedIn, userData, getUserData} = useContext(AuthContext);
  const inputRefs = useRef([]);

  const handleInput = (e,index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length -1){
        inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e,index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
        inputRefs.current[index -1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index) => {
        if(inputRefs.current[index]){
            inputRefs.current[index].value = char;
        }
    })
  }

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e=>e.value);
        const otp = otpArray.join('');

        const {data} = await axios.post(backendUrl+"/api/auth/verify-account",{otp})
        if(data.success){
            toast.success(data.message);
            getUserData();
            navigate("/");
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
    
  };

  useEffect(()=> {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/")
  },[isLoggedIn,userData])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Email Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 mb-2">
              Enter OTP
            </label>
            <div className="flex justify-between mb-8" onPaste={handlePaste}>
                {
                    Array(6).fill(0).map((_,index)=> (
                        <input type="text" maxLength='1' key={index} required className="w-12 h-12 bg-gray-700 text-white text-center text-xl rounded-md"
                        ref={e=> inputRefs.current[index] = e}
                        onInput={(e) => handleInput(e,index)}
                        onKeyDown={(e) => handleKeyDown(e,index)}
                        />
                    ))
                }
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
