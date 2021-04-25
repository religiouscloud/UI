/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import "./styles.css";
import Header from "./Header";
import { Grid } from "@material-ui/core";

export default function FeedBack() {

  return (
    <div style={{ padding: 12 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <h1 className="adding">FeedBack</h1>
        </Grid>
        <Grid item xs={12} className="justify-center">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfj_IVvkEI_g05OLlK8F6MFEei-qxTKBD-hgg8mBGW07PBpAw/viewform?embedded=true"
            width="640"
            height="550"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        </Grid>
      </Grid>
    </div>
  );
}
