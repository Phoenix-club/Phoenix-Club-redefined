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

export default Overlay;
