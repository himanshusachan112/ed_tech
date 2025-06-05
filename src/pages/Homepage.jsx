import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Homepage_loggedin from '../components/core/HomePage/Homepage_loggedin';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaReact, FaNodeJs, FaPython, FaJsSquare } from "react-icons/fa";
import playbar from "../assets/Images/banner.mp4"
import { Link } from 'react-router-dom';

const codingImages = [
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
  // "https://images.unsplash.com/photo-1581090700227-1e8e8e1b1d1e?auto=format&fit=crop&w=600&q=80",
  // "https://cdn.pixabay.com/photo/2017/01/06/19/15/keyboard-1952011_1280.jpg",
  "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  "https://cdn.pixabay.com/photo/2016/11/29/03/53/code-1869237_1280.jpg",
  "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  "https://cdn.pixabay.com/photo/2015/09/05/21/51/computer-925521_1280.jpg",
  "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-cyan-400 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-xl transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Homepage = () => {

  const { token } = useSelector((state) => state.Auth);
  const icons = [
      <FaLaptopCode />, <FaReact />, <FaNodeJs />, <FaPython />, <FaJsSquare />,
    ];

  return (
    <>
      {
        token ? <Homepage_loggedin/> : <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-start p-6 space-y-10 overflow-y-auto">
      <motion.div
        className="flex flex-col items-center space-y-4 mt-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <video
          src={playbar}
          autoPlay
          alt="Video Playbar"
          className="w-full max-w-xl rounded-xl shadow-xl"
        />
        <p className="text-lg text-center">Log in to access videos and enjoy interactive learning</p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center mt-10"
      >
        Welcome to the CODE REPS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg text-center"
      >
        Log in to access videos and become part of our tech community
      </motion.p>

      <motion.div
        className="flex space-x-6 text-4xl"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            }, 
          },
        }}
      >
        {icons.map((icon, index) => (
          <motion.div
            key={index}
            className="hover:text-cyan-400"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2 }}
          >
            {icon}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Button  variant="secondary" className="text-black font-semibold px-6 py-3 rounded-xl">
          <Link to='/login'>Log In</Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
        {codingImages.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Coding scene ${index + 1}`}
            className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
        
      }
 

    </>
  )
}

export default Homepage