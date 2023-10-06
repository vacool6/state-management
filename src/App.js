import { Box, Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
//
import TodoS from "./components/todos";
import { useTodo } from "./context/todos";

function App() {
  const [todo, setTodo] = useState("");
  const { todoS, setTodoS } = useTodo();
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
    setTodoS([
      ...todoS,
      {
        todo,
        isCompleted: false,
        isEditing: false,
      },
    ]);
    setTodo("");
  };

  const addValOnEnter = (val) => {
    if (val.code === "Enter") addTodo();
  };

  const removeTodo = (item) => {
    const completedTodoS = todoS.map((e) => {
      if (item === e.todo) {
        return { ...e, isCompleted: true };
      }
      return e;
    });
    setTodoS(completedTodoS);
    setTimeout(() => {
      const updatedTodoS = todoS.filter((e) => item !== e.todo);
      setTodoS(updatedTodoS);
    }, 500);
  };

  return (
    <>
      <Box m={10}>
        <Heading>
          Add todo's <Text fontSize={"sm"}>Context-API flow </Text>
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
