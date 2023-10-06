import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

//
import EditInput from "./editInput";

const TodoS = ({ todoList, remove, isEditing, doneEditing }) => {
  return (
    <>
      {todoList.map((e, index) => (
        <Box m={2} key={index}>
          <Flex
            bg="#323232"
            color="white"
            justify="space-between"
            align="center"
            px={4}
            py={2}
            w="100%"
            borderRadius="md"
          >
            {e.isEditing ? (
              <EditInput
                value={e.todo}
                oldValue={todoList[index].todo}
                doneEditing={doneEditing}
              />
            ) : (
              <>
                <Text
                  textDecoration={e.isCompleted && "line-through"}
                  textDecorationColor="red"
                  textDecorationThickness="6px"
                  fontSize="2rem"
                >
                  {e.todo}
                </Text>
                <Box>
                  <Button
                    bg="#B98813"
                    color={"white"}
                    h={8}
                    w={8}
                    onClick={() => isEditing(todoList[index].todo)}
                    mx={2}
                  >
                    &#128394;
                  </Button>
                  <Button
                    bg="#C25906"
                    color={"white"}
                    h={8}
                    w={8}
                    onClick={() => remove(todoList[index].todo)}
                  >
                    X
                  </Button>
                </Box>
              </>
            )}
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default TodoS;
