
import Navbar from './components/Layout/Navbar'
import NavbarLogin from './components/Layout/NavbarLogin';
import Router from './components/Layout/Router';
import { useLocation } from 'react-router-dom'
import { useStateContext } from './components/Util/contentProvider';
import { useEffect } from 'react';


function App() {
  const location = useLocation().pathname;

  // console.log('this is location', location);

  const {user, token, setUser, setToken, notification} = useStateContext();


  if(user.name){
    localStorage.setItem('USER_NAME', user?.name);
  }

  const username = localStorage.getItem('USER_NAME');

  
  useEffect(() => {
    setUser({name:username});
    
}, [username]);


  return (
    <>
    {location=="/"||token?<Navbar />:<NavbarLogin/>}
    
    <Router />

     </>
  )
}

export default App
