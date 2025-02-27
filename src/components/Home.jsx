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
  const [image, setImage] = useState('/car.gif')
  const [eventId, setEventId] = useState(null)
  const [event_type, setEvent_type] = useState(() => {
    return JSON.parse(localStorage.getItem("event_type")) || "";
  })
  const [feesEvent, setFeesEvent] = useState(() => {
    return JSON.parse(localStorage.getItem("feesEvent")) || 0;
  });
  const location = useLocation()
  const images = [
    "/cave/1.png",
    "/cave/2.png",
    "/cave/3.png",
    "/cave/4.png",
    "/cave/5.png",
    "/cave/6.png",
    "/cave/7.png",
    "/space/AIM2.png",
    "/space/CORNER.png",
    "/space/DECOR.png",
    "/space/DECOR1.png",
    "/space/INFO.png",
    "/space/INFO2.png",
    "/space/INFO3.png",
    "/space/MINFO.png",
    "/space/SINFO.png",
    "1.png",
    "6.png",
    "back.png",
    "buildings.png",
    "car.gif",
    "front.png",
    "logo.png",
    "minero.gif",
    "play.png",
    "spaceship.gif",
    "ss150.jpeg",
    "ss50.jpeg",
    "star.gif",
    "ticking.gif",
  ];

  const preloadImages = (imageArray) => {
    let loadedCount = 0;
    return new Promise((resolve)=>{
      imageArray.forEach((src)=>{
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount += 1;
            if(loadedCount === imageArray.length ){
              resolve();
            }
          };
          image.onerror = () =>{
            loadedCount += 1;
            if(loadedCount === imageArray.length){
              resolve();
            }
          };
        });
    });
  };
  
  useEffect(()=>{
    setLoading(true);
    preloadImages(images).then(()=>{
      setLoading(false);
    })
  },[location])

  useEffect(() => {
    localStorage.setItem("feesEvent", JSON.stringify(feesEvent));
    localStorage.setItem("event_type", JSON.stringify(event_type));
  }, [feesEvent,event_type]);


  useEffect(()=>{
    switch (location.pathname) {
      case '/announcements':
        setImage('/minero.gif ')
        break;

      case '/members':
        setImage('/spaceship.gif')
        break;

      case '':
          setImage('/car.gif')
          break;

      case '/register':
          setImage('/ticking.gif')
          break;

      default:
        setImage('/car.gif')
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
          <Route path='/announcements' element={<Announcements setEvent_type={setEvent_type} setFeesEvent={setFeesEvent} setEventId={setEventId} />} />
          <Route path='/register' element={<Registration event_type={event_type} feesEvent={feesEvent} eventId={eventId} />} />
          <Route path='/members' element={<Members />}/>
          <Route path='/loader' element={<Loader />}/>
        </Routes>
      </motion.div>
      }
    </AnimatePresence>
  )
}

export default Home
