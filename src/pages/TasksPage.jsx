import Arrow from "../components/Arrow";
import TaskCard from "../components/TaskCard";
import { useEffect } from "react";
import { useTask } from "../context/TaskContext";

function TasksPage() {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    if (!tasks) {
      getTasks();
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Arrow
        title="Tareas"
        left={{ link: "/", text: "Inicio" }}
        right={{ link: "/task-add", text: "Crear" }}
      />
      <TaskCard tasks={tasks || []} />
    </div>
  );
}

export default TasksPage;
