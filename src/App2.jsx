import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage only on first render
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        date: new Date().toLocaleString(), // Keep the date as it is
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new todo"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-[#4D6BFE] text-white px-4 py-2 rounded-lg hover:bg-[#3B55D5] transition-colors"
          >
            Add Todo
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                todo.completed ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div
                onClick={() => toggleTodo(todo.id)}
                className={`flex-1 cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : "text-gray-800"
                } flex items-center gap-4`}
              >
                <span className="text-sm text-gray-500">{todo.date}</span>
                <span>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
