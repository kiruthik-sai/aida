import { Container, Box } from '@mui/material';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider } from "firebase/auth";
import {
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { auth, fireBaseAuth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export const Authentication = () => {
  const nav = useNavigate()
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(fireBaseAuth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      nav('/home');
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container
        component='main'
        maxWidth='xs'
        style={{
          backgroundImage: 'url(https://i.ibb.co/xsHhZBZ/Onboarding-1.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
            height: '100vh',
          position: 'absolute',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          alignItems: 'center',
            display: 'flex',
        }}
      >
      <Box
          style={{
            position: 'fixed',
            left: 'calc(50% - 120px)',
            bottom: '7.5vh',
            // display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <GoogleButton 
          style={{
            width: '240px',
            height: '50px',
          }}
          onClick={handleGoogleLogin}
          >
            Register with google
          </GoogleButton>
        </Box>
    </Container>
  );
}