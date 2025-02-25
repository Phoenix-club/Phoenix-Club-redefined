import { useGSAP } from '@gsap/react'
import axios from 'axios'
import gsap from 'gsap'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Link, NavLink } from 'react-router-dom'

const Announcements = () => {
  const containerRef = useRef(null)
  const currentDate = new Date();
  const [events, setEvents] = useState([]) // Store all events
  const [currentEvent, setCurrentEvent] = useState({}) // Store the current event
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      'Content-Type': "application/json"
    }
  })

  const parallaxRefs = {
    background: [useRef(null), useRef(null)],
    middleground: [useRef(null), useRef(null), useRef(null)],
    frontground: [useRef(null), useRef(null), useRef(null)]
  };

  const fetchData = async () => {
    const response = await client.get('/events');
    setEvents(response.data)
    // Set the first event as the current event
    if (response.data.length > 0) {
      setCurrentEvent(response.data[0])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(parallaxRefs.background.map(ref => ref.current), {
        duration: 15, x: "1%", yoyo: true, repeat: -1, ease: "power1.inOut", force3D: true, lazy: true
      });

      gsap.to(parallaxRefs.middleground.map(ref => ref.current), {
        duration: 20, x: "-3%", yoyo: true, repeat: -1, ease: "power1.inOut", force3D: true, lazy: true
      });

      gsap.to(parallaxRefs.frontground.map(ref => ref.current), {
        duration: 12, x: "2%", yoyo: true, repeat: -1, ease: "power1.inOut", force3D: true, lazy: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEventClick = useCallback((event) => {
    setCurrentEvent(event)
  }, []);

  return (
    <div
      ref={containerRef}
      className='w-full h-full flex absolute justify-between items-start select-none overflow-hidden bg-[#17141C]'
      style={{ willChange: "transform" }} // Enable GPU acceleration
    >
      <h1 className='text-[#FDE37D] absolute right-10 top-12 text-7xl max-md:text-4xl font-pixelSans font-extrabold z-10'>
        Announcements
      </h1>

      {/* Dashboard */}
      <section className='w-full h-full flex flex-col justify-between items-center p-7'>
        <section className='w-full h-fit flex flex-col overflow-hidden pt-24 z-10'>
          <div className='w-full h-fit gap-5 font-pixelSans flex flex-col justify-center items-start text-5xl text-[#fff]'>
            <h1 className='text-5xl max-md:text-3xl p-5 border-l-4 border-t-4 border-[#fff]'>{currentEvent.name}</h1>
            <p className='text-xl max-md:text-lg max-md:w-full w-1/2'>{currentEvent.description}</p>
            {currentEvent.date > currentDate  ? 
              <Link to={"/register"} state={{ name : currentEvent.name}} className='text-2xl hover:cursor-pointer text-[#1B9E64]'>
                Register Now
              </Link> : 
              <h2 className='text-2xl hover:cursor-not-allowed text-nOran/70'>
                Event Concluded, Try Next Time !
              </h2>
            }
            <p className='text-lg pl-5'>Fees: ₹{currentEvent.fees}</p>
            <p className='text-lg pl-5'>Date: {new Date(currentEvent.date).toLocaleString()}</p>
            <p className='text-lg pl-5'>Deadline: {new Date(currentEvent.deadline).toLocaleString()}</p>
            <p className='text-lg pl-5'>Venue: {currentEvent.venue}</p>
            <p className='text-lg pl-5'>Event Type: {currentEvent.event_type}</p>
            <p className='text-lg pl-5'>Capacity: {currentEvent.event_capacity}</p>
            <p className='text-lg pl-5'>Registered: {currentEvent.current_registration}</p>
          </div>
        </section>
        {!isMobile && (
          <section className='flex items-end justify-end h-1/2 w-1/3 z-10'>
            <img
              className='h-full w-full object-cover p-5 border-r-4 border-b-4 border-[#fff]'
              src={currentEvent.poster}
              loading="lazy"
            />
          </section>
        )}
      </section>

      {/* Dashboard Titles */}
      <section className='w-[35rem] max-md:w-72 z-50 h-fit p-10 absolute right-4 max-md:right-0 top-64 max-md:top-[60%] text-4xl max-md:text-2xl font-pixelSans text-[#fff]'>
        {events.map((event, index) => (
          <h1
            key={index}
            className='events border-[#FFF] hover:border-b-4 transition-all hover:px-5'
            onClick={() => handleEventClick(event)}
          >
            {event.name}
          </h1>
        ))}
      </section>

      {/* Parallax Layers */}
      {Array.from({ length: 6 }, (_, i) => {
        const index = i + 1;
        const refType = index <= 2 ? 'background' : index <= 4 ? 'middleground' : 'frontground';
        const refIndex = refType === 'background' ? i : refType === 'middleground' ? i - 2 : i - 4;

        return (
          <section
            key={`paralx${index}`}
            ref={parallaxRefs[refType][refIndex]}
            style={{ zIndex: 7 - index, willChange: "transform" }}
            className='absolute left-0 h-full w-full flex'
          >
            <img
              loading='lazy'
              className='w-full h-full object-cover'
              src={`/src/assets/cave/${index}.png`}
              alt=""
            />
          </section>
        );
      })}

      {/* Navigation */}
      <NavLink
        to='/'
        className='text-[#F6CAB6] group absolute z-50 bottom-10 left-10 text-5xl max-md:text-3xl font-pixelSans'
      >
        <span className='group-hover:border-[#F6CAB6] group-hover:bg-[#FDE37D]/30 group-hover:text-[#FDE37D] border-4 max-md:px-1 px-3 border-[#FDE37D] rounded-lg transition-all flex'>
          <img
            className='object-contain w-[50px] max-md:w-9 scale-x-[-1] group-hover:-translate-x-3 transition-all'
            src={"/src/assets/play.png"}
            alt="Play icon"
            loading="lazy"
          />
          Home
        </span>
      </NavLink>
    </div>
  )
}

export default Announcements;
