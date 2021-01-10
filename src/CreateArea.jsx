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
  const [submitted,setsubmit] = useState(false);
  const [temple,setTemple] = useState(initialState);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(errors);
    console.log(temple);
    axios.post("https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/add",temple)
            .then(res => {
                console.log(res.data);
                setsubmit(true);
            })
            .catch(err => {
                console.log(err);
            });
  }
  if(submitted) return <Redirect to='/templeSearch' />
   
  return (
    <div>
    <Header/>
    <h1 className="adding">Add Temple</h1>
    <form className="create-note" onSubmit={handleSubmit(onSubmit)}>
      <label><h5>Temple Name</h5><input className="create-note" onChange={handleChange} value={temple.templeName} type="text"  name="templeName" ref={register({required: "Temple Name is required", maxLength: {value:80, message:"Name limit 80 characters"}})} /></label>
      <div>{errors.Temple_name && <span className="error">{errors.Temple_name.message}</span>}</div>
      <label><h5>Description</h5></label><textarea className="create-note" onChange={handleChange} value={temple.detailedDescription} type="text"  name="detailedDescription" ref={register({required: "Description is required", maxLength: {value:1000, message:"Description limit 1000 characters"}})} />
      <div>{errors.Description && <span className="error">{errors.Description.message}</span>}</div>
      <label><h5>Image Url</h5></label><input className="create-note" onChange={handleChange} value={temple.headerImageUrl} type="url"  name="headerImageUrl" ref={register({required: "Image url is required"})} />
      <div>{errors.Image_Url && <span className="error">{errors.Image_Url.message}</span>}</div>
      <label><h5>Wiki Link</h5></label><input className="create-note" onChange={handleChange} value={temple.websiteUrl} type="url" name="websiteUrl" ref={register} />
      <label><h5>Address</h5></label><input className="create-note" onChange={handleChange} value={temple.address} type="text" name="address" ref={register({required: "Address is required"})} />
      <div>{errors.address && <span className="error">{errors.address.message}</span>}</div>
      <label><h5>City</h5></label><input className="create-note" onChange={handleChange} value={temple.city} type="text" name="city" ref={register({required: "Please specify City"})} />
      <div>{errors.city && <span className="error">{errors.city.message}</span>}</div>
      <label><h5>State</h5></label><input className="create-note" onChange={handleChange} value={temple.state} type="text" name="state" ref={register({required: "Please specify State"})} />
      <div>{errors.state && <span className="error">{errors.state.message}</span>}</div>
      <label><h5>Country</h5></label><input className="create-note" onChange={handleChange} value={temple.country} type="text" name="country" ref={register({required: "Please specify Country"})} />
      <div>{errors.country && <span className="error">{errors.country.message}</span>}</div>
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