import api from "./api";
import type { Task } from "../types/task";

export async function getTasks(): Promise<Task[]> {
  const result = await api.get<Task[]>("/tasks");

  return result.data;
}
//L'ID est générer par Json Server
//construire les propiétes de Task prédéfinis sauf l'ID  Omit<Task, "id">
//Promise<Task> Précise le type de resultat entendu 
export async function createTask(
  task: Omit<Task, "id">
): Promise<Task> {
  const result = await api.post<Task>("/tasks", task);

  return result.data;
}

export async function updateTask(
  id: number,
  updates: Partial<Omit<Task, "id">> // Modifier partiellement  tous les champs à l'exception de l'ID
): Promise<Task> {
  const result = await api.patch<Task>(
    "/tasks/" + id   ,
    updates
  );

  return result.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete("/tasks/" + id   );
}