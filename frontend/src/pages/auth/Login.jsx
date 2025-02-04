import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextApi/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginByGoogle = async () => {
    
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/reset-pass"
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <button
          onClick={loginByGoogle}
          className="flex items-center justify-center w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Login with Google
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-blue-500 hover:underline focus:outline-none">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
