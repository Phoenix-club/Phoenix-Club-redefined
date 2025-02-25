import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ image }) => {


  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease:'circInOut' }}
    className='bg-[#000000] w-screen h-screen flex justify-center items-center overflow-hidden'
    >
        <div className='w-fit h-1/4 flex flex-col justify-center items-center'>
          <img className='w-full h-full object-contain' src={image} alt="" />
          <span className='text-6xl text-[#fff] font-extrabold font-pixelSans'>Loading ...</span>
        </div>
    </motion.div>
  )
}

export default Loader