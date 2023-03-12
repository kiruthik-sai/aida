import React from 'react'
import './Home.css'
import {motion} from 'framer-motion'
import convo from './convo.svg'
import note from './note.svg'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
  return (
    <div className="home">
        <motion.button className="convo" style={{ backgroundImage : `url(${convo})` }} whileTap={{ scale: 0.8 }}  onClick={() => {navigate('/chat')}}>
        </motion.button>
        
        <motion.button className="note"  style={{ backgroundImage : `url(${note})` }}  onClick={() => {

            
        }} >
        </motion.button>
    </div>
  )
}

export default Home