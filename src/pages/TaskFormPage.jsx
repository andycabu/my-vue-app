import Form from "../components/Form";
import { useNavigate, useLocation } from "react-router-dom";
import useInputState from "../hooks/useInputState";
import Arrow from "../components/Arrow";
import { useTask } from "../context/TaskContext";
import { useApp } from "../context/AppContext";

function TaskFormPage() {
  const { state } = useLocation();
  const { error } = useApp();

  const navigate = useNavigate();
  const initialState = {
    title: "",
    description: "",
    img: "",
  };
  const [newTask, handleChange, setNewTask] = useInputState(initialState);

  const { addTask, updateTask } = useTask();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let taskAdded = false;

    if (state?.task?._id) {
      taskAdded = await updateTask(state.task._id, newTask);
    } else {
      taskAdded = await addTask(newTask);
    }
    if (!error && taskAdded) {
      navigate("/tasks");
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
    <>
      <div className="flex justify-between items-center gap-8 pb-4 ">
        <Arrow
          left={{ link: "/tasks", text: "Atras" }}
          right={{ link: "/", text: "Inicio" }}
        />
      </div>
      <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <Form
          title={!state ? "Crea tu tarea" : "Modifica tu tarea"}
          style="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 text-[var(--text-color)]"
          onSubmit={handleSubmit}
          contentForm={contentForm}
        />
      </div>
    </>
  );
}

export default TaskFormPage;
