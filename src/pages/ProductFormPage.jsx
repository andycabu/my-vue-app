import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import useSubmit from "../hooks/useSubmit";
import useInputState from "../hooks/useInputState";
import Form from "../components/Form";
import Arrow from "../components/Arrow";

function ProductFormPage() {
  const { addProduct, error, status } = useProduct();
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
      // Lógica para crear una tarea nueva
      await addProduct(newProduct);
      navigate("/products");
    },
    async () => {
      // Lógica para actualizar una tarea existente
      await onUpdateProduct();
    }
  );

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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
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
