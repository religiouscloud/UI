// import React from "react";
// import './styles.css';
// import {Link} from "react-router-dom";

// function Note(props) {
//   // function handleClick() {
//   //   props.onDelete(props.id);
//   // }

  

//   return (
//     <Link style={notestyle} to={`/${props.id}`}>
//     <div className="note">
//       <h1>{props.title}</h1>
//       <img src={props.imgurl} alt="new" height={440} width={440} />
//       <p>{props.content.substring(0,200)+"..."}</p>
//       {/* <div>
//         <p>To read more <a href={props.wikilink}>Click here</a></p> 
//       </div>
//       <p><b>Famous Deity :-</b> {props.deity}</p>
//       <p><b>Address :-</b> {props.Address}</p>
//       <p><b>Preist Contact :-</b>{props.contact} </p> */}
//       {/* <button onClick={handleClick}>
//         Delete
//       </button> */}
//     </div>
//     </Link>
//   );
// }

// export default Note;


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Link} from "react-router-dom";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    background: 'rgba(0,0,0,0.5)',
    height: 600,
  },
  media: {
    height: 340,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff',
  },
  desc: {
    fontFamily: 'Nunito',
    fontSize: '1.1rem',
    color: '#ddd',
  },
});

const notestyle = {
  color:"white"
};

export default function Note(props) {
  const classes = useStyles();

  return (
    <Link style={notestyle} to={`/${props.id}`}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.imgurl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            className={classes.title}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.desc}
          >
            {props.content.substring(0,200)+"..."}
          </Typography>
        </CardContent>
      </Card>
      </Link>
   );
}