import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {createRef, useState, useRef} from "react";
import Button from '@mui/material/Button';


const Register  = ()=> {

    const nameRef = useRef<HTMLDivElement|any>()
    const emailRef = useRef<HTMLDivElement|any>()
    const passwordRef = useRef<HTMLDivElement|any>()
    // const passwordConfirmationRef = createRef()
    // const {setUser, setToken} = useStateContext()
    // const [errors, setErrors] = useState(null)
  
    const onSubmit = (ev: { preventDefault: () => void; }) => {
      ev.preventDefault()
      const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          // password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log('we here!!', payload);
        return;
    //   axiosClient.post('/signup', payload)
      axios.post('localhost:8000/register', payload)
        .then(({data}) => {
            console.log('this is data: ', data)
        //   setUser(data.user)
        //   setToken(data.token);
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            // setErrors(response.data.errors)
          }
        })
    }

    return (
        <div>
            <h1>We at Register</h1>



    <Box
    onSubmit={onSubmit}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" inputRef={nameRef} label="Name" variant="outlined" />
      <TextField id="filled-basic" inputRef={emailRef} label="Email" variant="filled" />
      <TextField id="standard-basic" inputRef={passwordRef} label="Password" variant="standard" />

      <Button variant="contained" type="submit" >Submit</Button>
    </Box>


        </div>
    )
}
export default Register;