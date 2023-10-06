import Button from "../components/Button";
import Form from "../components/Form";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import Arrow from "../components/Arrow";
import { useTask } from "../context/TaskContext";

function TaskFormPage() {
  const { state } = useLocation();

  const navigate = useNavigate();
  const initialState = {
    title: "",
    description: "",
    img: "",
  };
  const [newTask, handleChange, setNewTask] = useInputState(initialState);

  const { addTask, deleteTask, updateTask } = useTask();

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

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de borrar esta tarea?")) {
      await deleteTask(state.task._id);
      navigate("/tasks");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state?.task?._id) {
      await updateTask(state.task._id, newTask);
      navigate("/tasks");
    } else {
      addTask(newTask);
    }
  };

  const contentForm = [
    {
      id: 1,
      labelText: "Titulo de la tarea",
      name: "title",
      placeholder: state ? state.task.title : "Escribe el titulo",
      typeInput: "text",
      onChange: handleChange,
      textButton: !state ? "Crear" : "Modificar",
      textArea: {
        labelText: "Descripcion de la tarea",
        name: "description",
        placeholder: state ? state.task.description : "Escribe la descripcion",
        typeInput: "text",
        onChange: handleChange,
        className:
          "block w-full px-4 py-2 mt-2 resize-none h-28 bg-[var(--background-color)] border border-[var(--background-color)] rounded-md   focus:border-[var(--text-color)]  ",
      },
      img: {
        labelText: state ? "Cambiar imagen" : "Subir imagen",
        onChange: onInputImageChange,
        src: state ? state.task.img : null,
      },
    },
  ];

  return (
    <div className="mt-24">
      <div className="flex justify-between items-center gap-8 pb-4 ">
        <Arrow
          left={{ link: "/tasks", text: "Atras" }}
          right={{ link: "/", text: "Inicio" }}
        />
        {state ? (
          <Button
            text=" Borrar"
            bg="lg:inline-block py-2 px-6 text-sm text-white font-bold rounded-xl transition duration-200 bg-red-500 hover:bg-red-600"
            type="button"
            onClick={handleDelete}
          />
        ) : null}
      </div>
      <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <Form
          title={!state ? "Crea tu tarea" : "Modifica tu tarea"}
          style="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 text-[var(--text-color)]"
          onSubmit={handleSubmit}
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
