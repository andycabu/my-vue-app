import Arrow from "../components/Arrow";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Arrow
        title="Tareas"
        left={{ link: "/", text: "Inicio" }}
        right={{ link: "/task-add", text: "Crear" }}
      />
      <TaskCard />
    </div>
  );
}

export default TasksPage;
