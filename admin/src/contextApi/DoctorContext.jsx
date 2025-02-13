import axios from "axios";
import { createContext, useState } from "react";
import {toast} from "react-toastify"

export const DoctorContext = createContext();

const DoctorContextProvider = ({children}) => {

    const [dToken,setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [appointments,setAppointments] = useState([]);
    const [currentDoctor,setCurrentDoctor] = useState('');
    const [dashboardData,setDashboardData] = useState('');

    const getAppointments = async () => {
        try {
            const {data} = await axios.post(backendUrl+"/api/doctor/appointments",{},{headers:{dtoken: dToken}});
            console.log('get appointment')
            console.log(data);
            if(data.success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.success)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async () => {
        try {
            const {data} = await axios.post(backendUrl+"/api/doctor/change-availability",{},{headers:{dToken}})

            if(data.success){
                toast.success(data.message)
                getProfileData();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.post(backendUrl+'/api/doctor/current-doctor',{},{headers:{dtoken: dToken}})
            if(data.success){
                setCurrentDoctor(data.doctor);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashboardData = async () => {
        try {
            const {data} = await axios.post(backendUrl+'/api/doctor/dashboard',{},{headers:{dtoken: dToken}})
            if(data.success){
                setDashboardData(data.dashboardData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        dToken,setDToken,
        backendUrl,
        appointments,getAppointments,
        currentDoctor,getProfileData,
        dashboardData,getDashboardData,
        changeAvailability
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;