import Arrow from "../components/Arrow";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  return (
    <div>
      <Arrow
        title="Tareas"
        left={{ link: "/", text: "Inicio" }}
        right={{ link: "/tasks/new", text: "Crear" }}
      />
      <TaskCard />
    </div>
  );
}

export default TasksPage;
