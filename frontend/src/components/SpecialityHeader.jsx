import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function SpecialityHeader() {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollContainerRef = useRef(null);

  // Function to check if content is overflowing
  const checkOverflow = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsOverflowing(container.scrollWidth > container.clientWidth);
    }
  };

  // Function to handle horizontal scrolling
  const scrollContainer = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 300; // Adjust scroll distance
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Check for overflow when the component mounts and whenever the window is resized
  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find by Speciality
        </h3>
        <p className="text-gray-600 mt-4">
          Simply browse through our extensive list of trusted doctors, schedule
          <br className="hidden md:block" />
          your appointment hassle-free.
        </p>
      </div>

      {/* Horizontal Scrollable Specialities */}
      <div className="relative">
        {/* Left Scroll Button */}
        {isOverflowing && (
          <button
            onClick={() => scrollContainer("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-10"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        )}

        {/* Scrollable Items */}
        <div
          ref={scrollContainerRef}
          id="scroll-container"
          className={`flex overflow-x-auto gap-6 px-8 py-4 scroll-smooth hide-scrollbar ${
            !isOverflowing ? "justify-center" : ""
          }`}
        >
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 text-center w-48"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="h-20 w-20 mx-auto mb-4 rounded-full object-cover"
              />
              <p className="text-gray-800 font-semibold text-lg">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>

        {/* Right Scroll Button */}
        {isOverflowing && (
          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-10"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
