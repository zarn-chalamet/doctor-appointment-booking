import { assets } from "../assets/assets_frontend/assets";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-10">ABOUT US</h1>
      
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img className="w-full h-auto rounded-lg shadow-lg" src={assets.about_image} alt="About Us" />
        </div>
        
        {/* Description Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. 
            We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements 
            to improve user experience and deliver superior service.
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision at <span className="font-semibold text-blue-600">Prescripto</span> is to create a seamless healthcare experience for every user. 
            We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
      
      
      {/* Why Choose Us */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">WHY CHOOSE US</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-blue-50 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-blue-600">EFFICIENCY</h4>
            <p className="text-gray-700 mt-2">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-blue-600">CONVENIENCE</h4>
            <p className="text-gray-700 mt-2">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold text-blue-600">PERSONALIZATION</h4>
            <p className="text-gray-700 mt-2">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
