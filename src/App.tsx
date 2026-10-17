
import { useState, useEffect } from "react";
import type { Task } from "./types/task";

import TaskForm from "./components/TaskForm";
import { getTasks, createTask,updateTask } from "./services/taskservice";

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

  return (
    <div>
      <h1>Mes tâches</h1>

      {/* Afficher le chargement */}
      {isLoading && <p>Chargement des tâches...</p>}

      {/* Afficher une erreur si nécessaire */}
      {error && <p role="alert">{error}</p>}

      {/* Afficher la liste uniquement si le chargement a réussi */}
      {!isLoading && !error && (
        tasks.length === 0 ? (
          <p>Aucune tâche pour le moment.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h3>{task.title}</h3>

                <p>
                  {task.description || "Aucune description"}
                </p>

                <p>
                  Statut :{" "}
                  {task.isCompleted ? "Terminée" : "À faire"}
                </p>
              </li>
            ))}
          </ul>
        )
      )}
      <TaskForm onAdd={handleAddTask} />
    </div>
  );
}

export default App;
