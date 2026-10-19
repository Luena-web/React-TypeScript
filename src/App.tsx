
import { useState, useEffect } from "react";
import type { Task } from "./types/task";
import TaskItem from "./components/TaskItems";
import TaskForm from "./components/TaskForm";
import { getTasks, createTask,updateTask,deleteTask } from "./services/taskservice";

function App() {
  // État de la liste des tâches
  const [tasks, setTasks] = useState<Task[]>([]);

  async function handleAddTask(task: Omit<Task, "id">) {
  const newTask = await createTask(task);

  setTasks((currentTasks) => [...currentTasks, newTask]);
}

async function handleToggleTask(task: Task) {
  const updatedTask = await updateTask(task.id, {
    isCompleted: !task.isCompleted,
  });
  

  setTasks((currentTasks) =>
    currentTasks.map((currentTask) =>
      currentTask.id === updatedTask.id
        ? updatedTask
        : currentTask
    )
  );
}
  // État du chargement
  const [isLoading, setIsLoading] = useState(true);

  // État des erreurs
  const [error, setError] = useState<string | null>(null);

  // Charger les tâches au premier affichage
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(
          "Impossible de charger les tâches. Vérifie que le serveur fonctionne."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  async function handleDeleteTask(task: Task) {
  const confirmed = window.confirm(
    `Veux-tu vraiment supprimer la tâche "${task.title}" ?`
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteTask(task.id);

    setTasks((currentTasks) =>
      currentTasks.filter(
        (currentTask) => currentTask.id !== task.id
      )
    );
  } catch {
    window.alert(
      "Impossible de supprimer la tâche. Réessaie."
    );
  }
}

  return (
    <div>
     <header className="page-header">
  <div>
    <h1>Mes tâches</h1>
  </div>

  <button
    type="button"
    className="new-task-button"
    onClick={() => setIsFormOpen(true)}
  >
    + Nouveau
  </button>
</header>

      {/* Afficher le chargement */}
      {isLoading && <p>Chargement des tâches...</p>}

      {/* Afficher une erreur si nécessaire */}
      {error && <p role="alert">{error}</p>}

      {/* Afficher la liste uniquement si le chargement a réussi */}
      {!isLoading && !error && (
        tasks.length === 0 ? (
          <p>Aucune tâche pour le moment.</p>
        ) : (
          <ul className="task-list">
  {tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  ))}
</ul>
        )
      )}
    
{isFormOpen && (
  <div className="modal-overlay">
    <div
      className="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-header">
        <h2 id="modal-title">Nouvelle tâche</h2>

        <button
          type="button"
          className="close-button"
          onClick={() => setIsFormOpen(false)}
          aria-label="Fermer le formulaire"
        >
          ×
        </button>
      </div>

      <TaskForm
        onAdd={async (task) => {
          await handleAddTask(task);
          setIsFormOpen(false);
        }}
      />
    </div>
  </div>
)} 
     


    </div>
  );
}

export default App;
