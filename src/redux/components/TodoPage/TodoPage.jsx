import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTodo, setSearchQuery } from "../../actions/todo.actions";
import { useEffect } from "react";
import "./TodoPage.css";

const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) =>
    state.todos.list.find((todo) => todo.id === id)
  );

  useEffect(() => {
    if (!todo) {
      navigate("/404");
    }
  }, [todo, navigate]);

  if (!todo) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteTodo(id));
      dispatch(setSearchQuery(""));
      navigate("/");
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  return (
    <div className="todo-page">
      <div className="todo-content">
        <h2>{todo.title}</h2>
      </div>
      <div className="todo-actions">
        <button onClick={handleDelete} className="delete-button">
          Удалить задачу
        </button>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Назад
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
