import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export const authContext = React.createContext("");

function AuthContext({children}) {
  const [user,setUser] = useState("");
  const [loading,setLoading] = useState(true);

  function signUp(email,password){
    return auth.createUserWithEmailAndPassword(email,password);
  }

  function signIn(email,password){
    return auth.signInWithEmailAndPassword(email,password);   
  }

  function signOut(){
    return auth.signOut();
  }

  useEffect(()=>{
    const unsubs = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
    });

    return () => {
        unsubs();
    }
  },[]);

  const store =  {
      user,
      loading,
      signUp,
      signIn,
      signOut
  };

  return (
     <authContext.Provider value={store}>
        {children}
     </authContext.Provider>
  )
}

export default AuthContext