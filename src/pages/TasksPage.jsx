import Arrow from "../components/Arrow";
import TaskCard from "../components/TaskCard";
import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { useHttpRequest } from "../hooks/useHttpRequest";

function TasksPage() {
  const { sendRequest, response } = useHttpRequest();
  const getTaks = async () => {
    await sendRequest("GET", "/tasks");
  };

  useEffect(() => {
    getTaks();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Arrow
        title="Tareas"
        left={{ link: "/", text: "Inicio" }}
        right={{ link: "/task-add", text: "Crear" }}
      />
      <TaskCard tasks={response || []} />
    </div>
  );
}

export default TasksPage;
