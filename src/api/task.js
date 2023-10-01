import axios from "./axios";

export const tasksRequest = () => axios.get("/tasks");
export const addTaskRequest = (task) => axios.post("/tasks/add", task);
export const deleteTaskRequest = (id) => axios.delete(`/tasks/delete${id}`);
export const searchTaskRequest = (id) => axios.get(`/tasks/find/${id}`);
export const updateTaskRequest = (id) => axios.get(`/tasks/update/${id}`);
