import Form from "../components/Form";
import { useState } from "react";
import { useApp } from "../context/AppContext";

function LoginPage() {
  const { response, sendRequest } = useApp();
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
    await sendRequest("POST", "http://localhost:4000/api/login", user);

    response && console.log(response);
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
      <Form
        title="Inicia sesion"
        contentForm={contentForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginPage;
