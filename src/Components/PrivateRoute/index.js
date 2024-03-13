import React,{useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { authContext} from '../../Context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

function PrivateRoute({Component}) {
  const {user,loading} = useContext(authContext);

  if(loading)
  {
    return <CircularProgress />
  }

  return user ? <Component/> : <Navigate to="/login" />
}

export default PrivateRoute;