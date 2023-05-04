
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
import Axios from './Util/Axios';
import {Errors} from './Util/interface';
import { useStateContext } from './Util/contentProvider';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';


export default function SignUp() {

  const [errors, setErrors] = useState<Errors>();
  const {setUser, setToken, token} = useStateContext()
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState<boolean>();


  const csrf = () => Axios.get('/sanctum/csrf-cookie');

  const register = async (payload:{}) => {

    if(token){

      await Axios.post('/logout')
        .then(() => {
          setUser({})
          setToken(null)
          
        })
      }

    await csrf();

     await Axios.post('/register' , payload)
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

           console.log('this is error: ', response.data.errors)
         }
       })

  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      employee_no: data.get('employee_no'),
      name: data.get('fname'),
      department: data.get('department'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
    }

    setSpinner(true);

    register(payload);
     

  };


  return (
  
      <Container component="main" maxWidth="sm">
         <Card sx={{  p:5, mt:10, width:'100%' }} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ mb: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <br/>
          <Typography component="h1" variant="h5" color="primary">
           Employee Task Manager Enrollment
          </Typography>
          <br/>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="employee_no"
                  required
                  fullWidth
                  id="employee_no"
                  label="Employee #"
                  autoFocus
                  error={errors?.employee_no?true:false}
                  helperText={errors?.employee_no?"Add Employee Number":''}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="fname"
                  label="Name"
                  name="fname"
                  autoComplete="family-name"
                  error={errors?.name?true:false}
                  helperText= {errors?.name?"Add Last Name":''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="depart"
                  label="Department"
                  name="department"
                  autoComplete="Department"
                  error={errors?.department?true:false}
                  helperText={errors?.department?"Add Email":''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Company Email"
                  name="email"
                  autoComplete="email"
                  error={errors?.email?true:false}
                  helperText={errors?.email?"Add Email":''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={errors?.password?true:false}
                  helperText="Must contain alteast 8 characters"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  error={errors?.password_confirmation.toString().includes('must match') ? true:false}
                  helperText={errors?.password_confirmation.toString().includes('must match') ?"Password Doesn't Match" :false}
                />
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" style={{color:'blue',}} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
        { spinner && <Box sx={{ display: 'flex', justifyContent:'center', mt:3, mb:7 }}>
          <CircularProgress color="primary"  size="4rem" thickness={3} /></Box>}
      </Card>
      </Container>
  
  );
}