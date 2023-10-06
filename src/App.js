import { Box, Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { useCallback, useReducer, useState } from "react";
//
import TodoS from "./components/todos";
import { todoReducer } from "./reducers/todoReducer";

function App() {
  const [todo, setTodo] = useState("");
  const [todoS, dispatch] = useReducer(todoReducer, []);
  console.log(todoS);
  const toast = useToast();

  const addTodo = () => {
    if (!todo || todo.length < 4) {
      toast({
        title: `Todo cannot be empty or less than 3 characters`,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      return;
    }
    dispatch({ type: "ADD-TODO", todo });
    setTodo("");
  };

  const addValOnEnter = (val) => {
    if (val.code === "Enter") {
      dispatch({ type: "ADD-TODO", todo });
      setTodo("");
    }
  };

  const removeTodo = (item) => {
    dispatch({ type: "COMPLETE-TODO", todo: item });
    setTimeout(() => dispatch({ type: "REMOVE-TODO", todo: item }), 500);
  };

  const isEditing = (value) => {
    dispatch({ type: "IS-EDITING", todo: value });
  };

  const doneEditing = useCallback((todo, updatedTodo) => {
    dispatch({ type: "DONE-EDITING", todo, updatedTodo });
  }, []);

  return (
    <>
      <Box m={10}>
        <Heading>Add todo's</Heading>
        <br />
        <Box display={"flex"}>
          <Input
            w={"25rem"}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={addValOnEnter}
          />
          <Button mx={2} onClick={addTodo} bg="blue.500" color="white">
            Add Todo
          </Button>
        </Box>
        <br />
        {todoS.length !== 0 ? (
          <Box
            my={2}
            border={"1px solid black"}
            boxShadow={"xl"}
            bg={"gray.100"}
          >
            <TodoS
              todoList={todoS}
              remove={removeTodo}
              isEditing={isEditing}
              doneEditing={doneEditing}
            />
          </Box>
        ) : (
          <Text>Add todo's</Text>
        )}
      </Box>
    </>
  );
}

export default App;
