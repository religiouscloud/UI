import React, { useState } from "react";
import './styles.css';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const [notes, setNotes] = useState([]);

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
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            Address={noteItem.Address}
            contact={noteItem.contact}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default withAuthenticator(App);
