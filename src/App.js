import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Feed from './Components/Feed';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import ResetPassword from './Components/ResetPassword';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';

function App() {
  return (
    <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute Component={Feed}/>}/>
            <Route path="/profile/:id" element={<PrivateRoute Component={Profile}/>}/>
            <Route path="/login" Component={Login}/> 
            <Route path="/signup" Component={Signup}/>  
            <Route path="/resetpassword" Component={ResetPassword}/>  
          </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
