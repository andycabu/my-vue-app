import Button from "../components/Button";
import Form from "../components/Form";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import useSubmit from "../hooks/useSubmit";
import Arrow from "../components/Arrow";
import { useApp } from "../context/AppContext";

function TaskFormPage() {
  const { id } = useParams();

  const initialState = {
    title: "",
    description: "",
    img: "",
  };
  const [newTask, handleChange, setNewTask] = useInputState(initialState);

  const { sendRequest, response } = useApp();

  const handleSubmit = useSubmit(
    async () => {
      // Lógica para crear una tarea nueva
      await sendRequest("POST", "http://localhost:4000/api/tasks/add", newTask);
    },
    async (taskId) => {
      // Lógica para actualizar una tarea existente
      await updateTask(taskId);
    }
  );

  const onInputImageChange = async (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result;
      setNewTask((prevNewTask) => ({
        ...prevNewTask,
        img: base64String,
      }));
    };

    reader.readAsDataURL(file);
  };

  const updateTask = async () => {
    await sendRequest(
      "PUT",
      `http://localhost:4000/api/tasks/update${id}`,
      newTask
    );
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de borrar esta tarea?")) {
      await sendRequest(
        "DELETE",
        `http://localhost:4000/api/tasks/delete${id}`,
        null
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (id && response === null) {
        await sendRequest(
          "GET",
          `http://localhost:4000/api/tasks/find${id}`,
          null
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (response !== null) {
      setNewTask(response);
    }
  }, [response]);

  const contentForm = [
    {
      id: 1,
      labelText: "Titulo de la tarea",
      name: "title",
      placeholder: id ? newTask.title : "Escribe el titulo",
      typeInput: "text",
      onChange: handleChange,
      textButton: !id ? "Crear" : "Modificar",
      textArea: {
        labelText: "Descripcion de la tarea",
        name: "description",
        placeholder: id ? newTask.description : "Escribe la descripcion",
        typeInput: "text",
        onChange: handleChange,
        className:
          "block w-full px-4 py-2 mt-2 resize-none h-28 bg-[var(--background-color)] border border-[var(--background-color)] rounded-md   focus:border-[var(--text-color)]  ",
      },
      img: {
        labelText: id ? "Cambiar imagen" : "Subir imagen",
        onChange: onInputImageChange,
        src: id ? newTask.img : null,
      },
    },
  ];

  return (
    <div className=" flex justify-center items-center flex-col w-full  ">
      <div className="flex justify-between items-center gap-8 ">
        <Arrow
          left={{ link: "/", text: "Atras" }}
          right={{ link: "/", text: "Inicio" }}
        />
        {id ? (
          <Button
            text=" Borrar"
            bg="lg:inline-block py-2 px-6 text-sm text-white font-bold rounded-xl transition duration-200 bg-red-500 hover:bg-red-600"
            type="button"
            onClick={handleDelete}
          />
        ) : null}
      </div>
      <Form
        title={!id ? "Crea tu tarea" : "Modifica tu tarea"}
        style="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 text-[var(--text-color)]"
        onSubmit={handleFormSubmit}
        contentForm={contentForm}
      />
    </div>
  );
}
TaskFormPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TaskFormPage;
