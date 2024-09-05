import { IoMdCheckboxOutline } from "react-icons/io";
import React, { useState } from "react";
import TodoList from "./TodoList";
import { useTodos } from "../../hook/useTodos";

export default function Todos() {
  const [todo, setTodo] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);

  const { newTodo } = useTodos();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todo.trim()) {
      const addNewTodo = { content: todo, completed: false };
      newTodo.mutate(addNewTodo);
      setTodo("");
      setIsShow(false);
    }
  };

  const handleAddTodo = () => {
    setIsShow(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <div className="container__content">
      <span className="text-2xl font-medium">To-do List</span>
      <div className="h-full">
        <div
          onClick={handleAddTodo}
          className="mt-2 flex items-center text-purple-500">
          <IoMdCheckboxOutline className="mr-2" />
          <span>add Todo</span>
        </div>
        {isShow && (
          <div className="flex items-center space-x-3 p-4 border-gray-200">
            <input
              type="text"
              value={todo}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="todo__input"
              placeholder="Enter your to-do item"
            />
            <input
              type="checkbox"
              readOnly
              className="h-6 w-6 accent-purple-500 focus:ring-purple-500 rounded border-gray-300"
            />
          </div>
        )}
        <TodoList />
      </div>
    </div>
  );
}
