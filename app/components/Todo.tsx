"use client";
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";

import Swal from 'sweetalert2'

type TodoItem = {
  id: string;
  task: string;
  order: number;
};

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = (task: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      task,
      order: todos.length+1,
    };
    setTodos((prev) => [...prev, newTodo]);
  };


  const handleDelete = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        Swal.fire("Deleted!", "", "success");
      }
    });
  };


  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingText(todos[index].task);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  };

  const handleEditSave = () => {
    if (editingIndex !== null && editingText.trim()) {
      const updated = [...todos];
      updated[editingIndex] = {
        ...updated[editingIndex],
        task: editingText.trim(),
      };
      setTodos(updated);
      setEditingIndex(null);
      setEditingText("");
    }
  };



  return (
    <div className="flex flex-col items-center bg-no-repeat bg-cover justify-center min-h-screen bg-[url(https://i.pinimg.com/originals/65/78/d0/6578d09eeb6c8663a05d4f9114afb10d.gif)]  text-white">
      <div className=" bg-opacity-20  rounded-2xl p-10 text-center  w-full max-w-lg">
        <div className="bg-white rounded-t-xl outline-slate-300 outline-1">
          <h1 className="text-3xl font-bold text-black rounded-tr-lg p-5  rounded-xl">TodoList</h1>
        </div>
        <div className="bg-[#F9F9F9] p-5">
          <TodoForm onAdd={handleAddTask} />

          <ul className="mt-6 space-y-3">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="bg-white bg-opacity-20 p-3 rounded-lg shadow-md  backdrop-blur text-black flex justify-between items-center"
              >
                {editingIndex === index ? (
                  <form onSubmit={handleEditSave} className="flex items-center w-full gap-2">
                    <input
                      value={editingText}
                      onChange={handleEditChange}
                      className="flex-1 p-1 rounded outline-1 outline-blue-400"
                    />
                    <button
                      onClick={handleEditSave}
                      className="text-white bg-green-600 cursor-pointer px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <span >{todo.task}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-black font-bold shadow-md px-2 cursor-pointer py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-white bg-red-600 shadow-md px-2 cursor-pointer py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
}
