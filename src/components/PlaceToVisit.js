import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useWindowPosition from '../hook/useWindowPosition';
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  content: {
    justifyContent: 'center',
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Nunito',
    color: '#fff',
    fontSize: '1.2rem',
  },
  d: {
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Nunito',
    fontSize: '1.5rem',
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="place-to-visit">
      <div className={classes.d}><Link to="/templeSearch" ><Button size="large" variant="contained" color="primary">
        Begin Here
    </Button></Link>
    </div>
    </div>
  );
}