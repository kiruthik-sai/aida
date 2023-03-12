import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useWhisper } from '@chengsokdara/use-whisper';

import "./VoiceModal.css"
import { useEffect } from "react";
const dropIn = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 90,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 50,
        stiffness: 500,
      },
    },
  };
  

const VoiceModal = ({ handleClose, text }) => {
  
  const url = "http://35.153.51.197/voice-note"

    const {
      recording,
      speaking,
      transcribing,
      transcript,
      pauseRecording,
      startRecording,
      stopRecording,
    } = useWhisper({
      //apiKey: env.process.REACT_OPENAI_APP_KEY,
      apiKey: test,
      streaming: true,
      timeSlice: 1_000,
    });
    useEffect(() => {
      console.log("hello world")
      startRecording();
    },[]);
    const postData = (text)=>{
      fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body:JSON.stringify({
              input: text
          })
      }).then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err))
  }
    const handleVoice = async () => {
        console.log("inside handle voice")
        await stopRecording()
        console.log("recording stoped")
        postData(transcript.text)
        console.log("post done")
        handleClose();
      
      //Handle sending the transcript to the backend
      
    }
    return (
      <Backdrop onClick={handleVoice}>
        <motion.div
          onClick={async (e) => {
            console.log('click');
            //await handleVoice()
            e.stopPropagation();
          }}
          className='voiceModal'
          variants={dropIn}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            fontFamily: "Poppins",
          }}
          >
            <p>{transcript.text}</p>
          </div>
        </motion.div>
      </Backdrop>
    );
  };

  
  export default VoiceModal;