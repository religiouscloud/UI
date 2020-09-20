import React from "react";
import './styles.css';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content.substring(0,200)+"..."}</p>
      <img src={props.imgurl} alt="new" height={440} width={440} />
      <div>
        <p>To read more <a href={props.wikilink}>Click here</a></p> 
      </div>
      <p><b>Famous Deity :-</b> {props.deity}</p>
      <p><b>Address :-</b> {props.Address}</p>
      <p><b>Preist Contact :-</b>{props.contact} </p>
      {/* <button onClick={handleClick}>
        Delete
      </button> */}
    </div>
  );
}

export default Note;
