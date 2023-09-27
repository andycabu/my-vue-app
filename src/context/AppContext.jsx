import axios from "axios";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [response, setResponse] = useState(null);

  const sendRequest = async (method, url, requestData) => {
    try {
      const res = await axios({ method, url, data: requestData });
      const data = await res.data;
      if (res.status === 200) {
        setResponse(data);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <AppContext.Provider
      value={{ response, sendRequest, error, isAuthenticated }}
    >
      {children}
    </AppContext.Provider>
  );
};
