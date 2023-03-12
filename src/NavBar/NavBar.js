import React from 'react'
import PropTypes from 'prop-types'
import "./NavBar.css";
import { useEffect } from "react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import VoiceModal from './VoiceModal';
const NavBar = props => {
    const [modalOpen, setModalOpen] = useState(false);

    const close = () => {
        setModalOpen(false);
        let menuToggle = document.querySelector(".menuToggle");
        if (menuToggle) {
            menuToggle.classList.add("active");
        }

        if (document.querySelector(".searchBar")) {

            document.querySelector(".searchBar").style.visibility = "visible";
        }
        if (document.querySelector(".ocrBar")) {

            document.querySelector(".ocrbar").style.visibility = "visible";
        }
    };
    const open = () => {
        setModalOpen(true)
        let menuToggle = document.querySelector(".menuToggle");
        if (menuToggle) {
            menuToggle.classList.remove("active");
        }
        if (document.querySelector(".searchBar")) {

            document.querySelector(".searchBar").style.visibility = "hidden";
        }
        if (document.querySelector(".ocrBar")) {

            document.querySelector(".ocrBar").style.visibility = "hidden";
        }
        
    };


    useEffect(() => {
        let menuToggle = document.querySelector(".menuToggle");
        menuToggle.onclick = function () {
            menuToggle.classList.toggle("active");
            if (!menuToggle.classList.contains("active")) {
                setModalOpen(true)
                if (document.querySelector(".searchBar")) {

                    document.querySelector(".searchBar").style.visibility = "hidden";
                }
                if (document.querySelector(".ocrBar")) {

                    document.querySelector(".ocrBar").style.visibility = "hidden";
                }
                
            }
            else {
                setModalOpen(false)
                if (document.querySelector(".searchBar")) {
                    console.log("searchBar exists and showing")
                    document.querySelector(".searchBar").style.visibility = "visible";
                }
                if (document.querySelector(".ocrBar")) {

                    document.querySelector(".ocrBar").style.visibility = "visible";
                }
            }
        }

        //Write a function to toggle the selected class in the menu's li's according to the current page location
        let menu = document.querySelector(".menu");
        let menuItems = document.querySelectorAll(".menu li");
        function toggleSelected() {
            menuItems.forEach(item => {
                const link = item.querySelector("a");
                if (!link) {
                    return;
                }
                item.classList.remove("selected");
                if (link.getAttribute("href") === window.location.pathname) {
                    item.classList.add("selected");
                }
            });
        }
        // toggleSelected();

    });
    return (<>
        <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
        >


            {modalOpen && <VoiceModal modalOpen={modalOpen} handleClose={close} />}
        </AnimatePresence>
        <div className="navigation">
            <div className="menuToggle active"><div className="middle"><ion-icon name="mic"></ion-icon></div></div>
            <div className="menu">
                <ul>
                    <li style={{ "--i": "0.1s" }}><CustomLink to="/home"><ion-icon name="home"></ion-icon></CustomLink></li>
                    <li style={{ "--i": "0.2s" }}><CustomLink to="/meds"><ion-icon name="medkit"></ion-icon></CustomLink></li>
                    <li></li>
                    <li style={{ "--i": "0.2s" }}><CustomLink to="/chat"><ion-icon name="chatbubble-ellipses"></ion-icon></CustomLink></li>
                    <li style={{ "--i": "0.1s" }}><CustomLink to="/video"><ion-icon name="videocam"></ion-icon></CustomLink></li>
                </ul>
            </div>
        </div>
    </>
    );
}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <NavLink to={to} > <section className={match ? "selected" : ""}>
                {children}
        </section>
        </NavLink>
    )
}
NavBar.propTypes = {}

export default NavBar