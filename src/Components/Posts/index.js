import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from '../Video';
import "./style.css";
import Avatar from '@mui/material/Avatar';
import Like from '../Like';
import Comment from '../Comment';

function Posts({user}) {
  const [posts,setPosts] = useState(null);
  const [muted,setMuted] = useState(true);
  
  useEffect(()=>{
    const unsub = database.posts.orderBy("createdAt","desc").onSnapshot((snapshotArr) => {
      let postsArr = [];

      snapshotArr.forEach((snapshot) => {
          postsArr.push({...snapshot.data(),postDocId: snapshot.id});
      });
  
      setPosts(postsArr);
    });

    return () => {
        unsub();
    }
  },[]);

  const handleVideoPlayback = (entries) => {
    entries.forEach((entry) => {
        let video = entry.target.childNodes[0];

        video.play().then(() => {
            if(!entry.isIntersecting)
            {
                video.pause();
            }
        });
    })
  } 

  let observer = new IntersectionObserver(handleVideoPlayback,{threshold: 0.6});

  useEffect(()=>{
    let allVideos = document.querySelectorAll(".videos");
    allVideos.forEach((video) => {
        observer.observe(video);
    });

    return () => {
      observer.disconnect();
    }
  },[posts]);

  return (
    <div className="feed-container">
       <div className="video-container">
      {
        posts == null ? <CircularProgress /> :
            posts.map((post,idx) => (
               <div key={idx} className="videos">
                  <Video src={post.postUrl} muted={muted} setMuted={setMuted}/>
                  <div className="details">
                    <div className="profile">
                      <Avatar src={post.profileUrl} />
                      <h4>{post.userName}</h4>
                    </div>
                    <div className="action">
                      <Like postData={post} userData={user} normalColor="white"/>
                      <Comment postData={post} userData={user}/>
                    </div>
                  </div>
               </div>
            ))
      }
    </div>
    </div>
  )
}

export default Posts