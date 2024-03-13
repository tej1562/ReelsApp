import React,{useEffect, useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../../firebase';

function Like({userData,postData,normalColor}) {
  const [like,setLike] = useState(false);

  function handleLike(){
     if(like)
     {
        database.posts.doc(postData.postDocId).update({
            likes: postData.likes.filter((uid) => uid != userData.userId)
        });
     }else{
        database.posts.doc(postData.postDocId).update({
            likes: [...postData.likes,userData.userId]
        }); 
     }
  }

  useEffect(()=>{
      const check = postData.likes.includes(userData.userId);
      setLike(check);
  },[postData]);

  return (
    <div>
       {like ? <FavoriteIcon className="like" onClick={handleLike}/> : <FavoriteIcon style={{color: normalColor,cursor:"pointer"}} onClick={handleLike}/>}
    </div>
  )
}

export default Like