import { Html, OrbitControls, Reflector, ScrollControls, Text, useScroll } from '@react-three/drei'
import React, { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MathUtils, MeshNormalMaterial } from 'three'
import Model  from './Map'
import Overlay from './Overlay'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/all'
import { isMobile } from 'react-device-detect'

gsap.registerPlugin(ScrollToPlugin);

const Experience = () => {

  const textRef = useRef();
  const lightRef = useRef();
  const [textContent, setTextContent] = useState(" ")
  const tl = useRef();
  const scroll = useScroll();
  const { camera } = useThree();
  const [ scrollDiv, setScrollDiv ] = useState(0)

  useFrame(() => {
    if(tl.current){
      const targetY = scrollDiv * 20;
      const currentY = tl.current.time();
      const smoothY = MathUtils.lerp(currentY,targetY,0.1)
      tl.current.seek(smoothY)
    }
});


  !isMobile && useEffect(()=>{
    //position manipuulation
    tl.current = gsap.timeline({
      onUpdate: () =>{
        if (scrollDiv === 1){
            setTextContent("Presidents")
        }
        else if (scrollDiv === 3){
            setTextContent("Tech Team")
 
        }
        else if (scrollDiv === 4){
            setTextContent("Secretaries")
        }
        else if (scrollDiv === 7){
            setTextContent("Treasurers")
        }
        else if (scrollDiv === 5){
            setTextContent("ManagementTeam")
        }
        else if (scrollDiv === 6){
            setTextContent("CreativeTeam")
        }
        else{
            setTextContent("")
        }
      }
    });
    
    tl.current.to(
      textRef.current.rotation ,
      {
        duration :20,
        x:-Math.PI / 2,
        ease:"power1.inOut",
      },
      "fov"
    ).to(
      textRef.current.position ,
      {
        duration :20,
        x:0.5,
        z: 0,
        ease:"power1.inOut",
      },
      "fov"
    ).to(
      textRef.current.rotation ,
      {
        duration:20,
        z: 0,
      },
      "cafeteria"

    ).to(
      textRef.current.rotation ,
      {
        duration:20,
        z: -Math.PI * 0.5,
      },
      "engine"

    ).to(
      textRef.current.rotation ,
      {
        duration:20,
        z: Math.PI / 62,
      },
      "storage"

    ).to(
      textRef.current.rotation ,
      {
        duration:20,
        z: -Math.PI / 2,
      },
      "comms"

    ).to(
      textRef.current.position ,
      {
        duration:20,
        z: -0.5,
      },
      "comms"

    ).to(
      textRef.current.rotation ,
      {
        duration:20,

      },
      "navigation"

    ).to(
      textRef.current.rotation ,
      {
        duration:20,
        z: Math.PI / 3,
      },
      "Weap"
    )
    .to(
      textRef.current.position ,
      {
        duration:20,
        z: 0.5,
      },
      "Weap"
    )
    return () =>{ tl.current.kill(); }

  },[])



  return (<>
    {/* Lightings */}
    {/* <ambientLight intensity={0.2}/> */}
    <spotLight
        ref={lightRef}
        position={[0, 2, -1]}  // Light coming from one side
        intensity={1}          // Adjust brightness
        castShadow
        distance={100}
        angle={Math.PI/5}
        power={50}    
        penumbra={1}
      />
    {/* <OrbitControls enableRotate={false} enableZoom={false} /> */}
    {/* text behind the model */}
    {!isMobile && <Text
        ref={textRef}
        position={[-1, 0.5, 0]}
        fontSize={0.1}
        color="white"
        anchorX="left"
        anchorY="middle"

        // material={{ transparent:0, opacity:0 }}
        className='h-screen flex flex-col justify-center'
        >
          {textContent}
        </Text>}
        {/* Model */}
      <Model textContent={textContent} setTextContent={setTextContent} scrollDiv={scrollDiv} setScrollDiv={setScrollDiv} />
    <Overlay scrollDiv={scrollDiv} setScrollDiv={setScrollDiv}  />
  </>
  )
}   

export default Experience