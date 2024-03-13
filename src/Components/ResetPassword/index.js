import React, {useState} from 'react';
import "./style.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import logo from "../../Assets/ReelsApp.png";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { database, auth } from '../../firebase';

function ResetPassword() {
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState("");
  const [alertSeverity,setAlertSeverity] = useState("");

  async function handlePasswordReset(){
        setLoading(true);

        const result = await database.users.where("email","==",email).get();
        
        if(result.empty)
        {
            setAlertSeverity("error");
            setAlert("Email not found in database");
        }else{
            await auth.sendPasswordResetEmail(email);
            setAlertSeverity("success");
            setAlert("Reset link sent to email");
        } 

        setTimeout(()=>{
            setAlert("");
        },2000);

        setLoading(false);
  }

  return (
    <div className="resetWrapper">
        <div className="resetCard">
            <Card variant="outlined" sx={{ maxWidth: 450 }}>
                <div className="logo-container">
                    <img src={logo}/>
                </div>
                <CardContent>
                    <Typography variant="subtitle1">
                        Enter registered email to receive the password reset link
                    </Typography>
                    {alert !== "" && <Alert severity={alertSeverity}>{alert}</Alert>}
                    <TextField fullWidth id="outlined-basic" label="Email" type="email" variant="outlined" margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant="contained" disabled={loading} onClick={handlePasswordReset}>Send reset link</Button>
                </CardActions>
            </Card>
        </div>
    </div>
  );
}

export default ResetPassword
