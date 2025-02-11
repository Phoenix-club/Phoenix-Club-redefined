import { Scroll, Text } from '@react-three/drei';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollToPlugin)

const Section = ({scrollDiv , setScrollDiv,textContent, setTextContent }) => {
    const [title, setTitle] = useState('');
    const data = {
        Presidents: {
            Leader: "Riddhi Singvi",
            post1:"President",
            Voice: "Ashish Nagmoti",
            post2:"Voice-President",
            img1: "../src/assets/members/riddhi.jpeg",
            img2: "../src/assets/members/Ashish.png"
        },
        Secretaries: {
            Leader: "Vidhee Patwa",
            post1:"Secretary",
            Voice: "Aryan Suryawanshi",
            post2:"Joint-Secretary",
            img1: "../src/assets/members/Vidhee patwa.jpg",
            img2: "../src/assets/members/Aryan Suryavanshi.jpg"
        },
        Treasurers: {
            Leader: "Uday Shah",
            post1:"Treasurer",
            Voice: "Atharva Jadhav",
            post2:"Co-Treasurer",
            img1: "../src/assets/members/Uday.png",
            img2: "../src/assets/members/Atharva Jadhav.jpg"
        },
        TechTeam: {
            Leader: "Lulwa Anif",
            post1:"Tech Lead",
            Voice: "Om Patil",
            post2:"Tech Co-Lead",
            img1: "../src/assets/members/Lulwa Anif.jpg",
            img2: "../src/assets/members/Om.jpeg",
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
            img1: "../src/assets/members/Pratiksha Khandbahale.jpg",
            img2: "../src/assets/members/siddhi.png",
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

    const containerRef = useRef();
    useEffect(()=>{
        console.log("From Overlay " + scrollDiv)
    },[scrollDiv])

    

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
        
        gsap.to(containerRef.current,{
            duration:1,
            scrollTo:{
                target:containerRef,
                y:scrollTarget
            },
            ease:"power1.inOut"
        })
    }


    return (
        <>
            <section className='h-screen w-screen flex justify-between items-start p-5 pr-10 '>
                <div className='h-[95vh] w-full gap-6 flex justify-between items-start text-[#fff]'>
                    <div className='flex flex-col w-full h-1/3 items-start justify-between z-10 px-10 '>
                        <button className='hover:text-xl hover:border-b hover:px-3 hover:font-bold transition-all' onClick={()=> handleClick(1)}>Presidents</button>
                        <button className='hover:text-xl hover:border-b hover:px-3 hover:font-bold transition-all' onClick={()=> handleClick(4)}>Secretaries</button>
                        <button className='hover:text-xl hover:border-b hover:px-3 hover:font-bold transition-all' onClick={()=> handleClick(7)}>Treasurers</button>
                        <button className='hover:text-xl hover:border-b hover:px-3 hover:font-bold transition-all' onClick={()=> handleClick(3)}>TechTeam</button>
                        <button className='hover:text-xl hover:border-b hover:px-3 hover:font-bold transition-all' onClick={()=> handleClick(6)}>CreativeTeam</button>
                        <button className='hover:text-xl hover:border-b hover:px-3 hover:font-bold transition-all' onClick={()=> handleClick(5)}>ManagementTeam</button>
                    </div>
                        <div ref={containerRef} className='h-full bg-backG w-[45vw]  flex flex-col overflow-hidden items-center gap-5 '>
                            {Object.entries(data).map(([teamName, teamData], index) => (
                                <section id={teamName} className='w-full h-full transition-all flex flex-col justify-start gap-5  p-5 items-center flex-shrink-0' key={index}>
                                    <section className='w-full flex flex-col gap-10 justify-center items-center'>

                                    {teamName !== "ManagementTeam" && (
                                        <div className='w-full flex items-center justify-center gap-8'>
                                            {teamData.post1 && (
                                                <div className='flex flex-col gap-2 justify-center items-center'>
                                                    <img src={teamData.img1} alt={`${teamData.post1}`} className='w-44 h-44 rounded-full object-cover m-2 object-top border-4' />
                                                    <div className='backdrop-blur-lg  bg-backG/10 px-5 py-2  border-2 border-[#fff] rounded-full '>
                                                        <h2 className='text-lg font-bold'>{teamData.post1}</h2>
                                                        <h2 className='text-sm'>{teamData.Leader}</h2>
                                                    </div>
                                                </div>
                                            )}
                                            {teamData.post2 && (
                                                <div className='flex flex-col gap-2 justify-center items-center'>
                                                    <img src={teamData.img2} alt={`${teamData.post2}`} className='w-44 object-top h-44 rounded-full object-cover m-2 border-4'  />
                                                    <div className='backdrop-blur-lg px-5 py-2  bg-backG/10 border-2 border-[#fff] rounded-full '>
                                                        <h2 className='text-ld font-bold'>{teamData.post2}</h2>
                                                        <h2 className='text-sm'>{teamData.Voice}</h2>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                        {teamData[1] && (
                                            <div className={teamName !== "ManagementTeam" ? '-mt-5':"mt-0 w-fit flex flex-col gap-5" }>
                                                <h3 className='text-md font-semibold text-center'>Members</h3>
                                                <ul className='list-disc list-inside w-full items-center justify-center'>
                                                    {Object.keys(teamData)
                                                        .filter(key => !isNaN(parseInt(key))) // Filter keys that are numbers
                                                        .map(key => (
                                                            <li className={teamName !== "ManagementTeam" ? 'text-[17px] p-[2px]':'text-[25px] p-1' } key={key}>{teamData[key]}</li>
                                                        ))}
                                                </ul>
                                            </div>
                                        )}
                                    </section>
                                </section>
                            ))}
                        </div>
                    </div>
            </section>
        </>
    );
};


const Overlay = ({setScrollDiv, scrollDiv,textContent, setTextContent}) => {
    return (
        <Scroll html>
            <Section setScrollDiv={setScrollDiv} scrollDiv={scrollDiv} textContent={textContent} setTextContent={setTextContent} />
        </Scroll>
    )
}

export default Overlay
