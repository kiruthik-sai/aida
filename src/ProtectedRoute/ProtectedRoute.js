// Protected Route Component for Firebase Auth

import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import {auth} from "../firebase/firebase"
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();
        console.log("Current user: "+auth.currentUser);
    if (auth.currentUser) {
        setUser(auth.currentUser);
    }
    
    let isAuth = user ? true : false;

    
    
    return (
        <Route
            {...rest}
            // element={isAuth ? element : <Navigate to="/signin" />}
            element={element}
        />  
    );
};

export default ProtectedRoute;