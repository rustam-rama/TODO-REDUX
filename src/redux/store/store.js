import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../reducers/todos.reducer";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});


