import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//
import TodoProvider from "./context/todos";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodoProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </TodoProvider>
);
