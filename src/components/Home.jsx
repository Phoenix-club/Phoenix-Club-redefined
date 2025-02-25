import React, { useEffect, useState } from 'react'
import "@fontsource/tilt-neon";
import HeroSection from './HeroSection';
import Announcements from './Announcements';
import Members from './Members';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './Loader';
import { label } from 'framer-motion/client';
import Registration from './Registration';
import Overlay from './Overlay';

const Home = () => {

  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState('/src/assets/car.gif')
  const [eventId, setEventId] = useState(null)
  const location = useLocation()

  useEffect(()=>{
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000);
  },[location])


  useEffect(()=>{
    switch (location.pathname) {
      case '/announcements':
        setImage('/src/assets/minero.gif ')
        break;

      case '/members':
        setImage('/src/assets/spaceship.gif')
        break;

      case '':
          setImage('/src/assets/car.gif')
          break;

      case '/register':
          setImage('/src/assets/ticking.gif')
          break;

      default:
        setImage('/src/assets/car.gif')
        break;
    }

  },[location])
  return (
    <AnimatePresence>
      {
      loading ?
      <Loader key='loader' image={image}/> : 

      <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease:'circInOut' }}
      >

        <Routes location={location}>
          <Route index path='/' element={<HeroSection />} />
          <Route path='/announcements' element={<Announcements setEventId={setEventId} />} />
          <Route path='/register' element={<Registration eventId={eventId} />} />
          <Route path='/members' element={<Members />}/>
          <Route path='/loader' element={<Loader />}/>
        </Routes>
      </motion.div>
      }
    </AnimatePresence>
  )
}

export default Home