import Table from "../components/Table";
import { useProduct } from "../context/ProductContext";
import Arrow from "../components/Arrow";
import { useEffect, useState } from "react";

function ProductsPage() {
  const { products, getProducts } = useProduct();

  const [items, setItems] = useState([]);

  function findProduct(value) {
    if (!value.trim()) {
      setItems(products);
      return;
    }

    const foundProduct = products.filter((product) =>
      product.nombre.toLowerCase().includes(value)
    );

    setItems(foundProduct);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "search") {
      findProduct(value);
    }
  };

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
  useEffect(() => {
    if (!products) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    setItems(products);
  }, [products]);

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
          className="block w-full px-4 py-2 mt-2 text-[var(--text-color)]  bg-[var(--background-color)] border border-[var(--background-color)] rounded-md   focus:border-[var(--text-color)]  "
          placeholder="Buscar por nombre"
          onChange={handleChange}
        />
      </div>

      <div className="text-center bg-[var(--card-background-color)] p-6">
        <Table contentTable={table} products={items} />
      </div>
    </div>
  );
}

export default ProductsPage;
