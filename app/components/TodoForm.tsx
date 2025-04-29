"use client";
import { useState } from "react";

interface TodoFormProps {
  onAdd: (task: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task.trim());
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 ">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
        className="p-3 rounded-lg col-span-10  text-black focus:outline-none focus:ring-2 focus:ring-red-400 ring-2 ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500  col-span-2 hover:bg-blue-600 cursor-pointer font-bold py-2 px-4 rounded-lg transition"
      >
        +
      </button>
    </form>
  );
}
