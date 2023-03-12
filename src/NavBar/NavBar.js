import React from 'react'
import PropTypes from 'prop-types'
import "./NavBar.css";
import { useEffect } from "react";
import { Link,NavLink,useMatch,useResolvedPath } from "react-router-dom";
const NavBar = props => {
 
    useEffect(() => {
        let menuToggle = document.querySelector(".menuToggle");
        menuToggle.onclick = function () {
            menuToggle.classList.toggle("active");
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
        return (
            <div className="navigation">
                <div className="menuToggle active"><div className="middle"><ion-icon name="mic"></ion-icon></div></div>
                <div className="menu"> 
                <ul>
                    <li style={{"--i": "0.1s"}}><CustomLink to="/home"> <ion-icon name="home"></ion-icon></CustomLink></li>
                    <li style={{"--i": "0.2s"}}><CustomLink to="/meds"><ion-icon name="medkit"></ion-icon></CustomLink></li>
                    <li></li>
                    <li style={{"--i": "0.2s"}}><CustomLink to="/chat"><ion-icon name="chatbubble-ellipses"></ion-icon></CustomLink></li>
                    <li style={{"--i": "0.1s"}}><CustomLink to="/settings"><ion-icon name="cog"></ion-icon></CustomLink></li>
    </ul>
                </div>
            </div>
        );
}

function CustomLink({ to, children }) {
const resolvedPath = useResolvedPath(to);
const match = useMatch({ path: resolvedPath.pathname, end: true });
return (
    <NavLink to={to} > <section className={match ? "selected" : ""}
    >{children} </section></NavLink>
)
}
NavBar.propTypes = {}

export default NavBar