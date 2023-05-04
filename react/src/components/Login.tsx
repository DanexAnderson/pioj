
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import {Errors} from './Util/interface';
import Axios from './Util/Axios';
import { useStateContext } from './Util/contentProvider';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';


export default function SignIn() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>();
  const [spinner, setSpinner] = useState<boolean>();
  const { setUser, setToken, token } = useStateContext();

 

const csrf = () => Axios.get('/sanctum/csrf-cookie');

const login = async (payload:{}) => {


  if(token){

    await Axios.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
        localStorage.removeItem('USER_NAME');
        
      })
    }
  
  
 await csrf();
 await Axios.post('/login' , payload)
  .then(({data}) => {
 
         console.log('this is data: ', data);
         setUser(data.user)
         setToken(data.token);
         setSpinner(false);
         navigate("/",{ replace: true });

     })
     .catch(err => {

       console.log('this is top level error: ', err)
       const response = err.response;
       setSpinner(false);

       if (response && response.status === 422) {

         setErrors(response.data.errors)
         console.log('Email or Password Incorrect: ', response.data.errors)
       }
     })
}



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {

      email: data.get('email'),
      password: data.get('password'),

    }

    setSpinner(true);

    login(payload);

    // if (){

    // }

    

}

  return (
    
    <Container component="main" maxWidth="xs" >
        <Card sx={{  p:5, mt:10 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ mb: 3, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
           Task Manager
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors?true:false}
              helperText={errors?"Email or Password Incorrect":''}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
           {/*    <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item sx={{mt:1}}>
                <Link to="/register" style={{color:'blue',}} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
  
        { spinner && <Box sx={{ display: 'flex', justifyContent:'center', mt:5  }}>
          <CircularProgress color="primary"  size="4rem" thickness={3} /></Box>}
</Card>
      </Container>


  );
}