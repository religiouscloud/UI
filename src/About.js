import React from 'react'
import Header from './Header'
import logo from "./images/about.png"
function About() {
    return (
        <div>
            <Header/>
            <img src={logo} alt="new" className="about"/>
        </div>
    )
}

export default About
