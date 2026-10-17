
import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "../types/task";

type TaskFormProps = {
  onAdd: (task: Omit<Task, "id">) => Promise<void>;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Le titre est obligatoire.");
      return;
    }

    const newTask: Omit<Task, "id"> = {
      title: trimmedTitle,
      description: description.trim(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    try {
      setError(null);
      setIsSubmitting(true);

      await onAdd(newTask);

      setTitle("");
      setDescription("");
    } catch {
      setError("Impossible d'ajouter la tâche. Réessaie.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex. : Apprendre React"
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Décris ta tâche (facultatif)"
          rows={3}
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Ajout en cours..." : "Ajouter une tâche"}
      </button>
    </form>
  );
}

export default TaskForm;
