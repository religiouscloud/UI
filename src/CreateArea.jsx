import React, { useState } from "react";
import './styles.css';

function CreateArea(props) {
 
  const [note, setNote] = useState({
    title: "",
    content: "",
    imgurl: "",
    wikilink: "",  
    Address: "",
    contact:"",
    deity:""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      imgurl: "",
      wikilink: "",
      Address:"",
      contact:"",
      deity:""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Temple Name"
          />

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Description"
          rows={1}
        />

        <textarea
          name="imgurl"
          onChange={handleChange}
          value={note.imgurl}
          placeholder="Img Url"
          rows={1}
        />

        <textarea
          name="wikilink"
          onChange={handleChange}
          value={note.wikilink}
          placeholder="Wiki Link"
          rows={1}
        />

        <textarea
          name="Address"
          onChange={handleChange}
          value={note.Address}
          placeholder="Address"
          rows={1}
        />

        <textarea
          name="contact"
          onChange={handleChange}
          value={note.contact}
          placeholder="Preist Contact No."
          rows={1}
        />

        <textarea
          name="deity"
          onChange={handleChange}
          value={note.deity}
          placeholder="Famous Deity"
          rows={1}
        />

        <button onClick={submitNote}>
          Add
      </button>
      </form>
    </div>
  );
}

export default CreateArea;
