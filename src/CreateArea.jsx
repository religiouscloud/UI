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
import './styles.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CreateArea() {
  const initialState = {
            templeName: "BAPS ",
						address: "Chino Hills",
						shortDescription: "The BAPS Shri Swaminarayan Mandir[a] is a Hindu temple complex located in Chino Hills, in southwestern San Bernardino County in southern California.",
						detailedDescription: "The BAPS Shri Swaminarayan Mandir[a] is a Hindu temple complex located in Chino Hills, in southwestern San Bernardino County in southern California. The temple belongs to the Bochasanwasi Akshar Purushottam Swaminarayan Sanstha denomination of Hinduism. However, the BAPS Shri Swaminarayan Mandir is open to visitors of all faiths.",
						city: "San Bernardino",
						state: "California",
						country: "United States",
						deity: "Shri Swaminarayan",
						websiteUrl: "https://en.wikipedia.org/wiki/BAPS_Shri_Swaminarayan_Mandir_Chino_Hills",
						headerImageUrl: "https://en.wikipedia.org/wiki/BAPS_Shri_Swaminarayan_Mandir_Chino_Hills#/media/File:BAPS_Mandir_LA_1.jpg",
						createdBy: "Aryan"
  }
  useEffect(() => {
    axios.post("https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/add", initialState)
            .then(res => {
                console.log(res);
                console.log("Messi");
            })
            .catch(err => {
                console.log(err);
            })
  }, []);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
   return (
    <div>
    <h1 className="adding">Add Temple</h1>
    <form className="create-note" onSubmit={handleSubmit(onSubmit)}>
      <label><h5>Temple Name</h5><input className="create-note" type="text"  name="Temple_name" ref={register({required: "Temple Name is required", maxLength: {value:80, message:"Name limit 80 characters"}})} /></label>
      <div>{errors.Temple_name && <span className="error">{errors.Temple_name.message}</span>}</div>
      <label><h5>Description</h5></label><textarea className="create-note" type="text"  name="Description" ref={register({required: "Description is required", maxLength: {value:1000, message:"Description limit 1000 characters"}})} />
      <div>{errors.Description && <span className="error">{errors.Description.message}</span>}</div>
      <label><h5>Image Url</h5></label><input className="create-note" type="url"  name="Image_Url" ref={register({required: "Image url is required"})} />
      <div>{errors.Image_Url && <span className="error">{errors.Image_Url.message}</span>}</div>
      <label><h5>Wiki Link</h5></label><input className="create-note" type="url" name="Wiki Link" ref={register} />
      <label><h5>Address</h5></label><input className="create-note" type="text" name="Address" ref={register({required: "Address is required"})} />
      <div>{errors.Address && <span className="error">{errors.Address.message}</span>}</div>
      <label><h5>Priest Contact Number</h5></label><input className="create-note" type="tel" name="PCN" ref={register({required: "Contact number is required", min: {value:6, message:"Invalid phone number"}, maxLength: {value:12, message:"Invalid phone number"}})} />
      <div>{errors.PCN && <span className="error">{errors.PCN.message}</span>}</div>
      <label><h5>Priest Email Address</h5></label><input className="create-note" type="email" name="PEA" ref={register({pattern: {value : /^\S+@\S+$/i , message:"Invalid email"}})} />
      <div>{errors.PEA && <span className="error">{errors.PEA.message}</span>}</div>
      <label><h5>Famous Deity</h5></label><input className="create-note" type="text"  name="FD" ref={register} />
      <div>{errors.FD && <span className="error">{errors.FD.message}</span>}</div>
      <input className="create-note-submit" type="submit" />
    </form>
    </div>
  );
}