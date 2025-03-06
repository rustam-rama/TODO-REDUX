import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTodo, setSearchQuery, updateTodo } from "../../actions/todo.actions";
import { useEffect } from "react";
import "./TodoPage.css";

const TodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) =>
    state.todos.list.find((todo) => todo.id === id)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    if (!todo) {
      navigate("/404");
    } else {
      setEditedTitle(todo.title);
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

  const handleEdit = async () => {
    if (isEditing) {
      if (editedTitle.trim() && editedTitle !== todo.title) {
        await dispatch(updateTodo(id, editedTitle.trim()));
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="todo-page">
      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
            maxLength={20}
          />
        ) : (
          <h2>{todo.title}</h2>
        )}
      </div>
      <div className="main-actions">
        <button onClick={handleEdit} className="edit-button">
          {isEditing ? "Сохранить" : "Редактировать"}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Удалить
        </button>
      </div>
      <div className="navigation">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Назад
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
