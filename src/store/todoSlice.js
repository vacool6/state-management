import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "TODO",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push({
        todo: action.payload,
        isCompleted: false,
        isEditing: false,
      });
    },
    remove(state, action) {
      return state.filter((item) => item.todo !== action.payload);
    },
    completed(state, action) {
      return state.map((item) => {
        if (item.todo === action.payload) {
          return { ...item, isCompleted: true };
        }
        return item;
      });
    },
    //Update
    edit(state, action) {
      return state.map((item) => {
        if (item.todo === action.payload) {
          return { ...item, isEditing: true };
        }
        return item;
      });
    },
    doneEdit(state, action) {
      return state.map((item) => {
        if (item.todo === action.payload) {
          return { ...item, isEditing: false };
        }
        return item;
      });
    },
    update(state, action) {
      console.log(action);
      return state.map((item) => {
        if (item.todo === action.payload.value) {
          return { ...item, todo: action.payload.updatedTodo };
        }
        return item;
      });
    },
  },
});

export const { add, remove, completed, edit, doneEdit, update } =
  todoSlice.actions;
export default todoSlice.reducer;
