import Form from "../components/Form";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const { signIn } = useApp();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useNavigate();
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
    signIn(user);
    if (user) router("/");
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
    <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  mt-20">
      <Form
        title="Inicia sesion"
        style="flex flex-col gap-4 text-[var(--text-color)]"
        contentForm={contentForm}
        onSubmit={handleSubmit}
      />
      <div className="flex text-xs justify-end items-center gap-4 pt-8 text-blue-500 hover:text-blue-600">
        <Link to="/register">No tienes cuenta?</Link>
      </div>
    </div>
  );
}

export default LoginPage;
