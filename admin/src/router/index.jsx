import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/admin/Dashboard";
import Layout from "../pages/admin/Layout";
import AllAppointments from "../pages/admin/AllAppointments"
import AddDoctor from "../pages/admin/AddDoctor"
import DoctorsList from "../pages/admin/DoctorsList"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  }, 
  {
    path: "/admin/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Dashboard/>
      },
      {
        path: 'appointments',
        element: <AllAppointments/>
      },
      {
        path: 'add-doctor',
        element: <AddDoctor/>
      },
      {
        path: 'doctors-list',
        element: <DoctorsList/>
      }
    ]
  }
]);

export default router;
