import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import '@vaadin/vaadin-details';
import '@vaadin/vaadin-accordion';
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab"; 
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Carousel.js";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Carousel from 'react-bootstrap/Carousel'
import "@ui5/webcomponents/dist/Button";
import Header from './Header';

function Temple({match}) {

    var id = match.params.title;
    var obj = {
        "templeId": id
    }
    console.log(obj);
    const [temple, setTemple] = useState({});
    const [loading, setLoading] = useState(true);
    const [deleted,setDeleted] = useState(false);
    useEffect(() => {
        axios.post("https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/templeId",obj)
            .then(res => {
                console.log(res.data);
                setTemple(res.data[0]);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);
    // var temple = obj[0];

    // if(!temple) temple = data[0];
    const payload = {
        templeId : temple.templeId,
        location : temple.location
    };
    
    const handleDelete = () => {
        axios.delete('https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/remove', { data: payload })
        .then(res => {
            console.log(res);
            setDeleted(true);
        })
        .catch(err => {
            console.log(err);
        });
    }

    if(deleted) return <Redirect to='/' />

    return (
        <div className="messi">
            <Header/>
            {loading ? <div>...loading</div> : 
            <Tabs defaultActiveKey="home">
            <Tab eventKey="home" title="Temple">
                <div className="red">
                    <h3 className="cont">{temple.templeName}</h3>
                    <span className="cont">{temple.detailedDescription}</span>
                    <p className="cont">To read more <a href={temple.websiteUrl} target="_blank" rel="noopener noreferrer">Click here</a></p>
                </div>
                <div className="blue">
                <Carousel>
                    <Carousel.Item>
                    <img src={temple.headerImageUrl} alt="new" height={450} width={600} />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img src={temple.headerImageUrl} alt="new" height={450} width={600} />
                    </Carousel.Item>
                </Carousel>
                </div>
                <ui5-button onClick={handleDelete} design="Negative">Remove</ui5-button>    
            </Tab>
            <Tab eventKey="contact" title="Contact">
                <div className="contact">
                <p className="contact"><b>Preist Contact :-</b>NA</p>
                <p className="contact"><b>Famous Deity   :-</b>{temple.deity}</p>
                <p className="contact"><b>Address        :-</b>{temple.location}</p>
                </div>
            </Tab>
            <Tab eventKey="pricing" title="Pricing" disabled>
                <p>Free  service for now :)</p>
            </Tab>
        </Tabs>
            }
        </div>
        
     )
}

export default Temple;
