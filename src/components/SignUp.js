import {auth, database} from '../firebase/firebase';
import {useState} from 'react';

import React from 'react'

export default function SignUp({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');    
    const [confirmPassword, setConfirmPassword] = useState('');

    let onSignUp = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                database.ref('users/' + user.uid).set({
                    name: name,
                    email: email
                })
                console.log("signUp completed", user.uid)
                //Add navigation here, navigation.navigate()
                history.push('/');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    return (
        <div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />
            <button onClick={onSignUp} >Sign Up</button>
        </div>
    )
}
