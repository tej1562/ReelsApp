import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { database } from '../../firebase';
import Avatar from '@mui/material/Avatar';

function CommentList({postData}) {
  const [comments,setComments] = useState(null);

  async function getComments(){
    let arr = [];

    for(let i=0;i<postData.comments.length;i++)
    {
      const doc = await database.comments.doc(postData.comments[i]).get();
      arr.push(doc.data());
    }

    setComments(arr);
  }

  useEffect(()=>{
    getComments();
  },[postData]);

  return (
    <div style={{overflow:"scroll",height:"100%",paddingBottom:"1rem"}}>
      {
          comments == null ? <CircularProgress /> : 
          <>
            {
                comments.map((data) => (
                  <div style={{display:"flex",alignItems:"center"}}>
                    <Avatar src={data.profileUrl} />
                    <p style={{marginLeft:"0.5rem",color:"#525252",fontSize:"0.9rem"}}><span style={{fontWeight:"bold"}}>{data.userName}</span>&nbsp;&nbsp;{data.comment}</p>
                  </div>
                ))
            }
          </>
      }
        
     </div>
  )
}

export default CommentList
