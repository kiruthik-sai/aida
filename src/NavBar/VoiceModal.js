import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useWhisper } from '@chengsokdara/use-whisper';

import "./VoiceModal.css"
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
  
const test = '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';

const VoiceModal = ({ handleClose, text }) => {
    const {
      recording,
      speaking,
      transcribing,
      transcript,
      pauseRecording,
      startRecording,
      stopRecording,
    } = useWhisper({
      apiKey: process.env.REACT_OPENAI_APP_KEY,
      streaming: true,
      timeSlice: 1_000,
    });
    startRecording();
    const handleVoice = () => {
      stopRecording();
      //Handle sending the transcript to the backend
      handleClose();
    }
    return (
      <Backdrop onClick={handleVoice}>
        <motion.div
          onClick={(e) => {
            console.log('click');
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