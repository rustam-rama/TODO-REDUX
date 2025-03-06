import { API_URL } from "../../config";
import {
  fetchTodosSuccess,
  addTodoSuccess,
  toggleTodoSuccess,
  setLoading,
  setError,
  setSearchQuery,
  toggleSort,
  deleteTodoSuccess,
  updateTodoSuccess,
} from "../reducers/todos.reducer";

// Получение задач
export const fetchTodos = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Ошибка загрузки задач");
    const todos = await response.json();
    dispatch(fetchTodosSuccess(todos));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Добавление задачи
export const addTodo = (title) => async (dispatch) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    if (!response.ok) throw new Error("Ошибка при добавлении задачи");
    const newTodo = await response.json();
    dispatch(addTodoSuccess(newTodo));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Удаление задачи
export const deleteTodo = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Ошибка при удалении задачи");
    dispatch(deleteTodoSuccess(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Переключение статуса задачи
export const toggleTodo = (id) => async (dispatch) => {
  try {
    const todo = await fetch(`${API_URL}/${id}`).then((res) => res.json());
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (!response.ok) throw new Error("Ошибка при обновлении статуса");
    dispatch(toggleTodoSuccess(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Обновление задачи
export const updateTodo = (id, title) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error("Ошибка при обновлении задачи");
    dispatch(updateTodoSuccess({ id, title }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Экспортируем actions из reducer напрямую
export { setSearchQuery, toggleSort };
