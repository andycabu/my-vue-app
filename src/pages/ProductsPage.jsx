import Table from "../components/Table";
import { useProduct } from "../context/ProductContext";
import Arrow from "../components/Arrow";
import { useEffect } from "react";

function ProductsPage() {
  const { products, getProducts, setProducts } = useProduct();

  function findProduct(value) {
    let prueba = [...products];

    if (!value.trim()) {
      console.log(prueba);
      setProducts(prueba);
      return;
    }
    let foundProduct = products.find((product) => console.log(product));
    if (foundProduct) {
      setProducts(foundProduct);
    }
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
        <Table contentTable={table} products={products || []} />
      </div>
    </div>
  );
}

export default ProductsPage;
