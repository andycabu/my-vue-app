import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";

function TaskCard({ tasks }) {
  const { deleteTask } = useTask();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de borrar esta tarea?")) {
      await deleteTask(id);
      navigate("/tasks");
    }
  };

  return (
    <>
      {tasks.length <= 0 ? (
        <h2 className="text-center">No hay tareas</h2>
      ) : (
        <div className="ag-courses_box">
          {tasks.map((task) => (
            <div key={task._id} className="ag-courses_item">
              <div className="ag-courses-item_link">
                <svg
                  onClick={() => handleDelete(task._id)}
                  className="hidden h-6 relative z-[3] float-right prueba "
                  clipRule="evenodd"
                  fillRule="evenodd"
                  imageRendering="optimizeQuality"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  viewBox="0 0 254000 254000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="图层_x0020_1">
                    <path
                      d="m127000 0c70129 0 127000 56871 127000 127000s-56871 127000-127000 127000-127000-56871-127000-127000 56871-127000 127000-127000zm-64190 172969 45969-45969-45969-45969c-2637-2638-2637-6941 0-9578l8643-8643c2637-2637 6940-2637 9578 0l45969 45969 45969-45969c2638-2637 6941-2637 9578 0l8643 8643c2637 2637 2637 6940 0 9578l-45969 45969 45969 45969c2637 2638 2637 6941 0 9578l-8643 8643c-2637 2637-6940 2637-9578 0l-45969-45969-45969 45969c-2638 2637-6941 2637-9578 0l-8643-8643c-2637-2637-2637-6940 0-9578z"
                      fill="#fff"
                    />
                  </g>
                </svg>
                <div className="ag-courses-item_bg"></div>

                <div
                  className="ag-courses-item_link_content"
                  onClick={() => {
                    navigate("/task", { state: { task } });
                  }}
                >
                  <h2 className="ag-courses-item_title">{task.title}</h2>
                  <p className="ag-courses-item_description">
                    {task.description}
                  </p>

                  <p className="ag-courses-item_date-box">
                    Fecha de creacion:
                    <span className="ag-courses-item_date">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

TaskCard.propTypes = {
  tasks: PropTypes.array,
};

export default TaskCard;
