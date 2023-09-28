import axios from "axios";

export const tasksRequest = () => axios.get("http://localhost:4000/api/tasks");
