import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion';
import gsap from 'gsap'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router';
import Loader from './Loader';
import { isMobile } from 'react-device-detect';


const HeroSection = ({ loading, setLoading, setImage}) => {



  useGSAP(()=>{
    gsap.to('.bg2',{
      // background
      duration:35,
      x:"-1%",
      yoyo:true,
      repeat:-1,
      // ease:"linear",
    }),
    gsap.to('.bg1',{
      // middleground
      duration:30,
      x:"-35%",
      yoyo:true,
      repeat:-1,
      // ease:"linear",
    }),
    gsap.to('.bg',{
      // frontground
      duration:25,
      x:"-70%",
      yoyo:true,
      repeat:-1,
      // ease:"linear",
    })
  })
  
  return (
    <>

  <motion.div
  className='w-full h-screen flex justify-start relative overflow-hidden'>
    <section className=' left-0 z-10 flex overflow-clip justify-start w-full h-screen object-cover items-end'>
        <img className='bg h-full w-full object-cover z-10' src="/back.png " alt="" />
        <img className='bg h-full w-full object-cover z-10' src="/back.png " alt="" />
        <img className='bg h-full w-full object-cover z-10' src="/back.png " alt="" />
        
    </section>
    <section className=' absolute z-20 flex overflow-hidden items-end justify-start w-[500vh] h-screen '>
        <img className='bg1 w-1/2 object-cover z-20' src="/buildings.png" alt="" />
        <img className='bg1 w-1/2  object-cover  z-20' src="/buildings.png" alt="" />
        <img className='bg1 w-1/2 object-cover z-20' src="/buildings.png" alt="" />
        <img className='bg1 w-1/2  object-cover  z-20' src="/buildings.png" alt="" />
    </section>
    <h1 className='text-[#FDE37D] left-16 text-[10rem] max-md:text-5xl max-lg:text-8xl max-md:left-2 font-sans scale-y-150 font-extrabold absolute top-[3rem] max-lg:top-32 max-md:top-[3rem] z-10 '>PHOENIX CLUB</h1>
    <div className='w-fit max-md:w-[90vw] rounded-xl bg-[#181235]/70 border-4 p-5 pl-5 max-md:p-0 max-md:pl-0 border-[#FDE37D] flex flex-col absolute z-50 top-[60vh] left-16 max-md:left-4'>
    <div className='group w-full max-md:w-fit h-full flex justify-center items-center'>
      {isMobile && <div className='h-10 w-10 flex justify-start items-center overflow-hidden '>
        <img className='opacity-0 h-20 w-20 object-cover group-hover:opacity-100 transition-all' src="/star.gif" alt="" />
      </div>}
      <NavLink id='viewTranstion' to={'/announcements'} className='text-[#F6CAB6] w-fit p-1 pl-10 max-md:p-0 text-5xl max-md:text-3xl h-fit font-pixelSans' viewTransition> Events</NavLink>
    </div>
    <div className='group w-full max-md:w-fit h-full flex justify-start items-center'>
    {isMobile && <div className='h-10 w-10 flex justify-center items-center overflow-hidden '>
        <img className='opacity-0 h-20 w-20 object-cover group-hover:opacity-100 transition-all' src="/star.gif" alt="" />
      </div>}
      <NavLink id='viewTranstion' to={'/members'} className='text-[#F6CAB6] w-fit p-1 pl-10 max-md:p-0 text-5xl h-fit font-pixelSans max-md:text-3xl ' viewTransition > Members</NavLink>
    </div>
    </div>
    <section className='absolute z-30 flex overflow-hidden items-end justify-start w-[300vh] h-screen object-cover'>
        <img className='bg2 w-1/2 object-cover z-20' src="/front.png" alt="" />
        <img className='bg2 w-1/2 object-cover z-20' src="/front.png" alt="" />
        <img className='bg2 w-1/2 object-cover z-20' src="/front.png" alt="" />
        <img className='bg2 w-1/2 object-cover z-20' src="/front.png" alt="" />
    </section>
  </motion.div>
    </>
  )
}

export default HeroSection