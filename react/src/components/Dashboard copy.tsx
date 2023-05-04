import { Navigate } from "react-router-dom";
import { useStateContext } from "./Util/contentProvider";
import Button from '@mui/material/Button';
import Axios from "./Util/Axios";
import { useNavigate } from 'react-router-dom';



const Dashboard =()=> {

    const {user, token, setUser, setToken, notification} = useStateContext();
    const navigate = useNavigate();

    if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // const csrf = () =>
  
   await Axios.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
        navigate("/login",{ replace: true });
      })
  }

    return (
        <div>
            <Button  onClick={onLogout} >Log out</Button>
            <h1>Hello Again from Dashboard !!</h1>
        </div>
    )
}
export default Dashboard;