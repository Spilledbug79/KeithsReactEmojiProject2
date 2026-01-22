import React, { useState, useEffect } from 'react';
import './App.css'
import { motion, AnimatePresence } from 'framer-motion';


function ShowAll() {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchEmojis = async () => {
    setIsVisible(!isVisible);
    setLoading(true)
    try {
      const response = await fetch('https://emoji-api.com/emojis?access_key=0037c9794745ff1ccdf7425677fa8925df9c51d6');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmojis(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmojis();
  }, [1000]);

  if (error) {
    return <div className='ShowAllError'>Error: {error.message}</div>;
  }

  const handleNextEmoji = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % emojis.length);
  };

  const handlePreviousEmoji = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + emojis.length) % emojis.length);
  };

  if (!emojis || emojis.length === 0) {
    return <div>Loading emojis...</div>;
  }
  const currentEmoji = emojis[currentIndex];

  return (
    <div className='showAll'>
      <p className='showAllTitle'><strong>All Emojis Card Flipper:</strong></p>
      <button className='prevBtn' onClick={handlePreviousEmoji}>Previous Emoji</button>
      <AnimatePresence mode="wait"  >
        <motion.div className='motion'

          style={{
            width: "162px",
            height: "260px",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgray",
            alignContent: 'center',
            fontSize: '25px',
            padding: '5px',
            borderRadius: '15%',
            marginBottom: '10px',
            marginTop: '1px',
            fontWeight: '300px',
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg,rgb(248, 246, 246), #ffffff)',
            padding: ' 0.5em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '3px dashed   black',
            boxShadow: '10px 10px gray',
            marginLeft: '5px'


          }}

          key={currentEmoji.slug}

          initial={{
            rotateY: 360, rotateX: -360, opacity: 0,
            transformPerspective: 500, // Adjust perspective value as needed
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)", // No shadow initially 
          }}
          animate={{
            rotateY: 0, opacity: 1,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)", // Maintain no shadow during enter animation
            transition: { duration: 0.3, ease: "easeOut" }, // Adjust duration and easing
          }}
          exit={{
            rotateX: -120, rotateY: 120, opacity: 0,
            boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3, ease: "easeIn" },
          }}
          transition={{ duration: 1.0 }}



        >

          {currentEmoji.codePoint},<br />
          <motion.div whileHover={{ scale: 5 }}>
            {currentEmoji.character}</motion.div> <br />
          {currentEmoji.slug}<br />
          {currentEmoji.group}<br />
          {currentEmoji.subGroup}


        </motion.div>
      </AnimatePresence>
      <button className='nextBtn' onClick={handleNextEmoji}>Next Emoji</button>
    </div>
  );
}

export default ShowAll;