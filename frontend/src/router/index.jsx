import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Doctors from "../pages/Doctors"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Home from "../pages/Home"
import LoginForm from "../pages/auth/Login";
import SignUpForm from "../pages/auth/SignUp";

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
      }
    ]
  }, 
]);

export default router;
