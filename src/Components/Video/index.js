import React, {useState} from 'react'
import "./style.css";
import ReactDOM from 'react-dom';
import LinearProgress from '@mui/material/LinearProgress';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function Video({src,muted,setMuted}) {
  const [progress,setProgress] = useState(0);
  const [volStatus,setVolStatus] = useState(null);

  function handleScroll(e){
      const next = ReactDOM.findDOMNode(e.target).nextSibling;

      if(next)
      {
          next.scrollIntoView({behavior: 'smooth'});
      }
  }

  function handleMute(){
    if(volStatus)
    {
      clearTimeout(volStatus);
    }

    setMuted(!muted);
    setVolStatus(setTimeout(()=>{
      setVolStatus(null);
    },1500));
  }

  function handleProgress(e){
    let progress = (e.target.currentTime / e.target.duration) * 100;
    setProgress(progress);
  } 

  return (
    <>
     <video className="video" autoPlay onTimeUpdate={handleProgress} playsInline src={src} muted={muted} onClick={handleMute} onEnded={handleScroll}/>
     <LinearProgress sx={{
          backgroundColor: "rgba(255, 255, 255, 0.20)",
          '& .MuiLinearProgress-bar': {
            backgroundColor: "#e63427"
          },
          height:"0.18rem"
      }} className="progress" variant="determinate" value={progress} />
       
       {volStatus && 
          <div className="volIcon">
              {muted ? <VolumeOffIcon sx={{width:"1.5rem",height:"1.5rem",color:"white"}}/> : <VolumeUpIcon sx={{width:"1.5rem",height:"1.5rem",color:"white"}}/>}
          </div> 
        }
      
    </>
  )
}

export default Video