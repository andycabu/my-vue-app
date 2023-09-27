import Button from "./Button";
import axios from "axios";
import PropTypes from "prop-types";

function Table({ contentTable, products, getProducts }) {
  const deleteProduct = async (id) => {
    const res = await axios.delete(
      `http://localhost:4000/api/products/delete${id}`
    );
    if (res.status === 200) {
      getProducts();
    }
  };

  const handleEditableChange = async (event) => {
    try {
      const newStockValue = parseInt(event.target.textContent);

      // Obtener el id del producto
      const id = event.target.id;

      const res = await axios.put(
        `http://localhost:4000/api/products/update${id}`,
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

  return (
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
              onBlur={handleEditableChange}
              className="p-3"
              contentEditable="true"
            >
              {product.stock}
            </td>
            <td className="p-3 ">
              <Button
                onClick={() => deleteProduct(product._id)}
                text="Borrar"
                bg="lg:inline-block py-2 px-6 text-sm text-white font-bold rounded-xl transition duration-200 bg-red-500 hover:bg-red-600"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  contentTable: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired,
};

export default Table;
