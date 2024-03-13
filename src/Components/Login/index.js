import React,{ useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./style.css";
import logo from "../../Assets/ReelsApp.png";
import TextField from '@mui/material/TextField';
import {Link,useNavigate} from 'react-router-dom';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import bg from "../../Assets/insta.png";
import img1 from '../../Assets/img1.jpg';
import img2 from '../../Assets/img2.jpg';
import img3 from '../../Assets/img3.jpg';
import img4 from '../../Assets/img4.jpg';
import img5 from '../../Assets/img5.jpg';
import { authContext } from '../../Context/AuthContext';
import Alert from '@mui/material/Alert';

export default function Login() {
   const text1Style = {color:"grey",textAlign:"center"};
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [error,setError] = useState("");
   const [loading,setLoading] = useState(false);
   const {signIn} = useContext(authContext);
   const navigate = useNavigate();

   async function handleLogIn(){
    setLoading(true);

      try{
        await signIn(email,password);
        navigate("/");
      }catch(err){
        setError("Invalid login credentials");
        setTimeout(()=>{
            setError("");
        },2000);
      }

      setLoading(false);
   }

  return (
    <div className="loginWrapper">
        <div className="img-car" style={{backgroundImage: `url(${bg})`}}>
                <CarouselProvider
                     naturalSlideWidth={246}
                     naturalSlideHeight={433}
                     visibleSlides={1}
                     totalSlides={5}
                     dragEnabled={false}
                     isPlaying={true}
                     touchEnabled={false}
                     infinite={true}
                     hasMasterSpinner={true}
                     className="car"
                >
                    <Slider>
                        <Slide index={0}><Image src={img1}/></Slide>
                        <Slide index={1}><Image src={img2}/></Slide>
                        <Slide index={2}><Image src={img3}/></Slide>
                        <Slide index={2}><Image src={img4}/></Slide>
                        <Slide index={2}><Image src={img5}/></Slide>
                    </Slider>
                </CarouselProvider>
        </div>
        <div className="loginCard">
            <Card variant="outlined" sx={{ maxWidth: 450 }}>
                <div className="logo-container">
                    <img src={logo}/>
                </div>
                <CardContent>
                    {error !== "" && <Alert severity="error">{error}</Alert>}
                    <TextField fullWidth id="outlined-basic" type="email" value={email} label="Email" variant="outlined" margin="dense" size="small" onChange={(e) => setEmail(e.target.value)}/>
                    <TextField fullWidth id="outlined-basic" type="password" value={password} label="Password" variant="outlined" margin="dense" size="small" onChange={(e) => setPassword(e.target.value)}/>
                    <div className="forgot-container">
                        <Link style={{textDecoration: "none"}} to="/resetpassword">Forgot password?</Link>
                    </div>
                </CardContent>
                <CardActions>
                    <Button onClick={handleLogIn} disabled={loading} fullWidth variant="contained">Log In</Button>
                </CardActions>
            </Card>
            <Card variant="outlined" sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"2.5rem", marginTop:"1rem"}}>
                <CardContent>
                    <Typography variant="subtitle1" sx={text1Style}>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}