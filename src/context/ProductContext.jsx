import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";
import {
  productsRequest,
  addProductRequest,
  deleteProductRequest,
  searchProductRequest,
  updateProductRequest,
} from "../api/product";

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
  const [found, setFound] = useState(false);
  const [error, setError] = useState();
  const [status, setStatus] = useState();

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
      const res = await addProductRequest(product);
      setStatus(res.status);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      setStatus(res.status);
    } catch (error) {
      setError(error.response.data);
    }
  };
  const searchProduct = async (id) => {
    try {
      const res = await searchProductRequest(id);
      setFound(res.data);
    } catch (error) {
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
        found,
        updateProduct,
        error,
        status,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
