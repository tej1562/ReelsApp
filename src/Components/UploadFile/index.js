import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import { storage, database } from '../../firebase';
import {v4 as uuidv4} from "uuid";
import useMediaQuery from '@mui/material/useMediaQuery';

function UploadFile({user}) {
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const mediaQuery = useMediaQuery('(max-width:400px)');

  function uploadVideo(file){
      if(file == null)
      {
          return;
      }

      if(file.size / (1024 * 1024) > 100)
      {
        setError("Video size must be smaller than 100 mb");
        setTimeout(()=>{
          setError("");
        },2000);
        return;
      }

      const uid = uuidv4();

      setLoading(true);

      const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);

      uploadTask.on("state_changed",progressCb,errorCb,successCb);

      function progressCb(snapshot){
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Progress : ${progress}%`);
      }

      function errorCb(err){
        setError(err);
        setTimeout(()=>{
          setError("");
        },2000);
        setLoading(false);
        return;
      }

      async function successCb(){
        const url = await uploadTask.snapshot.ref.getDownloadURL();

        let data = {
            userName: user.fullName,
            profileUrl : user.profileUrl,
            userId: user.userId,
            likes: [],
            comments: [],
            postUrl: url,
            postId: uid,
            createdAt: database.getTimestamp()
        };

        const ref = await database.posts.add(data);

        await database.users.doc(user.userId).update({
          postDocIds: user.postDocIds != null ? [...user.postDocIds,ref.id] : [ref.id]
        });

        setLoading(false);
      }
  }

  return (
    <div style={{marginBottom:"1rem",marginTop:"0.5rem"}}>
        {error !== "" && <Alert  severity="error">{error}</Alert>}
        <Button component="label" size={mediaQuery ? "small" : "medium"} sx={{marginTop: "0.5rem"}} variant="outlined" color="secondary" startIcon={<MovieIcon />}>
              Upload video
              <input type="file" accept="video/*" onChange={(e) => uploadVideo(e.target.files[0])} hidden/>
        </Button>
        {loading && <LinearProgress color="secondary" sx={{marginTop: "0.5rem"}} />}
    </div>
  )
}

export default UploadFile