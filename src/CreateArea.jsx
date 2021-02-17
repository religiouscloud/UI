// import React, { useState } from "react";
// import './styles.css';

// function CreateArea(props) {
 
//   const [note, setNote] = useState({
//     title: "",
//     content: "",
//     imgurl: "",
//     wikilink: "",  
//     Address: "",
//     contact:"",
//     deity:""
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setNote(prevNote => {
//       return {
//         ...prevNote,
//         [name]: value
//       };
//     });
//   }

//   function submitNote(event) {
//     props.onAdd(note);
//     setNote({
//       title: "",
//       content: "",
//       imgurl: "",
//       wikilink: "",
//       Address:"",
//       contact:"",
//       deity:""
//     });
//     event.preventDefault();
//   }

//   return (
//     <div>
//       <form className="create-note">
//           <label>Title
//           <input
//             name="title"
//             onChange={handleChange}
//             value={note.title}
//             // placeholder="Temple Name"
//           />
//           </label>
//           <label>Description
//         <textarea
//           name="content"
//           onChange={handleChange}
//           value={note.content}
//           placeholder="Description"
//           rows={1}
//         />
//         </label>

//         <textarea
//           name="imgurl"
//           onChange={handleChange}
//           value={note.imgurl}
//           placeholder="Img Url"
//           rows={1}
//         />

//         <textarea
//           name="wikilink"
//           onChange={handleChange}
//           value={note.wikilink}
//           placeholder="Wiki Link"
//           rows={1}
//         />

//         <textarea
//           name="Address"
//           onChange={handleChange}
//           value={note.Address}
//           placeholder="Address"
//           rows={1}
//         />

//         <textarea
//           name="contact"
//           onChange={handleChange}
//           value={note.contact}
//           placeholder="Preist Contact No."
//           rows={1}
//         />

//         <textarea
//           name="deity"
//           onChange={handleChange}
//           value={note.deity}
//           placeholder="Famous Deity"
//           rows={1}
//         />

//         <button onClick={submitNote}>
//           Add
//       </button>
//       </form>
//     </div>
//   );
// }

//  export default CreateArea;
import React , {useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import './styles.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Header from './Header';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function CreateArea() {
  const initialState = {
            templeName: "",
						address: "",
						shortDescription: "",
						detailedDescription: "",
						city: "",
						state: "",
						country: "",
						deity: "",
						websiteUrl: "",
						headerImageUrl: "",
						createdBy: "VK"
  }
  const [submitted,setsubmit] = useState(false);
  const [temple,setTemple] = useState(initialState);
  const { register, handleSubmit, errors } = useForm();
  const [countrynot, setc] = useState(false);
  const [regionnot, setr] = useState(false);

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

  function handleChange(event) {
    const { name, value } = event.target;  
    setTemple(prevNote => {
      return {
      ...prevNote,
      [name]: value
      };
    });
    if(name==="detailedDescription")
    {
      setTemple(prevNote => {
        return {
        ...prevNote,
        ["shortDescription"] : value
        };
      });
    }
  }
  const onSubmit = data => {
    console.log(errors);
    console.log(temple);
    if(temple.country && temple.state){
    axios.post("https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/add",temple)
            .then(res => {
                console.log(res.data);
                setsubmit(true);
            })
            .catch(err => {
                console.log(err);
            });
    }
    else if(temple.country)
    {
      setr(true);
      setc(false);
    }
    else{
      setc(true);
      setr(true);
    }
  }
  if(submitted) return <Redirect to='/templeSearch' />
   
  return (
    <div>
    <Header/>
    <h1 className="adding">Add Temple</h1>
    <form className="create-note" onSubmit={handleSubmit(onSubmit)}>
      <label><h5>Temple Name</h5></label><input className="create-note" onChange={handleChange} value={temple.templeName} type="text"  name="templeName" ref={register({required: "Temple Name is required", maxLength: {value:80, message:"Name limit 80 characters"}})} />
      <div>{errors.templeName && <span className="error">{errors.templeName.message}</span>}</div>
      <label><h5>Description</h5></label><textarea className="create-note" onChange={handleChange} value={temple.detailedDescription} type="text"  name="detailedDescription" ref={register({required: "Description is required", maxLength: {value:1000, message:"Description limit 1000 characters"}})} />
      <div>{errors.detailedDescription && <span className="error">{errors.detailedDescription.message}</span>}</div>
      <label><h5>Image Url</h5></label><input className="create-note" onChange={handleChange} value={temple.headerImageUrl} type="url"  name="headerImageUrl" ref={register({required: "Image url is required"})} />
      <div>{errors.headerImageUrl && <span className="error">{errors.headerImageUrl.message}</span>}</div>
      <label><h5>Website</h5></label><input className="create-note" onChange={handleChange} value={temple.websiteUrl} type="url" name="websiteUrl" ref={register} />
      <label><h5>Country</h5></label><CountryDropdown classes="dropdown" onChange={(val) => selectCountry(val)} value={temple.country} type="text" name="country" />
      <div>{countrynot && <span className="error">Please select a country</span>}</div>
      <label><h5>State</h5></label><RegionDropdown blankOptionLabel="No country selected" country={temple.country} classes="dropdown" onChange={(val) => selectRegion(val)} value={temple.state}  type="text" name="state"/> 
      <div>{regionnot && <span className="error">Please select a Region</span>}</div>
      <label><h5>Address</h5></label><input className="create-note" onChange={handleChange} value={temple.address} type="text" name="address" ref={register({required: "Address is required"})} />
      <div>{errors.address && <span className="error">{errors.address.message}</span>}</div>
      <label><h5>City</h5></label><input className="create-note" onChange={handleChange} value={temple.address} type="text" name="city" ref={register({required: "City is required"})} />
      <div>{errors.city && <span className="error">{errors.city.message}</span>}</div>
      {/* <label><h5>Priest Contact Number</h5></label><input className="create-note" onChange={handleChange} value={temple.templeName} type="tel" name="PCN" ref={register({required: "Contact number is required", min: {value:6, message:"Invalid phone number"}, maxLength: {value:12, message:"Invalid phone number"}})} />
      <div>{errors.PCN && <span className="error">{errors.PCN.message}</span>}</div>
      <label><h5>Priest Email Address</h5></label><input className="create-note" onChange={handleChange} type="email" name="PEA" ref={register({pattern: {value : /^\S+@\S+$/i , message:"Invalid email"}})} />
      <div>{errors.PEA && <span className="error">{errors.PEA.message}</span>}</div> */}
      <label><h5>Famous Deity</h5></label><input className="create-note" onChange={handleChange} value={temple.deity} type="text"  name="deity" ref={register} />
      <div>{errors.deity && <span className="error">{errors.deity.message}</span>}</div>
      <input className="create-note-submit" type="submit" />
    </form>
    </div>
  );
}