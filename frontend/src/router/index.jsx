import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Doctors from "../pages/Doctors"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Home from "../pages/Home"
import LoginForm from "../pages/auth/Login";
import SignUpForm from "../pages/auth/SignUp";
import MyProfile from "../pages/MyProfile";
import MyAppointment from "../pages/MyAppointment";
import Doctor from "../pages/Doctor";
import EmailVerify from "../pages/auth/EmailVerify"
import ResetPassword from "../pages/auth/ResetPassword"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/doctors",
        element: <Doctors/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/login",
        element: <LoginForm/>
      },
      {
        path: "/register",
        element: <SignUpForm/>
      },
      {
        path: "/profile",
        element: <MyProfile/>
      },
      {
        path: "/my-appointments",
        element: <MyAppointment/>
      },
      {
        path: "/appointments/:id",
        element: <Doctor/>
      },
      {
        path: "/email-verify",
        element: <EmailVerify/>
      },
      {
        path: "/reset-pass",
        element: <ResetPassword/>
      },
    ]
  }, 
]);

export default router;
