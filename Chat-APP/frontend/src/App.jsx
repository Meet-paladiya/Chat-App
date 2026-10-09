import React, { useContext } from "react";
import AppRoutes from "./routers/AppRoutes";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const {authUser} = useContext(AuthContext);
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster />
      <AppRoutes user={authUser}/>
    </div>
  );
};

export default App;
