import React, { useState } from "react";
import './styles.css';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Home from "./Home";
import Pagination from "./Pagination";
import {data} from "./data";
import CreateArea from "./CreateArea";
import About from './About';
import Contact from './Contact'
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Temple from "./Temple";

function App() {
  // const [notes, setNotes] = useState(data);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(18);
  
  // function addNote(newNote) {
  //   setNotes(prevNotes => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  // const last = currentPage*postsPerPage;
  // const first = last-postsPerPage;
  // const currentPosts = data.slice(first,last); 

  // function paginate(num){
  //   setCurrentPage(num);
  // }

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/create" exact component={CreateArea} />
          <Route path="/:title" component={Temple} />
        </Switch>
        {/* <Pagination postsPerPage={postsPerPage} totalPosts={notes.length} paginate = {paginate}/> */}
      </div>
    </Router>
  );
}


export default App;
