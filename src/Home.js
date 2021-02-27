import React , {useState ,useEffect} from 'react'
import Note from "./Note";
import {data} from "./data";
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Header from './Header';
import './styles.css';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import { makeStyles } from '@material-ui/core/styles';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '98%',
  },
  forcolor: {
    color: 'rgb(41, 102, 138)',
  },
  heading: {
    fontFamily: 'Nunito',
    fontSize: theme.typography.pxToRem(20),
    color: 'rgb(41, 102, 138)',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    fontFamily: 'Nunito',
    color: 'rgb(41, 102, 138)',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '48%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(4, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function Home(props) {
  
  // const [data, setData] = useState([data]);
  
  const classes = useStyles();
  const [temple,setTemple] = useState([]);
  const [rel, setRel] = useState('');
  const [deity, setDeity] = useState('');
  var obj = {
    
  };
  useEffect( () => {
        axios
          .post(
             "https://gbd5npo4g1.execute-api.us-east-2.amazonaws.com/production/temples/all",obj
          )
          .then((res) => {
            console.log(res);
            setTemple(res.data.Items);
          })
          .catch((err) => {
            console.log(err);
          });
  },[]);

  function selectCountry (val) {
    setTemple(prevNote => {
      return {
      ...prevNote,
      country: val
      };
    });
  }

  function selectRegion (val) {
    setTemple(prevNote => {
      return {
      ...prevNote,
      state: val,
      city: val
      };
    });
  }

  const handleRel = (event) => {
    setRel(event.target.value);
  };

  const handleDeity = (event) => {
    setDeity(event.target.value);
  };
 
  return (
    <div style={{ padding : 12 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}><Header /></Grid>
        {/* <Grid item xs={0} sm={2} md={3}>
          <div className="filter">Messi</div>
        </Grid> */}
        <Grid item xs={12}>
        <div>
      <Accordion >
        <AccordionSummary
          expandIcon={<FilterListSharpIcon color="primary"/>}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Sort By</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Filters</Typography>
          </div>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
        <div style={{ padding : 12}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
          <div><label><h5>Country</h5></label><CountryDropdown classes="dropdown2" onChange={(val) => selectCountry(val)} value={temple.country} type="text" name="country" /></div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <div><label><h5>State</h5></label><RegionDropdown blankOptionLabel="No country selected" country={temple.country} classes="dropdown2" onChange={(val) => selectRegion(val)} value={temple.state}  type="text" name="state"/></div>
          </Grid>
          {/* <Grid item xs={2}>
          <div className={clsx(classes.helper)}>
            <Typography variant="caption">
              Select Location
            </Typography>
          </div>
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
          <div>
          <FormControl component="fieldset">
          <FormLabel className={classes.forcolor} component="legend">Religion</FormLabel>
          <RadioGroup aria-label="religion" name="rel1" value={rel} onChange={handleRel}>
            <FormControlLabel value="hindu" control={<Radio />} label="Hindu" />
            <FormControlLabel value="christian" control={<Radio />} label="Christian" />
            <FormControlLabel value="buddhism" control={<Radio />} label="Buddhism" />
            <FormControlLabel value="others" control={<Radio />} label="Others" />
          </RadioGroup>
          </FormControl>
          </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <div>
          <FormControl component="fieldset">
          <FormLabel className={classes.forcolor} component="legend">Deity</FormLabel>
          <RadioGroup aria-label="deity" name="deity1" value={deity} onChange={handleDeity}>
            <FormControlLabel value="shiva" control={<Radio />} label="Shiva" />
            <FormControlLabel value="vishnu" control={<Radio />} label="Vishnu" />
            <FormControlLabel value="brahma" control={<Radio />} label="Bramha" />
            <FormControlLabel value="others" control={<Radio />} label="Others" />
          </RadioGroup>
          </FormControl>
          </div>
          </Grid>
          </Grid>
          </div>
          {/* <Grid item xs={2}>
          <div className={clsx(classes.helper)}>
            <Typography variant="caption">
              Select Religion and Deity
            </Typography>
          </div>
          </Grid> */}
          </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button variant="contained"  color="primary">
            Apply
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
    </Grid>
    <div style={{ padding : 12}}>
      <Grid container spacing={3}>
        {temple.map((noteItem, index) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
               <Note
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                imgurl={noteItem.imgurl}
              />
            </Grid>
           );
        })}
      </Grid>
    </div>
  </Grid>
  </div>
  )
    
}

