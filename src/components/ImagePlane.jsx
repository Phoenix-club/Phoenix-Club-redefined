import { Plane } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { isMobile } from 'react-device-detect'




const ImagePlane = ({ textContent }) => {
  const [textureUrl1, setTextureUrl1] = useState("/members/NULL.png");
  const [textureUrl2, setTextureUrl2] = useState("/members/NULL.png");

    const planeRef1 = useRef()
    const planeRef2 = useRef()
    const planePosition1 = useRef({ x: 0, y: 0, z: -1 })
    const planeRotation1 = useRef({ x: 0, y: 0, z: 0 })

    const planePosition2 = useRef({ x: 0, y: 0, z: -1 })
    const planeRotation2 = useRef({ x: 0, y: 0, z: 0 })

    const texture1 = useLoader(THREE.TextureLoader, textureUrl1);
    const texture2 = useLoader(THREE.TextureLoader, textureUrl2);  
  
    useEffect(() => {
      // Position Adjustment
      if (!planeRef1.current && !planeRef2) return
  
      let newPosition1 = { x: 0, y: 0, z: -1 }
      let newRotation1 = { x: 0, y: 0, z: 0 }

      let newPosition2 = { x: 0, y: 0, z: -1 }
      let newRotation2 = { x: 0, y: 0, z: 0 }
  
      switch (textContent) {
        case 'Presidents':
          newPosition1.y = 0.5
          newPosition1.x = 0.1
          newPosition1.z = 0.5
          newRotation1.x = -Math.PI /4
          
          newPosition2.y = 0.4
          newPosition2.x = (isMobile ? 0.1 : 0.3)
          newPosition2.z = (isMobile ? 0.15 : 0.1)
          newRotation2.x = -Math.PI /4

          setTextureUrl1('/members/RIDDHI.png')
          setTextureUrl2('/members/ASUS.png')
          break
        case 'Secretaries':
          newPosition1.y = 0.5
          newPosition1.x = (isMobile ? 0.1 : -0.1)
          newPosition1.z = 0.5
          newRotation1.x = -Math.PI /3
          newRotation1.y = (isMobile ? -Math.PI /8 : 0)
          
          newPosition2.y = 0.25
          newPosition2.x = (isMobile ? 0 : 0.35)
          newPosition2.z = (isMobile ? 0 : 0.07)
          newRotation2.x = -Math.PI /4

          setTextureUrl1('/members/VIDHEE.png')
          setTextureUrl2('/members/ARYAN.png')
          break
        case 'Treasurers':
          newPosition1.y = 0.3
          newPosition1.x = (isMobile ? 0.1 : -0.1)
          newPosition1.z = 0.5
          newRotation1.x = (isMobile ? -Math.PI /4 : -Math.PI /6)
          newRotation1.y = Math.PI /6
          
          newPosition2.y = (isMobile ? 0.5 : 0.3)
          newPosition2.x = (isMobile ? 0.1 : 0.6)
          newPosition2.z = (isMobile ? 0.3 : -0.1)
          newRotation2.x = -Math.PI /6
          newRotation2.y = -Math.PI /6

          setTextureUrl1('/members/UDAY.png')
          setTextureUrl2('/members/ATHARVA.png')
          break
        case 'CreativeTeam':
          newPosition1.y = 0.3
          newPosition1.x = (isMobile ? 0 : -0.2)
          newPosition1.z = (isMobile ? 0.1 : 0.2)
          newRotation1.x = -Math.PI /8
          newRotation1.y = Math.PI /6
          
          newPosition2.y = 0.25
          newPosition2.x = (isMobile ? 0.15 : 0.3)
          newPosition2.z = (isMobile ? -0.2 : 0)
          newRotation2.x = -Math.PI /8
          newRotation2.y = (isMobile ? Math.PI /8 : -Math.PI /8)

          setTextureUrl1('/members/PRATIK.png')
          setTextureUrl2('/members/SIDDHI.png')
          break
        case 'ManagementTeam':
          setTextureUrl1('/members/NULL.png')
          setTextureUrl2('/members/NULL.png')
          break
        case 'TechTeam':
          newPosition1.y = 0.3
          newPosition1.x = (isMobile ? 0 : -0.2)
          newPosition1.z = (isMobile ? 0.15 : 0.3)
          newRotation1.x = -Math.PI /8
          newRotation1.y = Math.PI /6
          
          newPosition2.y = 0.25
          newPosition2.x = (isMobile ? 0.25 : 0.5)
          newPosition2.z = (isMobile ? -0.1 : 0.1)
          newRotation2.x = -Math.PI /8
          newRotation2.y = -Math.PI /6

          setTextureUrl1('/members/LULWA.png')
          setTextureUrl2('/members/OREWA.png')
          break
      }
  // First Image
      // Animate position smoothly
      gsap.to(planePosition1.current, {
        ...newPosition1,
        duration: 2.5,
        ease: 'power2.out',
      })
  
      // Animate rotation smoothly
      gsap.to( planeRotation1.current, {
        ...newRotation1,
        duration: 3,
        ease: 'power2.out',
      })
// Second Image
      gsap.to(planePosition2.current, {
        ...newPosition2,
        duration: 2.5,
        ease: 'power2.out',
      })
  
      // Animate rotation smoothly
      gsap.to( planeRotation2.current, {
        ...newRotation2,
        duration: 3,
        ease: 'power2.out',
      })
    }, [textContent])

    useFrame(()=>{
        if (planeRef1.current) {
            planeRef1.current.position.set(
              planePosition1.current.x,
              planePosition1.current.y,
              planePosition1.current.z
            )
            planeRef1.current.rotation.set(
              planeRotation1.current.x,
              planeRotation1.current.y,
              planeRotation1.current.z
            )
          }
        if (planeRef2.current) {
            planeRef2.current.position.set(
              planePosition2.current.x,
              planePosition2.current.y,
              planePosition2.current.z
            )
            planeRef2.current.rotation.set(
              planeRotation2.current.x,
              planeRotation2.current.y,
              planeRotation2.current.z
            )
          }
    })

  return (
    <>
    <Plane ref={planeRef1} args={isMobile ? [0.7, 0.4] :[0.9, 0.5]} position={[0, 0, -1]} rotation={[-Math.PI / 2, 0, 0]} castShadow >
      <meshStandardMaterial attach="material" map={texture1} transparent alphaTest={0.5} depthWrite={false}  />
    </Plane>
    <Plane ref={planeRef2} args={isMobile ? [0.7, 0.4] :[0.9, 0.5]} position={[0, 0, -1]} rotation={[-Math.PI / 2, 0, 0]} castShadow >
      <meshStandardMaterial attach="material" map={texture2} transparent alphaTest={0.5} />
    </Plane>
    </>
  )
}

export default React.memo(ImagePlane)