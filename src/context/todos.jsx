import { createContext, useContext, useReducer } from "react";
// Todo-Reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD-TODO":
      const todoArrayAfterAdding = [
        ...state,
        {
          todo: action.todo,
          isCompleted: false,
          isEditing: false,
        },
      ];
      return todoArrayAfterAdding;

    case "REMOVE-TODO":
      const todoArrayAfterRemoving = state.filter(
        (e) => action.todo !== e.todo
      );

      return todoArrayAfterRemoving;

    case "COMPLETE-TODO":
      const todoArrayAfterCompleting = state.map((e) => {
        if (action.todo === e.todo) {
          return { ...e, isCompleted: true };
        }
        return e;
      });

      return todoArrayAfterCompleting;

    case "IS-EDITING":
      const editing = state.map((e) => {
        if (e.todo === action.todo) {
          return { ...e, isEditing: true };
        }
        return e;
      });

      return editing;

    case "DONE-EDITING":
      console.log("LOL");
      const todoArrayAfterEditing = state.map((e) => {
        if (e.todo === action.todo) {
          return { ...e, isEditing: false, todo: action.updatedTodo };
        }
        return e;
      });

      return todoArrayAfterEditing;

    default:
      return state;
  }
};

const TodoContext = createContext();
export const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todoS, dispatch] = useReducer(todoReducer, []);

  const isEditing = (value) => {
    dispatch({ type: "IS-EDITING", todo: value });
  };

  const removeTodo = (item) => {
    dispatch({ type: "COMPLETE-TODO", todo: item });
    setTimeout(() => dispatch({ type: "REMOVE-TODO", todo: item }), 500);
  };

  const value = {
    todoS,
    dispatch,
    removeTodo,
    isEditing,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
