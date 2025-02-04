import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Zarn Holland",
    image: assets.profile_pic,
    email: "zarnholland@gmail.com",
    phone: "+66 945458487",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2002-01-01",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Profile Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        <img
          src={userData.image}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-gray-300"
        />
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border px-2 py-1 rounded"
          />
        ) : (
          <h2 className="text-xl font-semibold">{userData.name}</h2>
        )}
      </div>

      {/* Contact Information */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Contact Information
        </h3>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border px-2 py-1 rounded"
              />
            ) : (
              userData.phone
            )}
          </p>
          <p>
            <strong>Address:</strong>
          </p>
          {isEdit ? (
            <div className="space-y-1">
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="border px-2 py-1 rounded w-full"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          ) : (
            <p>
              {userData.address.line1}, <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Basic Information
        </h3>
        <div className="space-y-2">
          <p>
            <strong>Gender:</strong>{" "}
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border px-2 py-1 rounded"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              userData.gender
            )}
          </p>
          <p>
            <strong>Birthday:</strong>{" "}
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border px-2 py-1 rounded"
              />
            ) : (
              userData.dob
            )}
          </p>
        </div>
      </div>

      {/* Edit & Save Buttons */}
      <div className="mt-6 text-center">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
