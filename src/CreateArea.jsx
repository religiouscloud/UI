import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "./Header";
import { Grid } from "@material-ui/core";
import Dropdown from "react-dropdown";

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

export default function CreateArea() {
  const initialState = {
    address: "",
    businessHours: "0",
    city: "",
    country: "",
    createdBy: "VK",
    deity: "",
    detailedDescription: "",
    headerImageUrl: "",
    isActive: "0",
    isApproved: "0",
    rank: "0",
    region: "",
    religion: "",
    shortDescription: "",
    templeName: "",
    websiteUrl: "",
  };
  const [submitted, setsubmit] = useState(false);
  const [temple, setTemple] = useState(initialState);
  const { register, handleSubmit, errors } = useForm();
  const [countrynot, setc] = useState(false);
  const [regionnot, setr] = useState(false);
  const [deityList, setDL] = useState([]);
  

  function selectCountry(val) {
    setTemple((prevNote) => {
      return {
        ...prevNote,
        country: val,
      };
    });
  }

  function selectRegion(val) {
    setTemple((prevNote) => {
      return {
        ...prevNote,
        region: val,
      };
    });
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setTemple((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
    if (name === "detailedDescription") {
      setTemple((prevNote) => {
        return {
          ...prevNote,
          ["shortDescription"]: value,
        };
      });
    }
  }
  const onSubmit = (data) => {
    console.log(errors);
    console.log(temple);
    if (temple.country && temple.region) {
      axios
        .post(
          "https://ckkq9ky3ig.execute-api.us-east-2.amazonaws.com/production3/temples/add",
          temple
        )
        .then((res) => {
          console.log(res.data);
          setsubmit(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (temple.country) {
      setr(true);
      setc(false);
    } else {
      setc(true);
      setr(true);
    }
  };
  if (submitted) return <Redirect to="/templeSearch" />;

  const dc = {
    LastEvaluatedKey: {
      "GSI1-SK": "",
      "SK": "",
      "GSI1-PK": "",
      "PK": "",
    },
    religion: "",
  };

  

  return (
    <div style={{ padding: 12 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <h1 className="adding">Add Temple</h1>
        </Grid>
        <Grid item xs={12} className="justify-center">
          {/* <form className="create-note" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h5>Temple Name</h5>
            </label>
            <input
              className="create-note"
              onChange={handleChange}
              value={temple.templeName}
              type="text"
              name="templeName"
              ref={register({
                required: "Temple Name is required",
                maxLength: { value: 80, message: "Name limit 80 characters" },
              })}
            />
            <div>
              {errors.templeName && (
                <span className="error">{errors.templeName.message}</span>
              )}
            </div>
            <label>
              <h5>Description</h5>
            </label>
            <textarea
              className="create-note"
              onChange={handleChange}
              value={temple.detailedDescription}
              type="text"
              name="detailedDescription"
              ref={register({
                required: "Description is required",
                maxLength: {
                  value: 1000,
                  message: "Description limit 1000 characters",
                },
              })}
            />
            <div>
              {errors.detailedDescription && (
                <span className="error">
                  {errors.detailedDescription.message}
                </span>
              )}
            </div>
            <label>
              <h5>Image Url</h5>
            </label>
            <input
              className="create-note"
              onChange={handleChange}
              value={temple.headerImageUrl}
              type="url"
              name="headerImageUrl"
              ref={register({ required: "Image url is required" })}
            />
            <div>
              {errors.headerImageUrl && (
                <span className="error">{errors.headerImageUrl.message}</span>
              )}
            </div>
            <label>
              <h5>Website</h5>
            </label>
            <input
              className="create-note"
              onChange={handleChange}
              value={temple.websiteUrl}
              type="url"
              name="websiteUrl"
              ref={register}
            />
            <label>
              <h5>Country</h5>
            </label>
            <CountryDropdown
              classes="dropdown"
              onChange={(val) => selectCountry(val)}
              value={temple.country}
              type="text"
              name="country"
            />
            <div>
              {countrynot && (
                <span className="error">Please select a country</span>
              )}
            </div>
            <label>
              <h5>State</h5>
            </label>
            <RegionDropdown
              blankOptionLabel="No country selected"
              country={temple.country}
              classes="dropdown"
              onChange={(val) => selectRegion(val)}
              value={temple.region}
              type="text"
              name="state"
            />
            <div>
              {regionnot && (
                <span className="error">Please select a Region</span>
              )}
            </div>
            <label>
              <h5>City</h5>
            </label>
            <input
              className="create-note"
              onChange={handleChange}
              value={temple.city}
              type="text"
              name="city"
              ref={register({ required: "City is required" })}
            />
            <div>
              {errors.city && (
                <span className="error">{errors.city.message}</span>
              )}
            </div>
            <label>
              <h5>Address</h5>
            </label>
            <input
              className="create-note"
              onChange={handleChange}
              value={temple.address}
              type="text"
              name="address"
              ref={register({ required: "Address is required" })}
            />
            <div>
              {errors.address && (
                <span className="error">{errors.address.message}</span>
              )}
            </div>
            <label>
              <h5>Religion</h5>
            </label>
            <select
              value={temple.religion}
              name="religion"
              onChange={(event) => {
                dc.religion = event.target.value;
                setTemple({
                  ...temple,
                  deity: "",
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
              ref={register({ required: "Religion is required" })}
            >
              <option value="">Select Religion</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Christian">Christian</option>
              <option value="Islam">Islam</option>
            </select>
            <div>
              {errors.religion && (
                <span className="error">{errors.religion.message}</span>
              )}
            </div>
            <label>
              <h5>Famous Deity</h5>
            </label>
            <select
              value={temple.deity}
              name="deity"
              onChange={(event) => {
                setTemple({
                  ...temple,
                  [event.target.name]: event.target.value,
                });
              }}
              className="dropdown"
              ref={register({ required: "Deity is required" })}
            >
              <option value="">No Religion selected</option>
              {deityList.map((item) => {
                return <option value={item.deity}>{item.deity}</option>;
              })}
            </select>
            <div>
              {errors.deity && (
                <span className="error">{errors.deity.message}</span>
              )}
            </div>
            <input className="create-note-submit" type="submit" />
          </form> */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdjKb32ohxTFOWRec5PrD949F3jSTXY3XJMB9Y_RwLhyF29lA/viewform?embedded=true"
            width="640"
            height="1845"
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
