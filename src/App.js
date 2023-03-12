import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { auth } from "./firebase/firebase"
import NavBar from "./NavBar/NavBar";
import { Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { Health } from "./health/health";
import AuthContext from "./components/AuthContext";
import SearchBar from "./Searchbar/SearchBar";

const ProtectedRoute = ({ user, redirectPath = '/signin' }) => {
    console.log("Current user: " + auth.currentUser);
    if (!user) {
        return (
        <>
        <Navigate to={redirectPath} replace />

        </>);
    }

    return (
        <>
            
            <Outlet />
            <NavBar />
            <SearchBar />
        </>);
};


function App() {
    // const [user, setUser] = React.useState(null);

    // if (auth.currentUser) {
    //     setUser(auth.currentUser);
    // }

    // let isAuth = user ? true : false;

    // console.log("Current user: " + auth.currentUser + " isAuth: " + isAuth);
    // const { user } = useContext(AuthContext);
    const user=true;
    // const user=1;
  const navigate = useNavigate();


    return (
        <>
        
            <Routes>
                <Route element={<ProtectedRoute user={user} />}>
                    <Route path="/home" element={<><h1>Home</h1></>} />
                    <Route path="/meds" element={<Health/>} />

                    <Route path="/" element={<><h1>Recall a Memory</h1></>} />

                    <Route path="/chat" element={<><h1>Chat</h1></>} />
                    <Route path="/settings" element={<><h1>Settings</h1></>} />
                </Route>
                <Route path="/signin" element={<SignIn />} />

            </Routes>
        
        </>

    );
}

export default App;
