import axios from "./axios";

export const productsRequest = () => axios.get("/products");
export const addProductRequest = (product) =>
  axios.post("/product/add", product);
export const deleteProductRequest = (id) =>
  axios.delete(`/product/delete/${id}`);
export const searchProductRequest = (nombre) =>
  axios.get(`/product/find?nombre=${nombre}`);
export const updateProductRequest = (id, product) =>
  axios.put(`/product/update/${id}`, product);
