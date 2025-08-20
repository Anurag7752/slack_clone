import toast from "react-hot-toast";
import { createContext, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export default function AuthProvider({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    // setup axios interceptors

    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          if (error.message?.includes("token")) {
            toast.error("Authentication issues. please refresh the page.");
          }
          console.log("Error fetching token:", error.message);
        }
        return config;
      },
      (error) => {
        console.log("Error fetching token:", error.message);
        return Promise.reject(error);
      }
    );
    // cleanUp function to remove the interceptor
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [interceptor]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};