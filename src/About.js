import React from 'react'
import Header from './Header'
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Nunito",
  },
  content: {
    justifyContent: "center",
    width: "80%",
    margin: "0 auto",
    marginTop: "5%",
    alignItems: "center",
    fontFamily: "Nunito",
    color: "#fff",
    fontSize: "1.4rem",
  },
}));

function About() {
    const classes = useStyles();
    return (
      <div>
        <Header />
        <div className={classes.content}>
          <p>
            This is a humble beginning for us, but we hope to bring together all
            religions, faiths, cultures, and thoughts related instituations and
            associated resources and tools under one roof. We hope that when you
            need any information or need any help to either excercise your faith
            or make arrangements to plan a visit to your place of interest, we
            are able to provide you a high quality guidance and support.{" "}
          </p>
          <p>
            In the long run, we wish to enable finding learnings from the most
            popular thoughts and cultures of the world, and make it very
            convenient for you to find information, help, spiritual and cultural
            materials, tools, and services both online and in real world.{" "}
          </p>
          <p>
            As, we wish to build the most comprehensive and reliable network and
            catalog of religious institutions and services under one roof, we
            need help. We need your suggestions to refine and prioritize our
            thoughts, and guide us on this journey. Please feel free to provide
            feedback to us by using the feedback link of this site.{" "}
          </p>
        </div>
      </div>
    );
}

export default About
