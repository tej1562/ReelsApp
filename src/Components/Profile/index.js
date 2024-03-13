import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import {database} from "../../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import "./style.css";
import { Dialog,Card } from '@mui/material';
import CommentList from '../CommentList';
import Like from '../Like';
import AddComment from '../AddComment';

function Profile() {
   const {id} = useParams();
   const [userData,setUserData] = useState(null);
   const [posts,setPosts] = useState([]); 
   const [open,setOpen] = useState(null);

   useEffect(()=>{
        let unsub = database.users.doc(id).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
        });

        return () => {
            unsub();
        }
   },[id]);

   const getPosts = async() => {
     let arr = [];

     if(userData.postDocIds)
     {
        for(let i=0;i<userData.postDocIds.length;i++)
        {
          const data = await database.posts.doc(userData.postDocIds[i]).get();
          arr.push({...data.data(),postDocId: data.id});
        }
     }
    
     setPosts(arr);
   }

   useEffect(()=>{
      if(userData)
      {
        getPosts();
      }
   },[userData]);

  return (
    <div>
        {
            userData == null ? <CircularProgress/> : 
            <>
              <Navbar user={userData}/>
              <div className="profileContainer">
                <img className="profileImg" src={userData.profileUrl}/>
                <div className="profileText">
                    <Typography variant="h5" sx={{fontWeight:"bold"}}>
                      {userData.fullName}   
                    </Typography>
                    <Typography variant="subtitle1" sx={{marginTop:"0.5rem"}}>
                       No of posts : <span style={{fontWeight:"bold"}}>{userData.postDocIds ? userData.postDocIds.length : 0}</span>
                    </Typography>
                    <Typography variant="subtitle1" >
                       Email : <span style={{fontWeight:"bold"}}>{userData.email}</span>
                    </Typography>
                </div>
              </div>
              <hr className="divider"/>
              <div className="postsContainer">
                { 
                    posts.map((postData,idx) => (
                      <React.Fragment key={idx}>
                          <video className="videoPreview" src={postData.postUrl} onClick={()=>setOpen(postData.postDocId)} />
                          <Dialog maxWidth={false} open={open === postData.postDocId} onClose={()=>{setOpen(false)}}>
                            <div className="modal">
                               <div className="modal-video-container">
                                 <video autoPlay className="modal-video" src={postData.postUrl} controls/>
                               </div>
                                <div className="modal-comments">
                                  <Card variant="outlined" className="comments-list">
                                    <Typography sx={{fontWeight:"bold"}} variant="h6">Comments</Typography>
                                    <CommentList postData={postData}/>
                                  </Card>
                                  <Card variant="outlined" className="add-comment">
                                    <Typography variant="subtitle1" sx={{margin:"0.5rem"}}>
                                        {postData.likes.length} Likes
                                    </Typography>
                                    <div className="add-comment-cta">
                                      <Like userData={userData} postData={postData} normalColor="black"/>
                                      <AddComment userData={userData} postData={postData}/>
                                    </div>
                                  </Card>
                                </div>
                            </div>
                        </Dialog>
                      </React.Fragment>
                    ))
                }
              </div>
              
            </>
        }
      
    </div>
  )
}

export default Profile
