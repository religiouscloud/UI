import React from "react";
import ReactGA from 'react-ga';

import './App.css';
import Home from "./Home";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import FeedBack from "./FeedBack";
import Update from "./Update";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Temple from "./Temple";
import LandingPage from "./landingPage";
import About from "./About";


const TRACKING_ID = "G-VHR1FTLLFE"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <React.Fragment>
      <div className="content">
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/templeSearch" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/create" exact component={CreateArea} />
            <Route path="/feedback" exact component={FeedBack} />
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
