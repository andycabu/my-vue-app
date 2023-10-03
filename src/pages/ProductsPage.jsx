import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { useProduct } from "../context/ProductContext";
import Arrow from "../components/Arrow";

function ProductsPage() {
  const { products, getProducts, status, deleteProduct } = useProduct();

  const [newProduct, setNewProduct] = useState({
    nombre: "",
    referencia: "",
    fechaCaducidad: "",
    categoria: "",
    stock: "",
  });

  const findProduct = async (product) => {
    try {
      if (!product.trim()) {
        findProduct();
        return;
      }
      const res = await axios.get(
        `http://localhost:4000/api/products/find?nombre=${product}`
      );
      const data = await res.data;
      if (res.status === 200) {
        setProducts(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorSearch(error.response.data.message);
      }
    }
  };
  const handleDelete = async (id) => {
    await deleteProduct(id);
  };
  console.log(products);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "search") {
      findProduct(value);
    }

    setNewProduct((prevNewProduct) => ({
      ...prevNewProduct,
      [name]: value,
    }));
  };
  useEffect(() => {
    getProducts();
  }, [status === 200]);

  const table = [
    {
      id: 1,
      th: "Nombre",
    },
    {
      id: 2,
      th: "Referencia",
    },
    {
      id: 3,
      th: "Fecha Caducidad",
    },
    {
      id: 4,
      th: "Categoria",
    },
    {
      id: 5,
      th: "Stock",
    },
    {
      id: 6,
      th: "Eliminar",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-[var(--card-background-color)] ">
      <Arrow
        title="Productos"
        left={{ link: "/", text: "Inicio" }}
        right={{ link: "/product-add", text: "Crear" }}
      />

      <div className="mt-4 bg-[var(--card-background-color)] p-6 w-full">
        <input
          type="text"
          name="search"
          className="block w-full px-4 py-2 mt-2  bg-[var(--background-color)] border border-[var(--background-color)] rounded-md   focus:border-[var(--text-color)]  "
          placeholder="Buscar por nombre"
          onChange={handleChange}
        />
      </div>

      <div className="text-center bg-[var(--card-background-color)] p-6">
        <Table
          handleDelete={handleDelete}
          contentTable={table}
          products={products}
          getProducts={getProducts}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
