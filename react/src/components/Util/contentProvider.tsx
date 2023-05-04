import {createContext, useContext, useState} from "react";
import { UserContextType } from "./interface";

const StateContext = createContext<UserContextType>({
  user: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
})

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');

    const setToken = (token:string) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
          
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
           
            
        }
    };

    const setNotification = (message:string) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('');
        }, 5000);
    };

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);