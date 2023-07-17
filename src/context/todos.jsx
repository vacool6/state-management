import { createContext, useContext, useState } from "react";

const TodoContext = createContext();
export const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todoS, setTodoS] = useState([]);

  const value = {
    todoS,
    setTodoS,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
