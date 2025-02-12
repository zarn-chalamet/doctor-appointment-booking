import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../contextApi/DoctorContext'

export default function DoctorProfile() {
  const {dToken, currentDoctor,getProfileData} = useContext(DoctorContext);

  useEffect(()=>{
    getProfileData();

  },[dToken])
  return (
    <div>
      <h2>Doctor Profile</h2>
      <div>
        <img src={currentDoctor.image} alt="" />
        <p>{currentDoctor.available ? 'available' : 'not available'}</p>
        <p>{currentDoctor.name}</p>
        <p>{currentDoctor.email}</p>
        <p>{currentDoctor.degree}</p>
        <p>{currentDoctor.address}</p>
        <p>{currentDoctor.degree}</p>
        <p>{currentDoctor.experience}</p>
        <p>{currentDoctor.speciality}</p>
        <p>{currentDoctor.fees}</p>
      </div>
    </div>
  )
}
