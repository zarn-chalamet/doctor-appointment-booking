import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    <>
      <div>
        <Link to={"/"}>
          HOME
        </Link>
        <Link to={"/doctors"}>
          ALL DOCTORS
        </Link>
        <Link to={"/about"}>
          ABOUT
        </Link>
        <Link to={"/contact"}>
          CONTACT
        </Link>
      </div>
      <div>
        <Outlet/>
      </div>
        
    </>
  )
}

export default App
