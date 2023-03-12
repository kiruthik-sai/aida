import React from 'react'
import "./SearchBar.css";
import { useEffect, useState } from "react";
import { Link,NavLink,useMatch,useResolvedPath } from "react-router-dom";
import Modal from './Modal';
import Backdrop from './Backdrop';
import {motion,AnimatePresence} from "framer-motion";
import OCRModal from './OCRModal';

const SearchBar = props => {
    const [modalOpen, setModalOpen] = useState(false);
    const [ocrmodalOpen, setOcrModalOpen] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    const ocrclose = () => setOcrModalOpen(false);
    const ocropen = () => setOcrModalOpen(true);
 
    
        return (
            <>
            <div>
            <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="searchBar"
            onClick={() => (modalOpen ? close() : open())}
            >
                <div className='searchIcon'><ion-icon  name="search"></ion-icon></div>
            </motion.button>

            <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="ocrBar"
            onClick={() => (ocrmodalOpen ? ocrclose() : ocropen())}
            >
                <div className='ocrIcon'><ion-icon name="camera"></ion-icon></div>
            </motion.button>
            </div>

            <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={()=>null}
            >

                
                {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
                {ocrmodalOpen && <OCRModal modalOpen={ocrmodalOpen} handleClose={ocrclose} />}
            </AnimatePresence>
            </>
        );
}



export default SearchBar