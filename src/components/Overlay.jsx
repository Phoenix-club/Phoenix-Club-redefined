import { Scroll, Text } from '@react-three/drei';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import React, { useEffect, useRef, useState } from 'react';
import MouseFollower from './MouseFollower';
import { isMobile } from 'react-device-detect';
import { Link, NavLink } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin)

const Section = ({scrollDiv , setScrollDiv,textContent, setTextContent }) => {
    const [title, setTitle] = useState('');
    const [hov, setHov] = useState('');
    const [click, setClick ] = useState(true)
    const [cursor,  setCursor] = useState('../src/assets/space/AIM2.png')
    const data = {
        Presidents: {
            Leader: "Riddhi Singvi",
            post1:"President",
            Voice: "Ashish Nagmoti",
            post2:"Voice-President",
            img1: "../src/assets/members/Riddhi.png",
            img2: "../src/assets/members/Ashish.png"
        },
        Secretaries: {
            Leader: "Vidhee Patwa",
            post1:"Secretary",
            Voice: "Aryan Suryawanshi",
            post2:"Joint-Secretary",
            img1: "../src/assets/members/VIDHEE.png",
            img2: "../src/assets/members/ARYAN.png"
        },
        Treasurers: {
            Leader: "Uday Shah",
            post1:"Treasurer",
            Voice: "Atharva Jadhav",
            post2:"Co-Treasurer",
            img1: "../src/assets/members/Uday.png",
            img2: "../src/assets/members/ATHARVA.png"
        },
        TechTeam: {
            Leader: "Lulwa Anif",
            post1:"Tech Lead",
            Voice: "Om Patil",
            post2:"Tech Co-Lead",
            img1: "../src/assets/members/LULWA.png",
            img2: "../src/assets/members/OREWA.png",
            1: "Pranjal Tile",
            2: "Mayur Jirapure",
            3: "Om Jadhav",
            4: "Prasad Desale"
        },
        CreativeTeam: {
            Leader: "Pratiksha Khandbahale",
            post1:"Creative Lead",
            Voice: "Siddhi Brahmankar",
            post2:"Creative Co-Lead",
            img1: "../src/assets/members/PRATIK.png",
            img2: "../src/assets/members/SIDDHI.png",
            1: "Riaan Attar",
            2: "Bhavesh Sonawane",
            3: "Anushka Paithankar",
            4: "Sanket Chaudhari",
            5: "Dhananjay Sonawane",
            6: "Neha Jadhav",
            7: "Sneha Tambe",
            8: "Shravni Kakad"
        },
        ManagementTeam: {
            1: "Akshada Devkar",
            2: "Ruchira Jawale",
            3: "Jogit Sonkar",
            4: "Avanti Patil",
            5: "Sampada Pawar",
            6: "Tanishka Kotkar",
            7: "Swara Tambat",
            8: "Chaitali Mali",
            9: "Krushna Malwatkar"
        }
    };
    
    const handleClick = (e) =>{
        setScrollDiv(parseInt(e));

        let scrollTarget = 0
        if(e == 1){
            scrollTarget = 0;
            setTitle("Presidents")
            setTextContent("Presidents")
        }
        else if(e == 4){
            scrollTarget = (2 -1)* 900;
            setTitle("Secretaries")
            setTextContent("Secretaries")
        }
        else if(e == 7){
            scrollTarget = (3.01 -1)* 900;
            setTitle("Treasurers")
            setTextContent("Treasurers")
        }
        else if(e == 3){
            scrollTarget = (4 -1)* 900;
            setTitle("TechTeam")
            setTextContent("TechTeam")
        }
        else if(e == 6){
            scrollTarget = (5 -1)* 900;
            setTitle("CreativeTeam")
            setTextContent("CreativeTeam")
        }
        else if(e == 5){
            scrollTarget = (6 -1)* 900;
            setTitle("ManagementTeam")
            setTextContent("ManagementTeam")
        }
    }



    return (
        <>
            <section className='h-screen w-screen flex max-sm:flex-col justify-between items-end overflow-clip cursor-none'>
                {/* Cutom cursor */}
            { !isMobile && <MouseFollower hov={hov} cursor={cursor}/>}
                {/* navbar */}
                <div className='h-full max-sm:h-1/2 w-full max-sm:w-full flex flex-col justify-between items-start text-[#fff] max-sm:flex-shrink-0 '>
                    <div className='w-full h-full max-sm:flex'>
                        <div
                        className={` ${ isMobile && `${click ? `translate-x-0 `: `-translate-x-[80%]`} bg-[url("/src/assets/space/INFO2.png")] overflow-visible bg-cover bg-bottom inset-0 opacity-80 bg-no-repeat` } flex flex-col h-[40vh] items-start max-md:gap-4 gap-7 font-pixelSans text-xl z-10 p-10 w-full transition-all duration-500 ease-in-out`}
                        onClick={()=>setClick(!click)}
                        >
                    {/* <img src="../src/assets/space/DECOR.png" className='h-10 opacity-60' alt="" /> */}
                            <button 
                                className='hover:text-xl hover:border-b hover:px-3 hover:font-bold translate-x-9 max-lg:-translate-x-3 transition-all cursor-none' 
                                onMouseEnter={()=> {
                                    setCursor('/src/assets/space/SINFO.png')
                                    setHov('Presidents')
                                }} 
                                onMouseLeave={()=>setCursor('/src/assets/space/AIM2.png')}
                                onClick={()=>{ handleClick(1)}} >
                                Presidents
                            </button>
                            <button
                                className='hover:text-xl hover:border-b hover:px-3 hover:font-bold translate-x-9 max-lg:-translate-x-3   transition-all cursor-none' 
                                onMouseEnter={()=> {
                                    setCursor('/src/assets/space/SINFO.png')
                                    setHov('Secretaries')
                                }} 
                                onMouseLeave={()=>setCursor('/src/assets/space/AIM2.png')}
                                onClick={()=> handleClick(4)}>
                                Secretaries
                            </button>
                            <button 
                                className='hover:text-xl hover:border-b hover:px-3 hover:font-bold translate-x-9 max-lg:-translate-x-3   transition-all cursor-none' 
                                onMouseEnter={()=> {
                                    setCursor('/src/assets/space/SINFO.png')
                                    setHov('Treasurers')
                                }} 
                                onMouseLeave={()=>setCursor('/src/assets/space/AIM2.png')}
                                onClick={()=> handleClick(7)}>
                                Treasurers
                            </button>
                            <button 
                                className='hover:text-xl hover:border-b hover:px-3 hover:font-bold translate-x-9 max-lg:-translate-x-3   transition-all cursor-none' 
                                onMouseEnter={()=> {
                                    setCursor('/src/assets/space/SINFO.png')
                                    setHov('TechTeam')
                                }} 
                                onMouseLeave={()=>setCursor('/src/assets/space/AIM2.png')}
                                onClick={()=> handleClick(3)}>
                                TechTeam
                            </button>
                            <button 
                                className='hover:text-xl hover:border-b hover:px-3 hover:font-bold translate-x-9 max-lg:-translate-x-3   transition-all cursor-none' 
                                onMouseEnter={()=> {
                                    setCursor('/src/assets/space/SINFO.png')
                                    setHov('CreativeTeam')
                                }} 
                                onMouseLeave={()=>setCursor('/src/assets/space/AIM2.png')}
                                onClick={()=> handleClick(6)}>
                                CreativeTeam
                            </button>
                            <button 
                                className='hover:text-xl hover:border-b hover:px-3 hover:font-bold translate-x-9 max-lg:-translate-x-3   transition-all cursor-none' 
                                onMouseEnter={()=> {
                                    setCursor('/src/assets/space/SINFO.png')
                                    setHov('ManagementTeam')
                                }} 
                                onMouseLeave={()=>setCursor('/src/assets/space/AIM2.png')}
                                onClick={()=> handleClick(5)}>
                                ManagementTeam
                            </button>
                        </div>
                        {isMobile&& <span className='rotate-90 flex-shrink-0 text-[#fff]'>
                            click here
                        </span>}
                    </div>
                    { !isMobile && <div className='h-32 w-full flex opacity-80 justify-start relative transition-all'>
                        <h1 className='z-10 px-8 py-10 text-[#FFD338] font-pixelSans text-4xl'>
                            <FPSCounter/>
                        </h1>
                        <img src="/src/assets/space/DECOR1.png" className='h-32 absolute' alt="" />
                        {/* <img src="../src/assets/space/CORNER.png" className='rotate-180 h-28 w-28' alt="" /> */}
                    </div>}
                </div>
                <AnimatePresence>
                {title && data[title] && Object.keys(data[title]).some(key => !isNaN(key)) && (
                    <motion.div 
                    className={`h-full max-sm:h-1/2 flex max-sm:mb-12 flex-col opacity-80 justify-start items-center max-sm:justify-start `}
                    initial={{ x: "100%",y:isMobile ?"-10%" :"0%"}}
                    animate={{ x: "0%",y:isMobile ?"-10%" :"0%"}}
                    exit={{x:"100%",y:isMobile ?"-10%" :"0%"}}
                    transition={{ ease:"easeInOut", duration:0.4 }}
                    style={{
                        backgroundImage:isMobile ?"url('/src/assets/space/MINFO.png')": "url('/src/assets/space/INFO.png')",
                        backgroundSize: "contain", // Ensures full image display
                        backgroundPosition: "bottom",
                        backgroundRepeat: "no-repeat",
                        minHeight: "300px", // Ensures the background is visible
                        width: "100%", // Responsive width
                        maxWidth: "600px", // Prevents overflow
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                        <h2 className="text-4xl max-sm:text-xl max-sm:p-3 p-10 font-pixelSans text-[#fff] font-bold" >Team Members </h2>
                        {/* <img className='inset-0' src="../src/assets/space/INFO.png" alt="" /> */}
                        <ul className='text-[#ffff] items-center w-1/3 max-sm:w-fit max-sm:text-lg max-sm:overflow-x-scroll max-sm:h-fit  text-2xl flex flex-col text-nowrap gap-5'>
                            {Object.keys(data[title])
                                .filter(key => !isNaN(key)) 
                                .map((key) => (
                                    <li key={key} className="text-white">
                                        {data[title][key]}
                                    </li>
                                ))}
                        </ul>
                    </motion.div>
                )}
                </AnimatePresence>
            </section>
        </>
    );
};

const FPSCounter = () => {
  const [fps, setFPS] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrameId = useRef(null);

  useEffect(() => {
    const updateFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime >= 2500) {
        setFPS(Math.round((frameCount.current * 1000) / deltaTime));
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationFrameId.current = requestAnimationFrame(updateFPS);
    };

    animationFrameId.current = requestAnimationFrame(updateFPS);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (fps);
};


const Overlay = ({setScrollDiv, scrollDiv,textContent, setTextContent}) => {
    return (
        <Scroll html>
            <Section setScrollDiv={setScrollDiv} scrollDiv={scrollDiv} textContent={textContent} setTextContent={setTextContent} />
            <a to={"/register"} className='text-2xl w-fit p-5 group hover:cursor-pointer  text-[#1B9E64]'>
                  <span className='group-hover:hover:border-[#1B9E64] p-1 transition-all rounded-xl group-hover:hover:border-2'>
                  Register Now
                  </span>
            </a> 
        </Scroll>
    )
}

export default Overlay;
