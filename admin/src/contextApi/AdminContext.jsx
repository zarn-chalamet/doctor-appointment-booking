import { createContext, useEffect, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken'));

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors,setDoctors] = useState([]);
    const [appointments,setAppointments] = useState([])
    
    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl+"/api/admin/all-doctors",{},{headers:{aToken}});
            if(data.success){
                setDoctors(data.doctors);             
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl+"/api/admin/change-availability",{docId},{headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                getAllDoctors();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments =  async () => {
        try {
            const {data} = await axios.post(backendUrl+"/api/admin/appointments",{},{headers:{aToken}})
            console.log(aToken)
            console.log("this is geAllAppointments functions")
            console.log(data)
            if(data.success){
                setAppointments(data.appointments);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAllDoctors();
        getAllAppointments();
    },[])
    
    const value = {
        aToken,setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,getAllAppointments
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;