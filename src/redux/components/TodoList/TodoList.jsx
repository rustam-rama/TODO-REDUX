import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  setSearchQuery,
  toggleSort,
} from "../../actions/todo.actions";
import "./TodoList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos.list);
  const searchQuery = useSelector((state) => state.todos.searchQuery);
  const isSorted = useSelector((state) => state.todos.isSorted);
  const [text, setText] = useState("");

  // Загрузка задач при монтировании
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Фильтрация и поиск
  const filteredTodos = useMemo(() => {
    let result = [...todos];

    // Применяем фильтрацию и сортировку только если включена сортировка
    if (isSorted && searchQuery) {
      // Фильтруем по поиску
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Сортируем по алфавиту
      result.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
    }

    return result;
  }, [todos, searchQuery, isSorted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleSearch = (value) => {
    dispatch(setSearchQuery(value));
    // Сброс сортировки происходит в reducer если поиск пустой
  };

  const handleSort = () => {
    if (searchQuery) {
      dispatch(toggleSort());
      // Если отменяем сортировку - очищаем поиск
      if (isSorted) {
        dispatch(setSearchQuery(""));
      }
    }
  };

  const handleTodoClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <div className="container">
      <h1>Список дел</h1>
      {/* Форма добавления */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить дело"
          maxLength={20}
        />
        <button type="submit">Добавить</button>
      </form>
      {/* Поиск и сортировка */}
      <div className="controls">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Поиск задач..."
          className="search-input"
        />
        <button
          onClick={handleSort}
          className={`sort-button ${searchQuery ? "enabled" : ""}`}
          disabled={!searchQuery}
        >
          {isSorted ? "Отменить сортировку" : "Сортировать по алфавиту"}
        </button>
      </div>

      {/* Список задач */}
      <ul>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  dispatch(toggleTodo(todo.id));
                }}
                className="todo-checkbox"
              />
              <span
                className={`todo-text ${todo.completed ? "completed" : ""}`}
                onClick={() => handleTodoClick(todo.id)}
              >
                {todo.title}
              </span>
            </li>
          ))
        ) : (
          <li className="no-todos">
            {isSorted ? "Ничего не найдено" : "Список задач пуст"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
