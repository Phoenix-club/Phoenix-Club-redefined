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

  const [textContent, setTextContent] = useState('')
  const { camera } = useThree();
  const [ scrollDiv, setScrollDiv ] = useState(0)
  const { gl } = useThree()
  useEffect(() => {
    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.VSMShadowMap
  }, [gl])

  return (<>
    {/* Lightings */}
    <ambientLight color={"#F5F5FF"} intensity={0.2}/>
    <pointLight
      position={[0, 2, 5]}
      power={10}
      intensity={100}
    />
        {/* Model */}
      <Model textContent={textContent} />
      <ImagePlane textContent={textContent} />
    <Overlay scrollDiv={scrollDiv} setScrollDiv={setScrollDiv} textContent={textContent} setTextContent={setTextContent} />
  </>
  )
}   

export default Experience