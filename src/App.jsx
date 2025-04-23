import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        date: new Date().toLocaleString(),
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
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
      <div className="bg-[#333] p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          📝 Todo App-Jenkinks
        </h1>
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="What do you need to do?"
            className="flex-1 p-3 border border-gray-600 bg-[#444] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md"
          >
            ➕ Add
          </button>
        </div>
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-all ${
                todo.completed ? "bg-gray-700" : "bg-gray-800"
              }`}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`text-lg font-medium flex-1 cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-100"
                }`}
              >
                {todo.text}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{todo.date}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-5">No todos yet! 🚀</p>
        )}
      </div>
    </div>
  );
};

export default App;
