import Button from "./Button";
import axios from "axios";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";

function Table({ contentTable }) {
  const { getProducts, products, deleteProduct } = useProduct();

  const handleDelete = async (id) => {
    deleteProduct(id);
  };

  const [editableStock, setEditableStock] = useState(null);
  const handleEditableChange = async (id, newStockValue) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/products/update/${id}`,
        {
          stock: newStockValue,
        }
      );
      if (res.status === 200) {
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStockDoubleClick = (id, stock) => {
    setEditableStock({ id, stock });
  };

  const handleStockBlur = () => {
    if (editableStock) {
      handleEditableChange(editableStock.id, editableStock.stock);
      setEditableStock(null);
    }
  };
  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {!products || products.length === 0 ? (
        <h2>No hay productos</h2>
      ) : (
        <table className="min-w-full text-[var(--text-color)] ">
          <thead className="text-center bg-[var(--background-color)]">
            <tr>
              {contentTable.map((item) => (
                <th key={item.id} className="p-3">
                  {item.th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={`border-y border-opacity-20 ${
                  index % 2 === 0
                    ? "border-[var(--text-color)] dark:bg-[var(--crad-background-color)]"
                    : "bg-[var(--background-color)]"
                }`}
              >
                <td className="p-3">{product.nombre}</td>
                <td className="p-3">{product.referencia}</td>
                <td className="p-3">
                  {new Date(product.fechaCaducidad).toLocaleDateString()}
                </td>
                <td className="p-3">{product.categoria}</td>
                <td
                  id={product._id}
                  onDoubleClick={() =>
                    handleStockDoubleClick(product._id, product.stock)
                  }
                  onBlur={() => {
                    handleStockBlur(product._id);
                  }}
                  contentEditable={
                    editableStock && editableStock.id === product._id
                  }
                  className="p-3"
                >
                  {product.stock}
                </td>
                <td className="p-3 ">
                  <Button
                    onClick={() => handleDelete(product._id)}
                    text="Borrar"
                    bg="lg:inline-block py-2 px-6 text-sm text-white font-bold rounded-xl transition duration-200 bg-red-500 hover:bg-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

Table.propTypes = {
  contentTable: PropTypes.array.isRequired,
};

export default Table;
