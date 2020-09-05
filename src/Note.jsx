import React from "react";
import './styles.css';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>Address: {props.Address}</p>
      <p>Preist Contact:{props.contact} </p>
      <button onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}

export default Note;
