import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { database } from '../../firebase';

function AddComment({userData,postData}) {
  const [comment,setComment] = useState("");
  
   async function addComment(){
        setComment("");

        let doc = await database.comments.add({
            profileUrl: userData.profileUrl,
            userName: userData.fullName,
            comment: comment
        });
    
        await database.posts.doc(postData.postDocId).update({
          comments: [...postData.comments,doc.id]
        });
  }

  return (
    <>
       <TextField size="small" sx={{width:"60%"}} id="outlined-basic" label="Comment" variant="outlined" value={comment} onChange={(e)=>setComment(e.target.value)} />
       <Button variant="contained" onClick={addComment}>Post</Button>
    </>
  )
}

export default AddComment