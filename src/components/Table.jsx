import Button from "./Button";
import PropTypes from "prop-types";

import { useState } from "react";
import { useProduct } from "../context/ProductContext";

function Table({ contentTable, products }) {
  const { deleteProduct, updateProduct } = useProduct();
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  console.log(value);

  const handleDelete = async (id) => {
    deleteProduct(id);
  };

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
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  value={value}
                  contentEditable={isEditing === true}
                  onBlur={() => setIsEditing(false)}
                  onChange={(e) => setValue(e.target.value)}
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
  products: PropTypes.array,
};

export default Table;
