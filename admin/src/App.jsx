import { useContext } from "react"
import Login from "./pages/Login"
import { AdminContext } from "./contextApi/AdminContext"
import Layout from "./pages/admin/Layout";


function App() {
  const {aToken} = useContext(AdminContext);
  return (
    <div>
      {aToken ? <Layout/> : <Login/> }
    </div>
  )
}

export default App
