import { assets } from "../assets/assets_frontend/assets";

export default function Header() {
  return (
    <div className="bg-blue-500 text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6 space-y-8 md:space-y-0">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Book Appointment <br /> With Trusted Doctors
          </h1>
          <div className="flex items-center space-x-4">
            <img
              src={assets.group_profiles}
              alt="Group Profiles"
              className="h-12 w-12 rounded-full border-2 border-white"
            />
            <p className="text-gray-100 text-lg">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>
          </div>
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition">
            Book appointment →
          </button>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.header_img}
            alt="Doctors"
            className="w-full max-w-md md:max-w-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
