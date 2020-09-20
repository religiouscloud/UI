import React, { useState } from "react";
import './styles.css';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import {data} from "./data";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState(data);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      {/* <CreateArea onAdd={addNote} /> */}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            imgurl={noteItem.imgurl}
            wikilink={noteItem.wikilink}
            Address={noteItem.Address}
            contact={noteItem.contact}
            deity={noteItem.deity}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
