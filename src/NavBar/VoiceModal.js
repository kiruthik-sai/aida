import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import "./VoiceModal.css"
const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        damping: 90,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        duration: 2,
        type: "spring",
        damping: 90,
        stiffness: 500,
      },
    },
  };
  

const VoiceModal = ({ handleClose, text }) => {

    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="voiceModal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
           
            {/* <button className="closeButton" onClick={handleClose}>X</button> */}
          </motion.div>
      </Backdrop>
    );
  };

  
  export default VoiceModal;