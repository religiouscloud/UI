import React, { useState, useEffect } from "react";
import Note from "./Note";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Header from "./Header";
import "./styles.css";
import FilterListSharpIcon from "@material-ui/icons/FilterListSharp";
import { makeStyles } from "@material-ui/core/styles";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useBottomScrollListener } from "react-bottom-scroll-listener";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
  },
  forcolor: {
    color: "rgb(41, 102, 138)",
  },
  heading: {
    fontFamily: "Nunito",
    fontSize: theme.typography.pxToRem(20),
    color: "rgb(41, 102, 138)",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    fontFamily: "Nunito",
    color: "rgb(41, 102, 138)",
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "48%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(4, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function Home(props) {
  // const [data, setData] = useState([data]);
  var fil = {
    LastEvaluatedKey: {
      "GSI1-SK": "",
      "SK": "",
      "GSI1-PK": "",
      "PK": "",
    },
    PK: "",
    country: "",
    region: "",
    city: "",
    religion: "",
    deity: "",
    templeName: ""
  };
  const classes = useStyles();
  const [temple, setTemple] = useState([]);
  const [filter, setFilter] = useState(fil);

  var obj = {
    LastEvaluatedKey: {
      "GSI1-SK": "",
      "SK": "",
      "GSI1-PK": "",
      "PK": "",
    },
  };

  const [scroll, setScroll] = useState(true);
  const page_number=1;

  const [page, setPage] = useState(page_number);
  useEffect(() => {
    if(scroll === true){
    console.log(filter);
    axios
      .post(
        "https://ckkq9ky3ig.execute-api.us-east-2.amazonaws.com/production3/temples/filter",
        filter
      )
      .then((res) => {
        console.log(res);
        setTemple([...temple, ...res.data.Items]);
        if(res.data.LastEvaluatedKey){
          setFilter((prev) => {
            return {
              ...prev,
              LastEvaluatedKey : res.data.LastEvaluatedKey
            }
          });
          console.log(res.data.LastEvaluatedKey);
          console.log(filter);
        } else {
          setScroll(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [page]);

  const scrollToEnd = () => {
    if(scroll===true) {setPage(page+1);}
  }

  useBottomScrollListener(scrollToEnd);

  
  function selectCountry(val) {
    if(val===""){
    setFilter((prevNote) => {
        return {
          ...prevNote,
          country: val,
          region: val,
        };
      });
    }
    else
    {
      setFilter((prevNote) => {
        return {
          ...prevNote,
          country: val,
        };
      });
    }
    console.log(filter);
  }

  function selectRegion(val) {
    
      setFilter((prevNote) => {
        return {
          ...prevNote,
          region: val,
        };
      });
    
    console.log(filter);
  }

  const ronaldo = {
    LastEvaluatedKey: {
      "GSI1-SK": "",
      "SK": "",
      "GSI1-PK": "",
      "PK": "",
    },
    religion: "",
  };

  const [DC, setDC] = useState(ronaldo);
  const [deityList, setDL] = useState([]);


  const handleSubmit = () => {
    console.log(filter);
    setScroll(true);
    setTemple([]);
    setFilter((prev) => {
      return {
        ...prev,
        LastEvaluatedKey: obj.LastEvaluatedKey,
      };
    });
    setPage(page + 1);
  }
     
  return (
    <div style={{ padding: 12 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        {/* <Grid item xs={0} sm={2} md={3}>
          <div className="filter">Messi</div>
        </Grid> */}
        <Grid item xs={12}>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<FilterListSharpIcon color="primary" />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>Sort By</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    Filters
                  </Typography>
                </div>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <div style={{ padding: 12 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <div>
                        <label>
                          <h5>Country</h5>
                        </label>
                        <CountryDropdown
                          classes="dropdown"
                          onChange={(val) => selectCountry(val)}
                          value={filter.country}
                          type="text"
                          placeholder="Select an option"
                          name="country"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div>
                        <label>
                          <h5>Region</h5>
                        </label>
                        <RegionDropdown
                          blankOptionLabel="No Country selected"
                          country={filter.country}
                          classes="dropdown"
                          onChange={(val) => selectRegion(val)}
                          value={filter.region}
                          type="text"
                          name="region"
                        />
                      </div>
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
                        <label>
                          <h5>Religion</h5>
                        </label>
                        <select
                          value={filter.religion}
                          name="religion"
                          onChange={(event) => {
                            const dc = DC;
                            dc.religion = event.target.value;
                            setFilter({
                              ...filter,
                              deity: "",
                              [event.target.name]: event.target.value,
                            });
                            setDC({
                              ...DC,
                              [event.target.name]: event.target.value,
                            });
                            console.log(dc);
                            axios
                              .post(
                                "https://ckkq9ky3ig.execute-api.us-east-2.amazonaws.com/production3/deity/all",
                                dc
                              )
                              .then((res) => {
                                console.log(res);
                                setDL([...res.data.Items]);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          className="dropdown"
                        >
                          <option value="">Select Religion</option>
                          <option value="Hinduism">Hinduism</option>
                          <option value="Christian">Christian</option>
                          <option value="Islam">Islam</option>
                        </select>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div>
                        <label>
                          <h5>Deity</h5>
                        </label>
                        <select
                          value={filter.deity}
                          name="deity"
                          onChange={(event) => {
                            setFilter({
                              ...filter,
                              [event.target.name]: event.target.value,
                            });
                          }}
                          className="dropdown"
                        >
                          <option value="">No Religion selected</option>
                          {deityList.map((item) => {
                            return (
                              <option value={item.deity}>{item.deity}</option>
                            );
                          })}
                        </select>
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
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Apply
                </Button>
              </AccordionActions>
            </Accordion>
          </div>
        </Grid>
        <div style={{ padding: 12 }}>
          <Grid container spacing={3}>
            {temple.map((noteItem, index) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Note
                    key={index}
                    id={noteItem.PK}
                    title={noteItem.templeName}
                    content={noteItem.shortDescription}
                    img={noteItem.headerImageUrl}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
