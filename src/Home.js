import React , {useState ,useEffect} from 'react'
import Note from "./Note";
// import {data} from "./data";
import axios from 'axios';

function Home() {

    const [data, setData] = useState([]);
    

    useEffect( () => {

      // let response = () => {
      //   return new Promise(function(resolve, reject) {
      //     fetch('https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/all')
      //     .then(response => {
      //       resolve(response.data);
      //     })
      //     .catch(err => {
      //               console.log(err);
      //     });
      //   });
      // };
      // let responseData = await response();
      // console.log(responseData);

        // const instance = axios.create(
        //     {
        //             baseURL: "https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/all",
        //             withCredentials: false,
        //             headers: {
        //               'Access-Control-Allow-Origin' : '*',
        //               'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        //           }
        //       })
        axios.get('https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/all')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        // const response = await fetch("https://qzsnu26p30.execute-api.us-east-2.amazonaws.com/dev/temples/all");
        // // const da = await response.json();
        // const [item] = data.results;
        // console.log(item);
        // // setData(da);
    },[]);

    return (
        <div>
      {data.map((noteItem, index) => {
      return (
        <Note
          key={index}
          id={noteItem.templeId}
          title={noteItem.templeName}
          content={noteItem.shortDescription}
          imgurl={noteItem.headerImageUrl}
          wikilink={noteItem.websiteUrl}
          Address={noteItem.location}
          contact={noteItem.createdBy}
          deity={noteItem.deity}
          // onDelete={deleteNote}
        />
      );
      })}
    </div>
    )
    
}

export default Home
