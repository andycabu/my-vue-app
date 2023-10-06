import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";
import {
  productsRequest,
  addProductRequest,
  deleteProductRequest,
  searchProductRequest,
  updateProductRequest,
} from "../api/product";
import { useApp } from "./AppContext";

export const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProduct debe estar dentro del proveedor ProductContext"
    );
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { setError } = useApp();
  const [status, setStatus] = useState(null);

  const getProducts = async () => {
    try {
      const res = await productsRequest();
      setProducts(res.data);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const addProduct = async (product) => {
    try {
      setStatus(null);
      const res = await addProductRequest(product);
      setStatus(res.status);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      setStatus(res.status);
      if (status === 200) setStatus(null);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const searchProduct = async (nombre) => {
    try {
      const res = await searchProductRequest(nombre);
      setProducts(res.data);
      console.log(res);
    } catch (error) {
      console(error);
      setError(error.response.data);
    }
  };
  const updateProduct = async (id, newProduct) => {
    try {
      const res = await updateProductRequest(id, newProduct);
    } catch (error) {
      setError(error.response.data);
    }
  };

  ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        addProduct,
        deleteProduct,
        searchProduct,
        updateProduct,
        status,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
