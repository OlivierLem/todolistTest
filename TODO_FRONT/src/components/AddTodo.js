import React, { useState } from "react";

export default function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const todoValue = e.target.value;
    setValue(todoValue);
  }

  async function addTodoToDatabase() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/addTodo", {
        method: "POST",
        body: JSON.stringify({
          content: value,
          done: false,
          edit: false,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const todo = await response.json();
        console.log(todo);
        addTodo(todo);
      } else {
        setError("Opps an error occured ...");
      }
    } catch (error) {
      console.error(error);
      setError("Il y a une erreur ", error);
    } finally {
      setLoading(false);
    }
    setValue("");
  }

  async function handleClick() {
    if (value.length) {
      addTodoToDatabase();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      addTodoToDatabase();
    }
  }
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb20">
        <input
          value={value}
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a todo"
          className="mr20 flex-fill p10"
        />
        <button onClick={handleClick} className="btn btn-primary">
          Add
        </button>
      </div>
      <p className="mt20">{loading && "Chargement en cours ..."}</p>
      <p className="mt20">{error && "Une erreur est survenue"}</p>
    </>
  );
}
