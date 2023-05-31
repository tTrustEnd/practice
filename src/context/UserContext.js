import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = React.createContext({ email: '', auth: false });

// @function  UserProvider
// Create function to provide UserContext

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
  const [user, setUser] = React.useState({ email: '', auth: false });

  const loginContext = (email, token) => {
    localStorage.setItem('token',token)
    localStorage.setItem('email',email)
    setUser((user) => ({
      email: email,
      auth: true,
    }),
    navigate('/')
    );
  
  };

  const logout = () => {
    if(localStorage.getItem('token')){
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/')
        setUser((user) => ({
            name: '',
            auth: false,
          }));
      }
    
  };

return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};