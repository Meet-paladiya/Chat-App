import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

const savedToken = localStorage.getItem("token");
if (savedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        }
        setAuthUser(data.userData);
        connectSocket(data.userData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setAuthUser(null);
      setOnlineUser([]);
      toast.success("Log Out successfully");
      socket?.disconnect();
    }
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/updateProfile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) {
      return;
    }
    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
      transports: ["polling"],
    });

    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUser(userIds); // userIds = ["123", "456"]
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    login,
    logout,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
