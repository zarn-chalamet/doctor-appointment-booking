import { useContext } from "react";
import Login from "./pages/Login";
import { AdminContext } from "./contextApi/AdminContext";
import Layout from "./pages/admin/Layout";
import { DoctorContext } from "./contextApi/DoctorContext";
import Dlayout from "./pages/doctor/Dlayout";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div>
      {aToken && !dToken ? (
        <Layout />
      ) : dToken && !aToken ? (
        <Dlayout />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
