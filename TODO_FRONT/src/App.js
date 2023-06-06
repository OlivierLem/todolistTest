import styles from "./App.module.scss";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import React, { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function getTodoList() {
      try {
        const response = await fetch("http://localhost:8000/getTodos");
        if (response.ok) {
          const todos = await response.json();
          setTodoList(todos);
        } else {
          console.log("Il y a eu une erreur");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTodoList();
  }, []);

  function addTodo(todo) {
    setTodoList([...todoList, todo]);
  }

  function deleteTodo(todo) {
    setTodoList(todoList.filter((t) => t.id !== todo.id));
  }

  function updateTodo(newTodo) {
    setTodoList(todoList.map((t) => (t.id === newTodo.id ? newTodo : t)));
  }

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.appContainer}`}
    >
      <div className={`${styles.card} container p20`}>
        <h1 className={styles.mb20}>TODO LIST APP</h1>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todoList={todoList}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;
