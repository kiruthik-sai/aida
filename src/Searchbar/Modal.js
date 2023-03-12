import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useState } from "react";
import { auth } from "../firebase/firebase";
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


const Modal = ({ handleClose, text }) => {
    const url = "http://35.153.51.197/recall-chat"
    const [inputText, setInputText] = useState("")
    const [recallResponse, setRecallResponse] = useState("")

    const recall = () => {
        console.log(inputText)
        console.log(auth.currentUser.displayName)
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                input: inputText,
                name: auth.currentUser.displayName
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
            setRecallResponse(data)
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    }
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                
                    <button className="closeButton" onClick={handleClose}>X</button>
                    <div className="modalText">{recallResponse}</div>
                    <div className="inputTextArea">
                    <div className="second-input">

                        {/* <img src={pass} alt="pass" className="email" /> */}
                        <input type="text" onChange={e=>setInputText(e.target.value)} placeholder="........." className="inputText" />
                    </div>
                    <div className="send-button">
                        <button className="sendButton" onClick={recall}>Send</button>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    );
};


export default Modal;