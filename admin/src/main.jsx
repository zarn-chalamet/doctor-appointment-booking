import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router';
import {
  RouterProvider,
} from "react-router-dom";
import AdminContextProvider from "./contextApi/AdminContext"
import DoctorContextProvider from "./contextApi/DoctorContext"
import AppContextProvider from "./contextApi/AppContext"
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify"

createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
        <ToastContainer/>
        <RouterProvider router={router} /> 
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>   
)
