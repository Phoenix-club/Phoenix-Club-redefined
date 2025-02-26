import { useGSAP } from '@gsap/react'
import axios from 'axios'
import gsap from 'gsap'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Link, NavLink } from 'react-router-dom'

const Announcements = ({ setEventId }) => {
  const containerRef = useRef(null)
  const currentDate = new Date();
  document.body.style.overflowY = "hidden";
  const [events, setEvents] = useState([]) // Store all events
  const [currentEvent, setCurrentEvent] = useState({}) // Store the current event
  const client = axios.create({
    baseURL: "https://phoenixkkw.pythonanywhere.com/",
    headers: {
      'Content-Type': "application/json",
      'ngrok-skip-browser-warning': 'true' 
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
    if (response.data.length > 0) {
      setCurrentEvent(response.data[0])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const backendDate = currentEvent?.date ? new Date(currentEvent.date) : null;

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
      className='w-full h-full flex absolute justify-between items-start select-none overflow-y-scroll overflow-x-hidden bg-[#17141C]'
      style={{ willChange: "transform" }} // Enable GPU acceleration
    >
      <h1 className='text-[#FDE37D] absolute right-10 top-12 max-lg:top-1 text-7xl max-lg:text-4xl font-pixelSans font-extrabold z-10'>
        Events
      </h1>

      {/* Dashboard */}
      <section className='w-full h-full flex flex-col justify-start items-center p-5 max-lg:p-5'>
        <section className='w-full h-fit flex flex-col overflow-visible pt-5 z-10'>
          <div className='w-full h-fit gap-5 font-pixelSans flex flex-col justify-center items-start text-5xl text-[#fff]'>
            <h1 className='text-5xl max-lg:text-3xl p-5 border-l-4 border-t-4 border-[#fff]'>{currentEvent.name}</h1>
            <span className='h-fit w-fit flex justify-normal flex-col max-lg:text-md'>
              <p className='registration text-lg overflow-y-scroll z-50 max-md:text-lg max-md:w-full w-1/2'>{currentEvent.description}</p>
              <p className='text-lg max-md:text-sm pl-5'>Fees: ₹{currentEvent.fees}</p>
              <p className='text-lg max-md:text-sm pl-5'>Date: {new Date(currentEvent.date).toLocaleString()}</p>
              <p className='text-lg max-md:text-sm pl-5'>Deadline: {new Date(currentEvent.deadline).toLocaleString()}</p>
              <p className='text-lg max-md:text-sm pl-5'>For : {currentEvent.event_type}</p>
              <p className='text-lg pl-5'>Venue: {currentEvent.venue}</p>
              {backendDate > currentDate  ? 
                <Link onClick={()=> setEventId(currentEvent.id)} to={"/register"} state={{ data:{ name:currentEvent.name, event_type: currentEvent.event_type,  value:currentEvent.id } }} className='text-2xl w-fit p-5 group hover:cursor-pointer  text-[#1B9E64]'>
                  <span className='group-hover:hover:border-[#1B9E64] p-1 transition-all rounded-xl group-hover:hover:border-2'>
                  Register Now
                  </span>
                </Link> : 
                <h2 className='text-2xl hover:cursor-not-allowed text-nOran/70'>
                  Event Concluded, Try Next Time !
                </h2>
              }
            </span>
          </div>
        </section>
        {!isMobile && (
          <section className='flex items-end justify-end h-1/2 w-1/3 z-10'>
            <img
              className='h-[80%] object-cover p-5 border-r-4 border-b-4 border-[#fff]'
              src={currentEvent.poster}
              loading="lazy"
            />
          </section>
        )}
      </section>

      {/* Dashboard Titles */}
      <section className={`w-[35rem] max-lg:w-72 z-50 h-fit p-10 absolute right-5 max-lg:right-0 top-64 max-md:top-[60%] text-4xl max-lg:text-2xl font-pixelSans text-[#fff] ${isMobile && `border-4  bg-backG/10 backdrop-blur-sm h-fit w-fit -translate-x-8 `} `}>
      {Array.isArray(events) && events.length > 0 ? (
  events.map((event, index) => (
          <h1
            key={index}
            className="events border-[#FFF] hover:border-b-4 transition-all hover:px-5"
            onClick={() => handleEventClick(event)}
          >
            {event.name}
          </h1>
        ))
      ) : (
        <p className="text-gray-400">No events available</p>  // Show message instead of breaking
      )}
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
              src={`/cave/${index}.png`}
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
            src={"/play.png"}
            alt=""
            loading="lazy"
          />
          Home
        </span>
      </NavLink>
    </div>
  )
}

export default Announcements;
