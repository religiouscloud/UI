import React, {useState,useEffect} from 'react'
import axios from 'axios';
import Container from '@material-ui/core/Container';
import {data} from './data';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab"; 
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Carousel.js";
import Tabs from 'react-bootstrap/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import Tab from 'react-bootstrap/Tab'
import Carousel from 'react-bootstrap/Carousel'
import "@ui5/webcomponents/dist/Button";
import Header from './Header';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      background: 'rgba(0,0,0,0.5)',
      height: 360,
      width: '80%',
      margin: 'auto auto',
    },
    media: {
      height: 360,
    },
    but : {
        margin: '3% auto',
    }
  });
  
  
function Temple({match}) {

    var id = match.params.title;
    var obj = {
        "templeId": id
    }
    const classes = useStyles();
    console.log(obj);
    const [temple, setTemple] = useState(data[id]);
    // const [loading, setLoading] = useState(true);
    // const [deleted,setDeleted] = useState(false);
    // useEffect(() => {
    //     axios.post("https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/templeId",obj)
    //         .then(res => {
    //             console.log(res.data);
    //             setTemple(res.data[0]);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // },[]);
    // var temple = obj[0];

    // if(!temple) temple = data[0];
    // const payload = {
    //     templeId : temple.templeId,
    //     location : temple.location
    // };
    
    // const handleDelete = () => {
    //     axios.delete('https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/remove', { data: payload })
    //     .then(res => {
    //         console.log(res);
    //         setDeleted(true);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

    // if(deleted) return <Redirect to='/' />

    return (
        <div className="messi" style={{padding : 8}}>
        <Grid container spacing={2}>
        <Grid item xs={12}><Header/></Grid>
            {/* {loading ? <div>...loading</div> :  */}
        <Grid item xs={12}> 
        <Tabs className="myClass" defaultActiveKey="home">
        <Tab eventKey="home" title="Temple">
            <Grid container>
            <Grid item xs={12} md={6}>
            <Card className={classes.root}>
            <CardMedia
            className={classes.media}
            image={temple.imgurl}
            title="Contemplative Reptile"
            />
            </Card>
            </Grid>
            <Grid item xs={12} md={6}>
            <div className="red">
                <h3 className="cont">{temple.title}</h3>
                <span className="cont">{temple.content}</span>
                <p className="cont">To read more <a href={temple.wikilink} target="_blank" rel="noopener noreferrer">Click here</a></p>
            </div>
            </Grid>
            <Grid item container xs={12}>
            <div className={classes.but}>
                <Button variant="contained" disabled color="secondary">Delete</Button>    
            </div>
            </Grid>
            </Grid>
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
        </Grid>
        </Grid>
        </div>
        
     )
}

export default Temple;
