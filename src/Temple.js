/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { Grid } from '@material-ui/core';
// import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Tab"; 
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Carousel.js";
import Tabs from 'react-bootstrap/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import Tab from 'react-bootstrap/Tab'
import "@ui5/webcomponents/dist/Button";
import Header from './Header';

const useStyles = makeStyles({
  root: {
    background: "rgba(0,0,0,0.5)",
    height: 360,
    width: "80%",
    margin: "auto auto",
  },
  media: {
    height: 360,
  },
  but: {
    margin: "3% auto",
  },
  but1: {
    marginLeft: "10",
    marginRight: "10",
  }
});
  

  
function Temple({match}) {

    var id = match.params.title;
    var obj = {
        PK: id,
        country: '',
        region: '',
        city: '',
        religion: '',
        deity: '',
        templeName: ''
    }
    const classes = useStyles();
    console.log(obj);
    const [temple, setTemple] = useState({});
    const [loading, setLoading] = useState(true);
    // const [deleted,setDeleted] = useState(false);
    
    useEffect(() => {
        axios
          .post(
            "https://ckkq9ky3ig.execute-api.us-east-2.amazonaws.com/production3/temples/filter",
            obj
          )
          .then((res) => {
            console.log(res.data);
            setTemple(res.data[0]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
    },[]); 

    return (
      <div className="messi" style={{ padding: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          {loading ? (
            <div>...loading</div>
          ) : (
            <Grid item xs={12}>
              <Tabs className="myClass" defaultActiveKey="home">
                <Tab eventKey="home" title="Temple">
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Card className={classes.root}>
                        <CardMedia
                          className={classes.media}
                          image={temple.headerImageUrl}
                          title="Contemplative Reptile"
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="red">
                        <h3 className="cont">{temple.templeName}</h3>
                        <span className="cont">
                          {temple.detailedDescription}
                        </span>
                        <p className="cont">
                          To read more{" "}
                          <a
                            href={temple.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click here
                          </a>
                        </p>
                      </div>
                    </Grid>
                    {}
                  </Grid>
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  <div className="contact">
                    <p className="contact">
                      <b>Preist Contact :-</b>NA
                    </p>
                    <p className="contact">
                      <b>Famous Deity :-</b>
                      {temple.deity}
                    </p>
                    <p className="contact">
                      <b>Address :-</b>
                      {temple.address}
                    </p>
                  </div>
                </Tab>
              </Tabs>
            </Grid>
          )}
        </Grid>
      </div>
    );
}

export default Temple;
