import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    loading: false,
    error: null,
    searchQuery: "",
    isSorted: false,
  },
  reducers: {
    fetchTodosSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addTodoSuccess: (state, action) => {
      state.list.push(action.payload);
    },
    toggleTodoSuccess: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodoSuccess: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.list.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (!action.payload) {
        state.isSorted = false;
      }
    },
    toggleSort: (state) => {
      if (state.searchQuery) {
        state.isSorted = !state.isSorted;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteTodoSuccess: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  fetchTodosSuccess,
  addTodoSuccess,
  toggleTodoSuccess,
  updateTodoSuccess,
  setSearchQuery,
  toggleSort,
  setLoading,
  setError,
  deleteTodoSuccess,
} = todosSlice.actions;

export default todosSlice.reducer;
