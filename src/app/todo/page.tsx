"use client";
import Link from "next/link"
import { useState, useEffect, FormEvent } from "react"

const Todo = () => {
  interface Todo {
    _id: string;
    text: string;
    checked: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);

  const fetchTodos = async () => {
    const res = await fetch('/api/todo');
    const data = await res.json();
    setTodos(data);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch('/api/todo', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      fetchTodos();
    }
  };

  const handleEdit = async (id: string) => {
    const todo = todos.find(t => t._id === id);
    if (todo) {
      setText(todo.text);
      setChecked(todo.checked);
      await handleDelete(id);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch('/api/todo',
      {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (res.ok) {
      setText('');
      fetchTodos();
    }
  };
  useEffect(() => { fetchTodos(); }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-2">
      {/* Header  */}
      <div className="relative w-full flex items-center bg-gray-800 text-black p-1 rounded-lg">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold text-3xl">TO-DO</h1>
        <div className="flex flex-row justify-end w-full mx-10">
          <Link href="/" className="m-2 p-2 rounded-lg text-white hover:text-gray-400 hover:bg-gray-700">Home</Link>
          <Link href="/" className="m-2 p-2 rounded-lg text-white hover:text-gray-400 hover:bg-gray-700">About</Link>
          <Link href="/" className="m-2 p-2 rounded-lg text-white hover:text-gray-400 hover:bg-gray-700 ">Contact Us</Link>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col items-center w-full max-w-[50vw] min-h-[30vw] p-4 bg-white shadow-md rounded-lg my-8">
        <div className="w-full justify-between items-center font-bold bg-gray-300 p-3 rounded-lg my-4">
          <h2 className="items-center font-bold text-xl">Add Todos</h2>
        </div>
        <form action="" onSubmit={handleSubmit} className="flex flex-row items-center justify-between w-full max-w-[50vw] p-4 mx-5 ">
          <input
            type="text"
            placeholder="Enter a new todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="m-2 p-2 rounded-lg border border-gray-300 w-[35vw]" />
          <button type="submit" className="m-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 mr-15">Add Todo</button>
        </form>
        <div className="mflex flex-col w-full max-w-[50vw] px-4 rounded-lg h-full bg-gray-50">
          <h2 className="flex flex-col text-2xl font-semibold my-2">Todo List</h2>
          <ul className=" px-4 rounded-lg">
            {todos.map((todo: any) => (
              <li key={todo._id} className="flex justify-between items-center bg-gray-200 p-2 my-1 rounded-lg ">
                <span className={`mt-4 text-lg ${todo.checked ? 'line-through' : ''}`}><input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => setTodos(todos.map(t => t._id === todo._id ? { ...t, checked: !t.checked } : t))}
                  className="mr-2 "
                />{todo.text}</span>
                <div className="">
                  <button onClick={() => handleEdit(todo._id)} className="bg-blue-400 font-semibold text-white p-1 px-3 rounded-lg hover:bg-blue-200">Edit</button>
                  <button onClick={() => handleDelete(todo._id)} className="bg-red-500 font-semibold text-white p-1 px-3 mx-4 rounded-lg hover:bg-red-700">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 w-full rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 text-center">
          <p className="text-sm">&copy; 2025. All rights reserved.</p>

          <div className="mt-4 space-x-4">
            <a href="/" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <span className="text-gray-500">|</span>
            <a href="/" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            <span className="text-gray-500">|</span>
            <a href="/" className="text-gray-400 hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>

    </div>

  )
}

export default Todo