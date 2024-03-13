import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./style.css";
import logo from "../../Assets/ReelsApp.png";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link, useNavigate} from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import { useContext, useState } from 'react';
import { storage, database } from '../../firebase';

export default function Signup() {
 const text1Style = {color:"grey",textAlign:"center"};
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [fullName,setFullName] = useState("");
 const [error,setError] = useState("");
 const [file,setFile] = useState(null);
 const [loading,setLoading] = useState(false);
 const navigate = useNavigate();

 const {signUp} = useContext(authContext);

 function uploadProfileImg(uid){
        const uploadTask = storage.ref(`/users/${uid}/profileImage`).put(file);

        uploadTask.on("state_changed",progressCb,errorCb,successCb);

        function progressCb(snapshot){
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress : ${progress}%`);
        }

        function errorCb(err){
            displayError(err);
            setLoading(false);
        }

        async function successCb(){
            const url = await uploadTask.snapshot.ref.getDownloadURL();
                
            await database.users.doc(uid).set({
                email,
                fullName,
                profileUrl: url,
                userId: uid
            });

            setLoading(false);
            navigate("/");
        }
    }

    function displayError(err){
        setError(err);
        setTimeout(() => {
            setError("");
        },2000);
    }

    async function handleSignUp(){
        if(email === "")
        {
            displayError("Please enter your email");
            return;
        }

        if(password === "")
        {
            displayError("Please enter your password");
            return;
        }

        if(fullName === "")
        {
            displayError("Please enter your full name");
            return;
        }

        if(file == null)
        {
            displayError("Please select a profile image");
            return;
        }

        try{
            setLoading(true);
            const userObj = await signUp(email,password);
            const uid = userObj.user.uid;
            uploadProfileImg(uid);
        }catch(error){
            displayError(error.message);
            setLoading(false);
        }
    }

  return (
    <div className="signupWrapper">
        <div className="signupCard">
            <Card variant="outlined" sx={{ maxWidth: 450 }}>
                <div className="logo-container">
                    <img src={logo}/>
                </div>
                <CardContent>
                    <Typography variant="subtitle1" sx={text1Style}>
                        Signup to see reels from your friends
                    </Typography>
                    {error !== "" && <Alert severity="error">{error}</Alert>}
                    <TextField fullWidth id="outlined-basic" label="Email" type="email" variant="outlined" margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <TextField fullWidth id="outlined-basic" label="Password" type="password" variant="outlined" margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <TextField fullWidth id="outlined-basic" label="Full Name" variant="outlined" margin="dense" size="small" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                    <Button fullWidth variant="outlined" color="secondary" startIcon={<CloudUploadIcon />} component="label">
                        Upload profile image
                        <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])} />
                    </Button>
                    <Typography variant="caption">
                        {file && file.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant="contained" disabled={loading} onClick={handleSignUp}>Sign Up</Button>
                </CardActions>
                <CardContent>
                    <Typography variant="subtitle1" sx={text1Style}>
                        By signing up, you agree to our Terms, Data Policy and Cookies policy.
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"2.5rem", marginTop:"1rem"}}>
                <CardContent>
                    <Typography variant="subtitle1" sx={text1Style}>
                        Have an account? <Link to="/login">Log In</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}