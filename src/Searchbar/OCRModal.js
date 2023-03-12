import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import OCR from "../components/OCR";
import "./SearchBar.css"
const dropIn = {
    hidden: {
      y: "-100vh",
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
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 50,
        stiffness: 500,
      },
    },
  };
  

const OCRModal = ({ handleClose, text }) => {

    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="OCRModal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <OCR/>
            <button className="closeButton" onClick={handleClose}>X</button>
          </motion.div>
      </Backdrop>
    );
  };

  
  export default OCRModal;