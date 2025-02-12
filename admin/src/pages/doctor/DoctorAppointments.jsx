import React, { useContext, useState } from 'react'
import {DoctorContext} from "../../contextApi/DoctorContext"

export default function DoctorAppointments() {

  const {dToken, appointments,getAppointments} = useContext(DoctorContext)

  useState(()=>{
    getAppointments();
    console.log(appointments)
  },[dToken])

  return (
    <div>
      <h2>Doctor Appointment</h2>
      <div>
        {
          appointments.map((appointment,index)=>(
            <div className='' key={index}>
              <p>index</p>
              <img src={appointment.user.image} alt="" />
              <p>{appointment.user.username}</p>
              <p>{appointment.user.dob}</p>
              <p>{appointment.user.fees}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
