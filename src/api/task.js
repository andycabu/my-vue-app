import axios from "./axios";

export const getTasksRequest = () => axios.get("/tasks");
export const addTaskRequest = (task) => axios.post("/tasks/add", task);
export const deleteTaskRequest = (id) => axios.delete(`/tasks/delete/${id}`);
export const updateTaskRequest = (id, task) =>
  axios.put(`/tasks/update/${id}`, task);
