import Arrow from "../components/Arrow";
import TaskCard from "../components/TaskCard";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";

function TasksPage() {
  const { tasks, getTasks } = useApp();
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <Arrow
        title="Tareas"
        left={{ link: "/", text: "Inicio" }}
        right={{ link: "/task-add", text: "Crear" }}
      />
      <TaskCard tasks={tasks} />
    </div>
  );
}

export default TasksPage;
