import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { tasksRequest } from "../api/task";

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

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
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };
  const getTasks = async () => {
    try {
      const res = await tasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
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
    const cookies = Cookies.get();
    console.log(cookies);
    if (cookies.token) {
      console.log(cookies.token);
    }
  }, []);

  AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AppContext.Provider
      value={{ user, signUp, signIn, error, isAuthenticated, tasks, getTasks }}
    >
      {children}
    </AppContext.Provider>
  );
};
