import Button from "../components/Button";
import Form from "../components/Form";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import useSubmit from "../hooks/useSubmit";
import Arrow from "../components/Arrow";
import { useApp } from "../context/AppContext";

function TaskFormPage() {
  const { id } = useParams();
  const router = useNavigate();
  const initialState = {
    title: "",
    description: "",
    img: "",
  };
  const [newTask, handleChange, setNewTask] = useInputState(initialState);

  const { addTask, tasks, deleteTask, searchTask, found, updateTask } =
    useApp();

  const handleSubmit = useSubmit(
    async () => {
      // Lógica para crear una tarea nueva
      await addTask(newTask);
      if (tasks) router("/tasks");
    },
    async (taskId) => {
      // Lógica para actualizar una tarea existente
      await onUpdateTask(taskId);
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

  const onUpdateTask = async (id) => {
    await updateTask(id);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de borrar esta tarea?")) {
      await deleteTask(id);
      router("/tasks");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await searchTask(id);
      }
    };

    fetchData();
  }, []);

  const contentForm = [
    {
      id: 1,
      labelText: "Titulo de la tarea",
      name: "title",
      placeholder: id ? found.title : "Escribe el titulo",
      typeInput: "text",
      onChange: handleChange,
      textButton: !id ? "Crear" : "Modificar",
      textArea: {
        labelText: "Descripcion de la tarea",
        name: "description",
        placeholder: id ? found.description : "Escribe la descripcion",
        typeInput: "text",
        onChange: handleChange,
        className:
          "block w-full px-4 py-2 mt-2 resize-none h-28 bg-[var(--background-color)] border border-[var(--background-color)] rounded-md   focus:border-[var(--text-color)]  ",
      },
      img: {
        labelText: id ? "Cambiar imagen" : "Subir imagen",
        onChange: onInputImageChange,
        src: id ? found.img : null,
      },
    },
  ];

  return (
    <div className=" flex justify-center items-center flex-col w-full  ">
      <div className="flex justify-between items-center gap-8 ">
        <Arrow
          left={{ link: "/tasks", text: "Atras" }}
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
      <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  mt-20">
        <Form
          title={!id ? "Crea tu tarea" : "Modifica tu tarea"}
          style="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 text-[var(--text-color)]"
          onSubmit={handleFormSubmit}
          contentForm={contentForm}
        />
      </div>
    </div>
  );
}
TaskFormPage.propTypes = {
  id: PropTypes.string,
};

export default TaskFormPage;
