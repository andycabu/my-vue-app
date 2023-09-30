import Form from "../components/Form";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();
  const { isAuthenticated, signUp } = useApp();

  useEffect(() => {
    isAuthenticated && navigate("/login");
  }, [isAuthenticated]);

  const createUser = async (user) => {
    signUp(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(newUser);
  };

  const handleChange = (e) => {
    // Obtén el nombre y el valor del elemento que cambió
    const name = e.target.name;
    const value = e.target.value;

    // Actualiza el objeto de estado (newUser) utilizando el nombre como clave
    // y el valor del elemento como valor
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };
  const contentForm = [
    {
      labelText: "Nombre completo ",
      name: "name",
      placeholder: "Andres Buitrago",
      typeInput: "text",
      textButton: "crear",
      onChange: handleChange,
    },
    {
      labelText: "Email ",
      name: "email",
      placeholder: "prueba@prueba.com",
      typeInput: "email",
      onChange: handleChange,
    },
    {
      labelText: "Escribe tu contraseña ",
      name: "password1",
      placeholder: "********",
      typeInput: "password",
      onChange: handleChange,
    },
    {
      labelText: "Repite la contraseña",
      name: "password2",
      placeholder: "********",
      typeInput: "password",
      onChange: handleChange,
    },
  ];
  return (
    <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  mt-20">
      <Form
        title="Registrate"
        style="flex flex-col gap-4 text-[var(--text-color)]"
        contentForm={contentForm}
        onSubmit={handleSubmit}
      />
      <div className="flex text-xs justify-end items-center gap-4 pt-8 text-blue-500 hover:text-blue-600">
        <Link to="/login">Inicia sesion</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
