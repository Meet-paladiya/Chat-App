import React, { useContext } from "react";
import AppRoutes from "./routers/AppRoutes";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#110e20] text-white">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster />
      <AppRoutes user={authUser} />
    </div>
  );
};

export default App;
