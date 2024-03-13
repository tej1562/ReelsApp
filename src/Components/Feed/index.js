import React,{ useContext, useEffect, useState } from 'react';
import { authContext } from '../../Context/AuthContext';
import { database } from '../../firebase';
import Posts from '../Posts';
import Navbar from '../Navbar';

function Feed() {
  const {user} = useContext(authContext);
  const [userData,setUserData] = useState("");

  useEffect(()=>{
    const unsubs = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    })
    
    return () => {
      unsubs();
    }
  },[]);

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Navbar user={userData}/>
        <Posts user={userData}/>
    </div>
  )
}

export default Feed