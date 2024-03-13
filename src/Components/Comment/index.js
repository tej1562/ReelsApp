import React, { useState } from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like from "../Like";
import CommentList from '../CommentList';
import {database} from "../../firebase";
import AddComment from  "../AddComment";

function Comment({userData,postData}) {
  const [open,setOpen] = useState(false);
  
  function handleOpen(){
    setOpen(!open);
  }

  return (
    <div>
      <ChatBubbleIcon className="comment" onClick={handleOpen}/>
      <Dialog maxWidth={false} open={open} onClose={()=>{setOpen(false)}}>
        <div className="modal">
           <div className="modal-video-container">
             <video autoPlay playsInline className="modal-video" src={postData.postUrl} controls/>
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
    </div>
  )
}

export default Comment