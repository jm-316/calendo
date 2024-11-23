import { useCount } from "../../hook/useCount";
import { useTodos } from "../../hook/useTodos";

export default function TodoList() {
  const { todos, updatedTodo } = useTodos();
  const { updateCount } = useCount();

  const handleCheckboxChange = (id: number, content: string) => {
    const updateTodo = { id, content, completed: true };

    updatedTodo.mutate(updateTodo);
    setTimeout(() => {
      updateCount.mutate(id);
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
          className="flex items-center space-x-3 p-2 md:p-3 lg:p-4 border-gray-200"
          key={todo.id}>
          <input
            type="text"
            defaultValue={todo.content}
            onChange={(e) => handleChangeTodos(e, todo.id)}
            className="todo__input w-40 md:w-48 h-8 md:h-9 lg:h-10 text-sm md:text-lg"
            placeholder="Enter your to-do item"
          />
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo.id, todo.content)}
            className="h-6 w-6 md:h-4 md:w-4 lg:h-5 lg:w-5 accent-purple-500 focus:ring-purple-500 rounded border-gray-300"
          />
        </div>
      ))}
    </>
  );
}
