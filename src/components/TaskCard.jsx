import { useNavigate } from "react-router-dom";

function TaskCard({ tasks }) {
  const router = useNavigate();
  return (
    <>
      {tasks.length <= 0 ? (
        <h2 className="text-center">No hay tareas</h2>
      ) : (
        <div className="ag-courses_box">
          {tasks.map((task) => (
            <div
              onClick={() => {
                router("/tasks/" + task._id);
              }}
              key={task._id}
              className="ag-courses_item"
            >
              <div className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_link_content">
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

export default TaskCard;
