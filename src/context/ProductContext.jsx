import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";
import {
  productsRequest,
  addProductRequest,
  deleteProductRequest,
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
  const [products, setProducts] = useState();
  const { setError } = useApp();

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
      setProducts([...products, res.data]);
      return true;
    } catch (error) {
      setError(error.response.data);
    }
  };
  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const updateProduct = async (id, newStock) => {
    console.log(newStock);
    try {
      const res = await updateProductRequest(id, newStock);
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
        setProducts,
        getProducts,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
