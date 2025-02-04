import { assets } from "../assets/assets_frontend/assets";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-6">CONTACT US</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div>
          <img className="w-full h-auto rounded-xl shadow-lg" src={assets.contact_image} alt="Contact" />
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700">OUR OFFICE</h2>
            <p className="text-gray-600 mt-2">
              54709 Willms Station, Suite 350, Washington, USA
            </p>
            <p className="text-gray-600 mt-1">Tel: (415) 555‑0132</p>
            <p className="text-gray-600 mt-1">Email: greatstackdev@gmail.com</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700">Careers at PRESCRIPTO</h2>
            <p className="text-gray-600 mt-2">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
