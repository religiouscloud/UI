import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "./Header";

export default function Update({match}) {
  var id = match.params.templeId;

  var obj = {
    PK: id,
    country: "",
    region: "",
    city: "",
    religion: "",
    deity: "",
    templeName: "",
  };
  const [submitted, setsubmit] = useState(false);
  const [temple, setTemple] = useState({});
  const { register, handleSubmit, errors } = useForm();
 
  useEffect(() => {
      axios
        .post(
          "https://ckkq9ky3ig.execute-api.us-east-2.amazonaws.com/production3/temples/filter",
          obj
        )
        .then((res) => {
          console.log(res.data);
          setTemple(res.data[0]);
          setTemple((prevNote) => {
            return {
              ...prevNote,
              ["updatedBy"]: "Vidit",
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(temple);
  },[]);

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
    console.log(temple);
  }
  const onSubmit = (data) => {
    console.log(errors);
    console.log(temple);
    axios
      .put(
        "https://ckkq9ky3ig.execute-api.us-east-2.amazonaws.com/production3/temples/update",
        temple 
      )
      .then((res) => {
        console.log(res.data);
        setsubmit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (submitted) return <Redirect to="/templeSearch" />;

  return (
    <div>
      <Header />
      <h1 className="adding">Update Temple</h1>
      <form className="create-note" onSubmit={handleSubmit(onSubmit)}>
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
            <span className="error">{errors.detailedDescription.message}</span>
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
          <h5>City</h5>
        </label>
        <input
          className="create-note"
          onChange={handleChange}
          value={temple.address}
          type="text"
          name="city"
          ref={register({ required: "City is required" })}
        />
        <div>
          {errors.city && <span className="error">{errors.city.message}</span>}
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
          <h5>Famous Deity</h5>
        </label>
        <input
          className="create-note"
          onChange={handleChange}
          value={temple.deity}
          type="text"
          name="deity"
          ref={register}
        />
        <div>
          {errors.deity && (
            <span className="error">{errors.deity.message}</span>
          )}
        </div>
        <input className="create-note-submit" type="submit" />
      </form>
    </div>
  );
}
