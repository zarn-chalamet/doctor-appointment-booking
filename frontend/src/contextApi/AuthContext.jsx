import axios from "axios"
import { createContext, useEffect, useState } from "react"
import {toast} from "react-toastify"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn ,setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [doctor,setDoctor] = useState(null);

    const getAuthState = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/auth/is-auth");
            if(data.success){
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/user-data');
            console.log("userdata from context");
            console.log(data)
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list');
            console.log(data.doctors)
            if(data.success){
                setDoctors(data.doctors);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getSpecialityData = () => {
        return doctors.map((doctor) => ({
          speciality: doctor.speciality,
        }));
    };

    const getDoctorById = async (id) => {
        try {
            const {data} = await axios.get(backendUrl +"/api/doctor/"+id);
            if(data.success){
                setDoctor(data.doctor)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAuthState();
        getDoctorsData();
    },[])

    const value = {
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData,
        doctors,
        getSpecialityData,
        getDoctorById,
        doctor
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}