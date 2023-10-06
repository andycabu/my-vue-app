import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";
import {
  getTasksRequest,
  addTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "../api/task";
import { useApp } from "./AppContext";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useApp debe estar dentro del proveedor TaskContext");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState();
  const { setError } = useApp();

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const addTask = async (task) => {
    try {
      const res = await addTaskRequest(task);
      setTasks([...tasks, res.data]);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const deleteTask = async (id) => {
    console.log(id);
    try {
      console.log(tasks);
      await deleteTaskRequest(id);
      const newTasks = tasks.filter((task) => task._id !== id);
      console.log(newTasks);
      setTasks(newTasks);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const updateTask = async (id, newTask) => {
    try {
      await updateTaskRequest(id, newTask);
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
        getTasks,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
