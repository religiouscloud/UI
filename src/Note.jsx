import React from "react";
import './styles.css';
import {Link} from "react-router-dom";

function Note(props) {
  // function handleClick() {
  //   props.onDelete(props.id);
  // }

  const notestyle = {
    color:"black"
  };

  return (
    <Link style={notestyle} to={`/${props.id}`}>
    <div className="note">
      <h1>{props.title}</h1>
      <img src={props.imgurl} alt="new" height={440} width={440} />
      <p>{props.content.substring(0,200)+"..."}</p>
      {/* <div>
        <p>To read more <a href={props.wikilink}>Click here</a></p> 
      </div>
      <p><b>Famous Deity :-</b> {props.deity}</p>
      <p><b>Address :-</b> {props.Address}</p>
      <p><b>Preist Contact :-</b>{props.contact} </p> */}
      {/* <button onClick={handleClick}>
        Delete
      </button> */}
    </div>
    </Link>
  );
}

export default Note;
