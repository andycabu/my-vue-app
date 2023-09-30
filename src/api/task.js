import axios from "./axios";

export const tasksRequest = () => axios.get("/tasks");
export const addTaskRequest = (task) => axios.post("/tasks/add", task);
