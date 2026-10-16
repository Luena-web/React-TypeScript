import api from "./api";
import type { Task } from "../types/task";

export async function getTasks(): Promise<Task[]>{
    const result = await api.get<Task[]>("/tasks");
  // 1. Effectuer la requête GET
  // 2. Retourner les données reçues
  // 2. utilisation de wait et async pour attendre les réponses du serveur
  return result.data;
  
} 


export async function createTask(
  task: Omit<Task, "id">
): Promise<Task> {
 
}