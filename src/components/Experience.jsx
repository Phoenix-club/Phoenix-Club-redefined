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

  const lightRef = useRef();
  const textRef = useRef();
  const [textContent, setTextContent] = useState('')
  const { camera } = useThree();
  const [ scrollDiv, setScrollDiv ] = useState(0)

  const textPosition = useRef({ x: 0, y: 0, z: -1 })
  const textRotation = useRef({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    if (!textRef.current) return

    let newPosition = { x: 0, y: 0, z: -1 }
    let newRotation = { x: 0, y: 0, z: 0 }

    switch (textContent) {
      case 'Presidents':
        newPosition.y = 0.2
        newPosition.x = -0.5
        break
      case 'Secretaries':
        newPosition = {x: -0.3, y: 0.2, z: -0.5}
        break
      case 'Treasurers':
        newPosition = { x: -0.56, y: -0.2, z: -0.6}
        break
      case 'CreativeTeam':
        newPosition = { x: -0.7, y: 0.2, z: -0.24 }
        newRotation.y = 0.3
        break
      case 'ManagementTeam':
        newPosition = { x: -1, y: .2, z: 0 }
        break
      case 'TechTeam':
        newPosition = { x: -1, y: -0.2, z: 0.1 }
        newRotation.y = 1.5
        break
    }

    // Animate position smoothly
    gsap.to(textPosition.current, {
      ...newPosition,
      duration: 3,
      ease: 'power2.out',
    })

    // Animate rotation smoothly
    gsap.to(textRotation.current, {
      ...newRotation,
      duration: 3,
      ease: 'power2.out',
    })
  }, [textContent])

  // Apply animation on each frame
  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.set(
        textPosition.current.x,
        textPosition.current.y,
        textPosition.current.z
      )
      textRef.current.rotation.set(
        textRotation.current.x,
        textRotation.current.y,
        textRotation.current.z
      )
    }
  })

  return (<>
    {/* Lightings */}
    {/* <ambientLight intensity={0.2}/> */}
    <spotLight
        ref={lightRef}
        position={[0, 3, 2]}  // Light coming from one side
        intensity={80}          // Adjust brightness
        castShadow
        distance={80}
        angle={Math.PI/9}
        power={50}    
        penumbra={1}
      />
    <OrbitControls enableRotate={false} enableZoom={false} />
    {/* text behind the model */}
    <Text
        ref={textRef}
        key={textContent}
        position={[0, 0, -1]}
        fontSize={0.15}
        color="white"
        anchorX="left"
        anchorY="middle"
        className='h-screen flex flex-col justify-center'
        >
          {textContent}
        </Text>
        {/* Model */}
      <Model textContent={textContent} setTextContent={setTextContent} scrollDiv={scrollDiv} setScrollDiv={setScrollDiv} />
    <Overlay scrollDiv={scrollDiv} setScrollDiv={setScrollDiv} textContent={textContent} setTextContent={setTextContent} />
  </>
  )
}   

export default Experience