import React, { useState } from "react";

export default function EditTodo({ todo, updateTodo }) {
  const [value, setValue] = useState(todo.content);

  async function modifyTodo(newTodo) {
    try {
      const response = await fetch("http://localhost:8000/modifyTodo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newTodo = await response.json();
        console.log({ newTodo });
        updateTodo(newTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const todoValue = e.target.value;
    setValue(todoValue);
  }

  function handleClick() {
    if (value.length) {
      modifyTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      modifyTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center mb20">
      <input
        value={value}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a todo"
        className="mr20 flex-fill p10"
      />
      <button
        onClick={() => modifyTodo({ ...todo, edit: !todo.edit })}
        className="btn btn-primary-reverse mr10"
      >
        Cancel
      </button>
      <button onClick={handleClick} className="btn btn-primary">
        Save
      </button>
    </div>
  );
}
