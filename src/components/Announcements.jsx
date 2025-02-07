import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Loader from './Loader'
import { NavLink } from 'react-router'

const Announcements = ({ loading, setLoading }) => {

  const events = [
    { event: "Code-Relay", desc: "Code relay is competition which combines DSA coding compatibility with Teamwork to achieve absolute sofware coding skills", image: "../src/assets/events/1.jpeg", active: true },
    { event: "Prompt Quest", desc: "Explore your prompting skills using Prompt Quest and boost your creativity while competing", image: "../src/assets/events/3.jpeg", active: false },
  ]

  const [event, setEvent] = useState(events[0])
  useGSAP(() => {
    gsap.to(['#paralx1', '#paralx8'], {
      // background
      duration: 55,
      x: "5%",
      yoyo: true,
      repeat: -1,
      // ease:"linear",
    }),
      gsap.to(['#paralx2', '#paralx6', '#paralx3'], {
        // middleground
        duration: 60,
        x: "-15%",
        yoyo: true,
        repeat: -1,
        // ease:"linear",
      }),
      gsap.to(['#paralx7', '#paralx4', '#paralx5'], {
        // frontground
        duration: 45,
        x: "-10%",
        yoyo: true,
        repeat: -1,
        // ease:"linear",
      })
  })

  const handleAnimationStart = () => {
    document.body.style.overflow = 'hidden'; // Hide scrollbar
  };

  useEffect(() => {
    const hoverClick = document.querySelectorAll('.events');

    const handleClick = (e) => {
      const clickedEvent = e.target.innerHTML;
      const foundEvent = events.find(ev => ev.event === clickedEvent);
      if (foundEvent) {
        setEvent(foundEvent);
      }
    };

    //   setLoading(true)
    //   if(loading){setTimeout(() => {
    //     setLoading(false)
    //   }, 1000)
    // }

    hoverClick.forEach(e => e.addEventListener('click', handleClick));

    return () => {
      hoverClick.forEach(e => e.removeEventListener('click', handleClick));
    };
  }, [loading]);


  return (<>
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      id='container' className='w-full h-full flex  absolute rendering-pixelated justify-between items-start overflow-hidden  bg-[#17141C] '>
      <h1 className='text-[#FDE37D] absolute right-10 top-12 text-7xl font-pixelSans scale-y-150 font-extrabold z-[5] transition-all duration-1000'>Announcements</h1>

      {/* Dashboard */}
      <section className='w-full h-full flex flex-col justify-between items-center p-10 py-24'>
        <section className='w-full h-fit flex flex-col overflow-hidden  z-[10]'>
          <div className='w-96 h-fit gap-10 p-5 border-l-4 border-t-4 border-[#fff] font-pixelSans flex flex-col justify-center items-start text-5xl text-[#fff] transition-all'>
            <h1 className='text-5xl'>{event.event}</h1>
            <p className='text-xl'>{event.desc}</p>
            {event.active && <h2 className='text-xl transition-all  hover:cursor-context-menu'> Register Now</h2>}
          </div>
        </section>
        <section className='flex items-end justify-end h-1/2 w-1/3  z-[5]'>
          <img className='h-full w-fit object-cover p-5 border-r-4 border-b-4 border-[#fff]' src={event.image} alt="" />
        </section>
      </section>
      {/* Dashboard Titles  */}
      <section className='w-[35rem] h-fit p-10 absolute pt-32 gap-5  z-10 font-pixelSans right-4 top- text-4xl text-[#fff]'>
        <h1 className='events border-[#FFF] hover:border-b-4 transition-all hover:px-5'>Code-Relay</h1>
        <h1 className='events border-[#FFF] hover:border-b-4 transition-all hover:px-5'>Prompt Quest</h1>
        <h1 className='events border-[#FFF] hover:border-b-4 transition-all hover:px-5'>Pixel Perfect</h1>
      </section>

      {/* back section */}
      <section id='paralx1' className='object-cover absolute left-0  h-full w-full flex z-[6] justify-end'>
        <img loading='lazy' className='w-full h-full object-cover' src="../src/assets/cave/1.png" alt="" />
        <img loading='lazy' className='w-full h-full object-cover' src="../src/assets/cave/1.png" alt="" />
      </section>
      <section id='paralx2' className='object-cover absolute left-0  h-full w-full flex z-[5] '>
        <img loading='lazy' className='object-cover ' src="../src/assets/cave/2.png" alt="" />
        <img loading='lazy' className=' object-cover' src="../src/assets/cave/2.png" alt="" />
      </section>
      <section id='paralx3' className='object-cover absolute left-0  h-full w-full flex z-[4] '>
        <img loading='lazy' className='object-cover' src="../src/assets/cave/3.png" alt="" />
        <img loading='lazy' className=' object-cover' src="../src/assets/cave/3.png" alt="" />
      </section>
      <section id='paralx4' className='object-cover absolute left-0  h-full w-full flex z-[3] '>
        <img loading='lazy' className='object-cover' src="../src/assets/cave/4.png" alt="" />
        <img loading='lazy' className=' object-cover' src="../src/assets/cave/4.png" alt="" />
      </section>
      <section id='paralx5' className='object-cover absolute left-0  h-full w-full flex z-[2] '>
        <img loading='lazy' className='object-cover' src="../src/assets/cave/5.png" alt="" />
        <img loading='lazy' className=' object-cover' src="../src/assets/cave/5.png" alt="" />
      </section>
      <section id='paralx6' className='object-cover absolute left-0  h-full w-full flex z-[1] '>
        <img loading='lazy' className='object-cover' src="../src/assets/cave/6.png" alt="" />
        <img loading='lazy' className=' object-cover' src="../src/assets/cave/6.png" alt="" />
      </section>
      <NavLink id='viewTranstion' to={'/'} className='text-[#F6CAB6] group absolute z-50 bg-clip-text p-1 bottom-10 left-10 text-5xl h-fit font-pixelSans' viewTransition>
        <span className='group-hover:border-[#F6CAB6] group-hover:bg-[#FDE37D]/30 group-hover:text-[#FDE37D] border-4 px-3 border-[#FDE37D] rounded-lg transition-all flex'>
        <img className='object-contain w-[50px] scale-x-[-1] group-hover:-translate-x-3 transition-all' src="../src/assets/play.png" alt="" />
           Home
        </span> 
      </NavLink>
      {/* <section id='paralx7' className='object-cover opacity-50  absolute left-0  h-full w-full flex z-[0] '>
        <img className='object-cover' src="../src/assets/cave/7.png" alt="" />
        <img className=' object-cover' src="../src/assets/cave/7.png" alt="" />
        </section> */}
      {/* <section id='paralx1' className='object-cover absolute left-0  h-full w-full flex z-[7] justify-end'>
        <img className='object-cover' src="../src/assets/cave/9.png" alt="" />
        <img className=' object-cover' src="../src/assets/cave/9.png" alt="" />
        </section> */}
    </motion.div>
  </>
  )
}

export default Announcements
