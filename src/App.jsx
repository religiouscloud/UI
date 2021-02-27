import React, { useState } from "react";
import './App.css';
import Home from "./Home";
import Pagination from "./Pagination";
import {data} from "./data";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Update from "./Update";
import Contact from './Contact'
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Temple from "./Temple";
import LandingPage from "./landingPage";
import About from "./About";
import Header from './Header';

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
    <React.Fragment>
      <div className="content">
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/templeSearch" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/create" exact component={CreateArea} />
            <Route path="/update/:templeId" exact component={Update} />
            <Route path="/:title" component={Temple} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </React.Fragment>
  );
}


export default App;
