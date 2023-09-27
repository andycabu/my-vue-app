import Form from "../components/Form";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();
  const { sendRequest, error, isAuthenticated } = useApp();

  useEffect(() => {
    isAuthenticated && navigate("/login");
  }, [isAuthenticated]);

  const createUser = async (user) => {
    try {
      await sendRequest(
        "POST",
        "http://localhost:4000/api/register",
        user,
        "/login"
      );
    } catch (error) {
      console.log(error);
    }
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
    <div className="flex justify-center items-center w-full flex-col">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      )}

      <Form
        title="Registrate"
        style="flex flex-col gap-4"
        contentForm={contentForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default RegisterPage;
