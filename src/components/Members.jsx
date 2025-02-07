import React from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx'
import { ScrollControls } from '@react-three/drei';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const Members = () => {

  return (
    <motion.div className='w-screen h-screen'>
      <Canvas
      camera={{
        fov:90,
        position: [0, 2, 1]
      }}
      shadows
      >
        <ScrollControls>
          <Experience />  
        </ScrollControls>
      </Canvas>
    </motion.div>
  )
}

export default Members