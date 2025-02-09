import React, { useContext, useState } from 'react'
import {assets} from "../../assets/assets_admin/assets"
import {AdminContext} from "../../contextApi/AdminContext"
import {toast} from "react-toastify";
import axios from "axios"

export default function AddDoctor() {

  const {backendUrl, aToken} = useContext(AdminContext);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [image,setImage] = useState(false);
  const [speciality,setSpeciality] = useState("General physician");
  const [degree,setDegree] = useState("");
  const [experience,setExperience] = useState("1 Year");
  const [about,setAbout] = useState("");
  const [fees,setFees] = useState("");
  const [address,setAddress] = useState("");

  const submitDoctor = async (e) => {
    e.preventDefault();
    try {
      if(!image){
        toast.error("No image is uploaded!")
        return;
      }
      
      const formData = new FormData()
      formData.append('image',image),
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('experience',experience)
      formData.append('about',about)
      formData.append('fees',Number(fees))
      formData.append('address',address)

      const {data} = await axios.post(backendUrl+"/api/admin/add-doctor",formData,{headers: {aToken}})

      if(data.success){
        toast.success(data.message)
        setName('');
        setEmail('');
        setPassword('');
        setImage(false);
        setSpeciality('General physician');
        setDegree('');
        setExperience('1 year')
        setAbout('');
        setFees('');
        setAddress('');
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Add Doctor</h2>
        <div className=" flex flex-row items-center gap-4 mb-9 ml-10">
          <label htmlFor="doc-img">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
          </label>
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='doc-img' hidden/>
            <div>
              <span className="text-gray-400 text-sm">Upload doctor<br />picture</span>
            </div>
            
          </div>
        <div className="flex gap-6 justify-center">
          {/* Profile Picture Upload */}
          

          {/* Form Fields */}
          <div className="w-3/4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Speciality</label>
              <select
                value={speciality}
                onChange={(e)=>setSpeciality(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option>General physician</option>
                <option>Cardiologist</option>
                <option>Dentist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Email</label>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
              <input
                value={degree}
                onChange={(e)=>setDegree(e.target.value)}
                type="text"
                placeholder="Education"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Password</label>
              <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                value={experience}
                onChange={(e)=>setExperience(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option>1 year</option>
                <option>2 years</option>
                <option>3 years</option>
                <option>4 years</option>
                <option>5 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fees</label>
              <input
                value={fees}
                onChange={(e)=>setFees(e.target.value)}
                type="number"
                placeholder="Your fees"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
              <textarea
                value={about}
                onChange={(e)=>setAbout(e.target.value)}
                placeholder="Write about yourself"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button onClick={submitDoctor} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">Add Doctor</button>
        </div>
      </div>
    </div>
  );
}
 