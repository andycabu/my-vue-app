import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import useSubmit from "../hooks/useSubmit";
import useInputState from "../hooks/useInputState";
import Form from "../components/Form";
import Arrow from "../components/Arrow";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";

function ProductFormPage() {
  const { addProduct, status } = useProduct();

  const { error } = useApp();
  const initialState = {
    nombre: "",
    referencia: "",
    fechaCaducidad: "",
    categoria: "",
    stock: "",
  };
  const navigate = useNavigate();

  const [newProduct, handleChange] = useInputState(initialState);

  const handleSubmit = useSubmit(
    async () => {
      await addProduct(newProduct);
    }
    // async () => {
    //   await onUpdateProduct();
    // }
  );

  useEffect(() => {
    if (status === 200) navigate("/products");
  }, [status]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  const contentForm = [
    {
      name: "nombre",
      placeholder: "Nombre del producto",
      typeInput: "text",
      onChange: handleChange,
      textButton: "Crear",
    },
    {
      name: "referencia",
      placeholder: "Referencia del producto",
      typeInput: "text",
      onChange: handleChange,
    },
    {
      name: "fechaCaducidad",
      placeholder: "Fecha de caducidad del producto",
      typeInput: "date",
      onChange: handleChange,
    },
    {
      name: "categoria",
      placeholder: "Categoria del producto",
      typeInput: "text",
      onChange: handleChange,
    },
    {
      name: "stock",
      placeholder: "Stock del producto",
      typeInput: "number",
      onChange: handleChange,
    },
  ];
  return (
    <div>
      <Arrow
        left={{ link: "/products", text: "Atras" }}
        right={{ link: "/", text: "Inicio" }}
      />
      <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <Form
          title="Crear Producto"
          style="grid grid-cols-2 gap-4 text-gray-700"
          contentForm={contentForm}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
export default ProductFormPage;
