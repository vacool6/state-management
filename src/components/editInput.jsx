import { Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
//
import { useDispatch } from "react-redux";
import { doneEdit, update } from "../store/todoSlice";

const EditInput = ({ value, newValue }) => {
  const [updatedTodo, setUpdatedTodo] = useState("");
  const toast = useToast();
  //
  const dispatch = useDispatch();

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

    dispatch(doneEdit(value));
    dispatch(update({ value, updatedTodo }));
  };

  const addValOnEnter = (val, newValue) => {
    if (val.code === "Enter") updateTodo(newValue);
  };

  return (
    <>
      <Input
        w={{ base: "50%", sm: "70%" }}
        value={updatedTodo}
        placeholder={value}
        onChange={(e) => setUpdatedTodo(e.target.value)}
        onKeyDown={(e) => addValOnEnter(e, newValue)}
      />
      <Button
        bg="green.500"
        color={"white"}
        h={8}
        onClick={() => updateTodo(newValue)}
        mx={2}
      >
        Done
      </Button>
    </>
  );
};

export default EditInput;
