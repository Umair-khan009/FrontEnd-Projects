import { useState, useEffect } from 'react';
import { RiDeleteBinLine, RiEditLine, RiCheckLine } from 'react-icons/ri';
import './App.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Todo List
          <span className="block text-sm font-normal mt-2 text-gray-500">
            {todos.length} tasks remaining
          </span>
        </h1>

        <form onSubmit={addTodo} className="mb-8 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
        </form>

        <div className="space-y-3">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`group flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                todo.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {todo.completed && <RiCheckLine className="text-white" />}
                </button>
                
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEdit(todo.id)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                    className="flex-1 p-2 border-b-2 border-blue-500 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`flex-1 text-gray-700 ${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {!todo.completed && (
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <RiEditLine />
                  </button>
                )}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
