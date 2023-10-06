import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";
import {
  addTaskRequest,
  deleteTaskRequest,
  searchTaskRequest,
  updateTaskRequest,
} from "../api/task";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useApp debe estar dentro del proveedor TaskContext");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks] = useState([]);
  const [found, setFound] = useState(false);

  const addTask = async (task) => {
    try {
      const res = await addTaskRequest(task);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const searchTask = async (id) => {
    try {
      const res = await searchTaskRequest(id);
      setFound(res.data);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const updateTask = async (id, newTask) => {
    try {
      const res = await updateTaskRequest(id, newTask);
    } catch (error) {
      setError(error.response.data);
    }
  };

  TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,

        addTask,
        deleteTask,
        searchTask,
        found,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
