
import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "../types/task";
import "./TaskForm.css";

type TaskFormProps = {
  onAdd: (task: Omit<Task, "id">) => Promise<void>;
  initialTask?: Task;
  onUpdate?: (task: Task) => Promise<void>;
  onCancel?: () => void;
};

function TaskForm({
  onAdd,
  initialTask,
  onUpdate,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? ""
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Le titre est obligatoire.");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      if (initialTask && onUpdate) {
        await onUpdate({
          ...initialTask,
          title: trimmedTitle,
          description: description.trim(),
        });
      } else {
        await onAdd({
          title: trimmedTitle,
          description: description.trim(),
          isCompleted: false,
          createdAt: new Date().toISOString(),
        });
      }
    } catch {
      setError(
        initialTask
          ? "Impossible de modifier la tâche."
          : "Impossible d'ajouter la tâche."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex. : Apprendre React"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Décris ta tâche (facultatif)"
          rows={3}
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </button>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Enregistrement..."
            : initialTask
              ? "Enregistrer les modifications"
              : "Ajouter une tâche"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
