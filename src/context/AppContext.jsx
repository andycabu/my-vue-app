import { createContext, useContext, useState, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";

import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);

      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };
  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);

      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };
  const logout = async () => {
    const res = await logoutRequest();
    try {
      if (res.status === 200) {
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove("token");
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (error) {
      const tiemer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(tiemer);
    }
  }, [error]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (res.data) {
          setLoading(false);
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        user,
        signUp,
        signIn,
        error,
        setError,
        isAuthenticated,
        logout,
        deleted,
        setDeleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
