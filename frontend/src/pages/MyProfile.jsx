import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AuthContext } from "../contextApi/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function MyProfile() {
  const { userData, backendUrl, setUserData, getUserData } = useContext(AuthContext);
  const [image, setImage] = useState(null); // Use null as the initial state for clarity
  const [previewImage, setPreviewImage] = useState(userData.image); // To handle image preview
  const [isEdit, setIsEdit] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG and PNG images are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB.");
        return;
      }

      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview selected image
    }
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) {
        formData.append("image", image);
      }

      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/update-profile`, formData);

      if (data.success) {
        toast.success(data.message);
        getUserData();
        setIsEdit(false);
        setImage(null); // Reset image after successful upload
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Profile Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div>
              <img
                className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
                src={previewImage || assets.contact_image}
                alt="Profile"
              />
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        ) : (
          <div>
            <img
              className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
              src={userData.image || assets.contact_image}
              alt="Profile"
            />
          </div>
        )}

        {isEdit ? (
          <input
            type="text"
            value={userData.username}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="border px-2 py-1 rounded"
          />
        ) : (
          <h2 className="text-xl font-semibold">{userData.username}</h2>
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
            <strong>Address:</strong>{" "}
            {isEdit ? (
              <input
                type="text"
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              userData.address
            )}
          </p>
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
                <option value="Prefer not to say">Prefer not to say</option>
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
            onClick={updateUserProfileData}
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
