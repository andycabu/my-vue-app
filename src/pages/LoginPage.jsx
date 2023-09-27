import Form from "../components/Form";
import { useState } from "react";
import { useHttpRequest } from "../hooks/useHttpRequest";

function LoginPage() {
  const { sendRequest, error } = useHttpRequest();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // Obtén el nombre y el valor del elemento que cambió
    const name = e.target.name;
    const value = e.target.value;

    // Actualiza el objeto de estado (newUser) utilizando el nombre como clave
    // y el valor del elemento como valor
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const loginUser = async (user) => {
    await sendRequest("POST", "http://localhost:4000/api/login", user, "/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);
  };

  const contentForm = [
    {
      labelText: "Email ",
      name: "email",
      placeholder: "prueba@prueba.com",
      typeInput: "email",
      onChange: handleChange,
      textButton: "Iniciar sesión",
    },
    {
      labelText: "Contraseña ",
      name: "password",
      placeholder: "********",
      typeInput: "password",
      onChange: handleChange,
    },
  ];
  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      )}
      <Form
        title="Inicia sesion"
        contentForm={contentForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginPage;
