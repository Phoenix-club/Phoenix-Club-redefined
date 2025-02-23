import { Html, OrbitControls, Plane, Reflector, ScrollControls, SpotLight, Text, useScroll } from '@react-three/drei'
import React, { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MathUtils, MeshNormalMaterial } from 'three'
import Model  from './Untitled'
import Overlay from './Overlay'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/all'
import { isMobile } from 'react-device-detect'
import ImagePlane from './ImagePlane'
import * as THREE from 'three'


gsap.registerPlugin(ScrollToPlugin);

const Experience = () => {

  const textRef = useRef();
  const [textContent, setTextContent] = useState('')
  const { camera } = useThree();
  const [ scrollDiv, setScrollDiv ] = useState(0)
  const { gl } = useThree()
  useEffect(() => {
    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.VSMShadowMap
  }, [gl])

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
        newPosition = {x: -0.3, y: 0.4, z: -0.5}
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
      duration: 2.5,
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
  useEffect(() => {
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
  },[textRef])

  return (<>
    {/* Lightings */}
    <ambientLight color={"#F5F591"} intensity={0.2}/>
    <pointLight
      position={[0, 5, 5]}
      power={1}
      intensity={50}
    />
        {/* Model */}
      <Model textContent={textContent} />
      <ImagePlane textContent={textContent} />
    <Overlay scrollDiv={scrollDiv} setScrollDiv={setScrollDiv} textContent={textContent} setTextContent={setTextContent} />
  </>
  )
}   

export default Experience