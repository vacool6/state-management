import { Box, Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
//
import { add, remove, completed } from "./store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import TodoS from "./components/todos";

function App() {
  const [todo, setTodo] = useState("");

  const dispatch = useDispatch();
  const toast = useToast();
  const todoS = useSelector((state) => state.TODO);

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
    dispatch(add(todo));
    setTodo("");
  };

  const addValOnEnter = (val) => {
    if (val.code === "Enter") addTodo();
  };

  const removeTodo = (item) => {
    dispatch(completed(item));
    setTimeout(() => {
      dispatch(remove(item));
    }, 500);
  };

  return (
    <>
      <Box m={10}>
        <Heading>
          Add todo's <Text fontSize={"sm"}>Redux-Toolkit flow </Text>
        </Heading>
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
            <TodoS todoList={todoS} remove={removeTodo} />
          </Box>
        ) : (
          <Text>Add todo's</Text>
        )}
      </Box>
    </>
  );
}

export default App;
