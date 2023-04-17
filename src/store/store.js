// Configuring store
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    TODO: todoReducer,
  },
});

export default store;
