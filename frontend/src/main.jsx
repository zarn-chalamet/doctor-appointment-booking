import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router';
import {
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./contextApi/AuthContext"
import { ToastContainer } from "react-toastify"

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ToastContainer/>
    <RouterProvider router={router} />
  </AuthContextProvider>
  
)
