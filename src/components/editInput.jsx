import { Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTodo } from "../context/todos";
//

const EditInput = ({ value, oldValue }) => {
  const [updatedTodo, setUpdatedTodo] = useState("");
  const { dispatch } = useTodo();
  const toast = useToast();
  //

  const updateTodo = (value) => {
    if (!updatedTodo || updatedTodo.length < 4) {
      toast({
        title: `Todo cannot be empty or less than 3 characters`,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      return;
    }

    dispatch({ type: "DONE-EDITING", todo: value, updatedTodo });
  };

  const addValOnEnter = (val, prevValue) => {
    if (val.code === "Enter") updateTodo(prevValue);
  };

  return (
    <>
      <Input
        w={{ base: "50%", sm: "70%" }}
        value={updatedTodo}
        placeholder={value}
        onChange={(e) => setUpdatedTodo(e.target.value)}
        onKeyDown={(e) => addValOnEnter(e, oldValue)}
      />
      <Button
        bg="green.500"
        color={"white"}
        h={8}
        onClick={() => updateTodo(oldValue)}
        mx={2}
      >
        Done
      </Button>
    </>
  );
};

export default EditInput;
