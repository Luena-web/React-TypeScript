
import type { Task } from "../types/task";


type TaskItemProps = {
    task: Task;
    onToggle: (task: Task) => void;
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
};

function TaskItem({ task, onToggle, onDelete, onEdit, }: TaskItemProps) {
    return (
        <li className={`task-item ${task.isCompleted ? "completed" : ""}`}>
            <div className="task-content">
                <h3>{task.title}</h3>

                <p>{task.description || "Aucune description"}</p>

                <span className="task-status">
                    {task.isCompleted ? "Terminée" : "À faire"}
                </span>
            </div>

            <div className="task-actions">
                <button
                    type="button"
                    onClick={() => onToggle(task)}
                >
                    {task.isCompleted
                        ? "Remettre à faire"
                        : "Terminer"}
                </button>
                <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(task)}
                >
                    Supprimer
                </button>
                <button
                    type="button"
                    onClick={() => onEdit(task)}
                >
                    Modifier
                </button>
            </div>
        </li>
    );
}

export default TaskItem;
