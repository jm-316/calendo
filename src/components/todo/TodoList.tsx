import { useTodos } from "../../hook/useTodos";

export default function TodoList() {
  const { todos, updatedTodo, removeTodo } = useTodos();

  const handleCheckboxChange = (id: number, content: string) => {
    const updateTodo = { id, content, completed: true };

    updatedTodo.mutate(updateTodo);
    setTimeout(() => {
      removeTodo.mutate(id);
    }, 300);
  };

  const handleChangeTodos = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updateTodo = { id, content: e.target.value, completed: false };
    updatedTodo.mutate(updateTodo);
  };
  return (
    <>
      {todos?.map((todo) => (
        <div
          className="flex items-center space-x-3 p-4 border-gray-200"
          key={todo.id}>
          <input
            type="text"
            defaultValue={todo.content}
            onChange={(e) => handleChangeTodos(e, todo.id)}
            className="todo__input"
            placeholder="Enter your to-do item"
          />
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo.id, todo.content)}
            className="h-6 w-6 accent-purple-500 focus:ring-purple-500 rounded border-gray-300"
          />
        </div>
      ))}
    </>
  );
}
