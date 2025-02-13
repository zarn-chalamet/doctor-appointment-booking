import { useContext, useRef, useState } from "react";
import {AuthContext} from "../../contextApi/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const { backendUrl, isLoggedIn, userData, getUserData} = useContext(AuthContext);

    const [finishSentResetOtp,setFinishSendResetOtp] = useState(false);
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [newPassword,SetNewPassword] = useState("");

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


    const sendResetOtp = async (e) => {
        try {
            e.preventDefault();
            const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp',{email});

            if(data.success){
                setFinishSendResetOtp(true);
                toast.success(data.message);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const checkOtp = (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e=>e.value);
        setOtp(otpArray.join(''));
        setIsOtpSubmitted(true);
    }

    const submitResetPasswordForm = async (e) => {
        try {
            e.preventDefault();
            const {data} = await axios.post(backendUrl+"/api/auth/reset-password",{email,otp,newPassword})
            if(data.success){
                toast.success(data.message);
                getUserData();
                navigate("/login");
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        
    };

    return (
      <>
      {!finishSentResetOtp && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-center text-gray-800">Reset Password</h4>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your registered email address
          </p>
          <form onSubmit={sendResetOtp} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                value={email}
                onChange={e=>setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@domain.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Login
            </a>
          </p>
        </div>
      </div>
      )}

      {finishSentResetOtp && !isOtpSubmitted && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-center text-gray-800">Reset Password</h4>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter OTP from your email
          </p>
          <form onSubmit={checkOtp} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
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
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Login
            </a>
          </p>
        </div>
      </div>
      )}

    {finishSentResetOtp && isOtpSubmitted && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-center text-gray-800">Reset Password</h4>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your new password
          </p>
          <form onSubmit={submitResetPasswordForm} className="mt-6 space-y-4">
            <div>
              <label
                
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                value={newPassword}
                onChange={e=>SetNewPassword(e.target.value)}
                type="password"
                
                className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Login
            </a>
          </p>
        </div>
      </div>
      )}
      </>
    );
  }
  