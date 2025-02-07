import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion';
import gsap from 'gsap'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router';
import Loader from './Loader';


const HeroSection = ({ loading, setLoading, setImage}) => {
  useEffect(()=>{
    window.addEventListener('pageswap',(event)=>{
        if(!event.viewTransition) return;

        const oldURL = event.activation.from.url;
        const targetURL = event.activation.entry.url;
        console.log(oldURL,targetURL)

        // setLoading(true)
        // if(loading){setTimeout(() => {
        //     setLoading(false)
        //   }, 1000);
        // }

    })
  },[loading])


  useGSAP(()=>{
    gsap.to('.bg2',{
      // background
      duration:35,
      x:"-10%",
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
  // initial={{ opacity: 0 }}
  // animate={{ opacity: 1 }}
  // exit={{ opacity: 0 }}
  
  className='w-full h-screen flex justify-start relative rendering-pixelated overflow-hidden'>
    <section className=' left-0 z-10 flex overflow-clip justify-start w-full h-screen object-cover items-end'>
        <img className='bg h-full w-full object-cover z-10' src="../src/assets/back.png " alt="" />
        <img className='bg h-full w-full object-cover z-10' src="../src/assets/back.png " alt="" />
        <img className='bg h-full w-full object-cover z-10' src="../src/assets/back.png " alt="" />
        
    </section>
    <section className=' absolute z-20 flex overflow-hidden items-end justify-start w-[500vh] h-screen '>
        <img className='bg1 w-1/2 object-cover z-20' src="../src/assets/buildings.png" alt="" />
        <img className='bg1 w-1/2  object-cover  z-20' src="../src/assets/buildings.png" alt="" />
        <img className='bg1 w-1/2 object-cover z-20' src="../src/assets/buildings.png" alt="" />
        <img className='bg1 w-1/2  object-cover  z-20' src="../src/assets/buildings.png" alt="" />
    </section>
    <h1 className='text-[#FDE37D] left-16 text-[10rem] font-sans scale-y-150 font-extrabold absolute top-[3rem] z-10 '>PHOENIX CLUB</h1>
    <div className='w-fit rounded-xl bg-[#181235]/70 border-4 p-5 pl-5 border-[#FDE37D] flex flex-col absolute z-50 top-[60vh] left-16'>
    <div className='group w-full h-full flex justify-center items-center'>
      <div className='h-10 w-10 flex justify-center items-center overflow-hidden '>
        <img className='opacity-0 h-20 w-20 object-cover group-hover:opacity-100 transition-all' src="../src/assets/star.gif" alt="" />
      </div>
      <NavLink id='viewTranstion' to={'/announcements'} className='text-[#F6CAB6] bg-clip-text p-1 pl-10 text-5xl h-fit font-pixelSans' viewTransition> Announcements</NavLink>
    </div>
    <div className='group w-full h-full flex justify-start items-center'>
      <div className='h-10 w-10 flex justify-center items-center overflow-hidden '>
        <img className='opacity-0 h-20 w-20 object-cover group-hover:opacity-100 transition-all' src="../src/assets/star.gif" alt="" />
      </div>
      <NavLink id='viewTranstion' to={'/members'} className='text-[#F6CAB6] bg-clip-text p-1 pl-10 text-5xl h-fit font-pixelSans' viewTransition > Members</NavLink>
    </div>
    </div>
    <section className='absolute z-30 flex overflow-hidden items-end justify-start w-[300vh] h-screen object-cover'>
        <img className='bg2 w-1/2 object-cover z-20' src="../src/assets/front.png" alt="" />
        <img className='bg2 w-1/2 object-cover z-20' src="../src/assets/front.png" alt="" />
        <img className='bg2 w-1/2 object-cover z-20' src="../src/assets/front.png" alt="" />
        <img className='bg2 w-1/2 object-cover z-20' src="../src/assets/front.png" alt="" />
    </section>
  </motion.div>
    </>
  )
}

export default HeroSection