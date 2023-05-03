
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';

import axios from 'axios';

interface Errors {
  employee_no:string, name:string, email:string, password:string,
   password_confirmation:string,department: string,
}

export default function SignUp() {

  const [errors, setErrors] = useState<Errors>();


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

     axios.defaults.withCredentials = true;
     axios.get('http://localhost:8000' + '/sanctum/csrf-cookie');
     axios.post('http://localhost:8000/register' , payload)
     .then(({data}) => {
    
            console.log('this is data: ', data);

            // Add Router Navigation to Registration and login page
            // generate session token

        })
        .catch(err => {
          console.log('this is top error: ', err)
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
            console.log('this is error: ', response.data.errors)
          }
        })

  };

  

  return (
  
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <br/>
          <Typography component="h1" variant="h5" color="primary">
           Employee Task Manager Enrollment
          </Typography>
          <br/>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
  
  );
}