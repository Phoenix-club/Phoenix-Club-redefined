import { Plane } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { isMobile } from 'react-device-detect'

// Performance detection utility
const usePerformanceCheck = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  useEffect(() => {
    // Check device performance
    const checkPerformance = () => {
      // Simple heuristics: mobile + older device or low memory
      const isLow = isMobile && 
        (navigator.deviceMemory < 4 || 
         navigator.hardwareConcurrency < 4);
      setIsLowEnd(isLow);
    };
    
    checkPerformance();
  }, []);
  
  return isLowEnd;
};

// Texture preloading and management
const textureCache = {};
const loadTexture = (url) => {
  if (!textureCache[url]) {
    textureCache[url] = new THREE.TextureLoader().load(url);
  }
  return textureCache[url];
};

const ImagePlane = ({ textContent }) => {
  const isLowEnd = usePerformanceCheck();
  const [textureUrl1, setTextureUrl1] = useState("/members/NULL.png");
  const [textureUrl2, setTextureUrl2] = useState("/members/NULL.png");

  const planeRef1 = useRef();
  const planeRef2 = useRef();
  const planePosition1 = useRef({ x: 0, y: 0, z: -1 });
  const planeRotation1 = useRef({ x: 0, y: 0, z: 0 });
  const planePosition2 = useRef({ x: 0, y: 0, z: -1 });
  const planeRotation2 = useRef({ x: 0, y: 0, z: 0 });

  // Only load textures when URLs change
  const texture1 = useLoader(THREE.TextureLoader, textureUrl1);
  const texture2 = useLoader(THREE.TextureLoader, textureUrl2);
  
  // Optimize texture size based on device capability
  useEffect(() => {
    if (texture1) {
      texture1.minFilter = isLowEnd ? THREE.NearestFilter : THREE.LinearMipmapLinearFilter;
      texture1.generateMipmaps = !isLowEnd;
    }
    if (texture2) {
      texture2.minFilter = isLowEnd ? THREE.NearestFilter : THREE.LinearMipmapLinearFilter;
      texture2.generateMipmaps = !isLowEnd;
    }
  }, [texture1, texture2, isLowEnd]);

  // Memoized animation configurations
  const animationConfig = useMemo(() => {
    // Simplified animation settings for low-end devices
    const duration = isLowEnd ? 1.5 : 2.5;
    const animEase = isLowEnd ? 'power1.out' : 'power2.out';
    
    // Simplified positions for low-end devices
    const getPositions = () => {
      let pos1 = { x: 0.1, y: 0.5, z: 0.5 };
      let rot1 = { x: Math.PI/4, y: 0, z: 0 };
      let pos2 = { x: isMobile ? 0.1 : 0.3, y: 0.4, z: isMobile ? 0.15 : 0.1 };
      let rot2 = { x: -Math.PI/4, y: 0, z: 0 };
      
      switch (textContent) {
        case 'Presidents':
          setTextureUrl1('/members/RIDDHI.png');
          setTextureUrl2('/members/ASUS.png');
          pos1 = { x: 0.1, y: 0.5, z: 0.5 };
          rot1 = { x: -Math.PI/4, y: 0, z: 0 };
          pos2 = { 
            x: isMobile ? 0.1 : 0.3, 
            y: 0.4, 
            z: isMobile ? 0.15 : 0.1 
          };
          rot2 = { x: -Math.PI/4, y: 0, z: 0 };
          break;
        case 'Secretaries':
          setTextureUrl1('/members/VIDHEE.png');
          setTextureUrl2('/members/ARYAN.png');
          pos1 = { 
            x: isMobile ? 0.1 : -0.1, 
            y: 0.5, 
            z: 0.5 
          };
          rot1 = { 
            x: -Math.PI/3, 
            y: isMobile ? -Math.PI/8 : 0, 
            z: 0 
          };
          pos2 = { 
            x: isMobile ? 0 : 0.35, 
            y: 0.25, 
            z: isMobile ? 0 : 0.07 
          };
          rot2 = { x: -Math.PI/4, y: 0, z: 0 };
          break;
        case 'Treasurers':
          setTextureUrl1('/members/UDAY.png');
          setTextureUrl2('/members/ATHARVA.png');
          pos1 = { 
            x: isMobile ? 0.1 : -0.1, 
            y: 0.3, 
            z: 0.5 
          };
          rot1 = { 
            x: isMobile ? -Math.PI/4 : -Math.PI/6, 
            y: Math.PI/6, 
            z: 0 
          };
          pos2 = { 
            x: isMobile ? 0.1 : 0.6, 
            y: isMobile ? 0.5 : 0.3, 
            z: isMobile ? 0.3 : -0.1 
          };
          rot2 = { x: -Math.PI/6, y: -Math.PI/6, z: 0 };
          break;
        case 'CreativeTeam':
          setTextureUrl1('/members/PRATIK.png');
          setTextureUrl2('/members/SIDDHI.png');
          pos1 = { 
            x: isMobile ? 0 : -0.2, 
            y: 0.3, 
            z: isMobile ? 0.1 : 0.2 
          };
          rot1 = { x: -Math.PI/8, y: Math.PI/6, z: 0 };
          pos2 = { 
            x: isMobile ? 0.15 : 0.3, 
            y: 0.25, 
            z: isMobile ? -0.2 : 0 
          };
          rot2 = { 
            x: -Math.PI/8, 
            y: isMobile ? Math.PI/8 : -Math.PI/8, 
            z: 0 
          };
          break;
        case 'TechTeam':
          setTextureUrl1('/members/LULWA.png');
          setTextureUrl2('/members/OREWA.png');
          pos1 = { 
            x: isMobile ? 0 : -0.2, 
            y: 0.3, 
            z: isMobile ? 0.15 : 0.3 
          };
          rot1 = { x: -Math.PI/8, y: Math.PI/6, z: 0 };
          pos2 = { 
            x: isMobile ? 0.25 : 0.5, 
            y: 0.25, 
            z: isMobile ? -0.1 : 0.1 
          };
          rot2 = { x: -Math.PI/8, y: -Math.PI/6, z: 0 };
          break;
        default:
          setTextureUrl1('/members/NULL.png');
          setTextureUrl2('/members/NULL.png');
      }
      
      // Simplify positions for low-end devices
      if (isLowEnd) {
        // Round values to reduce complexity
        const round = (val) => Math.round(val * 10) / 10;
        pos1 = Object.fromEntries(Object.entries(pos1).map(([k, v]) => [k, round(v)]));
        rot1 = Object.fromEntries(Object.entries(rot1).map(([k, v]) => [k, round(v)]));
        pos2 = Object.fromEntries(Object.entries(pos2).map(([k, v]) => [k, round(v)]));
        rot2 = Object.fromEntries(Object.entries(rot2).map(([k, v]) => [k, round(v)]));
      }
      
      return { pos1, rot1, pos2, rot2 };
    };
    
    return {
      positions: getPositions(),
      duration,
      ease: animEase
    };
  }, [textContent, isLowEnd]);
  
  // Apply animations with optimized settings
  useEffect(() => {
    if (!planeRef1.current && !planeRef2.current) return;
    
    const { positions, duration, ease } = animationConfig;
    const { pos1, rot1, pos2, rot2 } = positions;
    
    // Stagger animations on low-end devices to reduce CPU load
    gsap.to(planePosition1.current, {
      ...pos1,
      duration,
      ease,
      overwrite: true
    });
    
    gsap.to(planeRotation1.current, {
      ...rot1,
      duration,
      ease,
      overwrite: true
    });
    
    // On low-end devices, stagger the second animation slightly
    const delay = isLowEnd ? 0.1 : 0;
    
    gsap.to(planePosition2.current, {
      ...pos2,
      duration,
      delay,
      ease,
      overwrite: true
    });
    
    gsap.to(planeRotation2.current, {
      ...rot2,
      duration,
      delay,
      ease,
      overwrite: true
    });
    
  }, [animationConfig, isLowEnd]);

  // Optimize useFrame execution - reduce update frequency on low-end devices
  const frameCount = useRef(0);
  useFrame(() => {
    // For low-end devices, update less frequently
    if (isLowEnd) {
      frameCount.current += 1;
      if (frameCount.current % 2 !== 0) return; // Update every other frame
    }
    
    if (planeRef1.current) {
      planeRef1.current.position.set(
        planePosition1.current.x,
        planePosition1.current.y,
        planePosition1.current.z
      );
      planeRef1.current.rotation.set(
        planeRotation1.current.x,
        planeRotation1.current.y,
        planeRotation1.current.z
      );
    }
    
    if (planeRef2.current) {
      planeRef2.current.position.set(
        planePosition2.current.x,
        planePosition2.current.y,
        planePosition2.current.z
      );
      planeRef2.current.rotation.set(
        planeRotation2.current.x,
        planeRotation2.current.y,
        planeRotation2.current.z
      );
    }
  });

  // Simplify plane dimensions for low-end devices
  const planeSize = useMemo(() => {
    return isLowEnd
      ? [isMobile ? 0.6 : 0.8, isMobile ? 0.35 : 0.45]  // Even smaller for low-end
      : [isMobile ? 0.7 : 0.9, isMobile ? 0.4 : 0.5];   // Original sizes
  }, [isLowEnd]);

  return (
    <>
      <Plane 
        ref={planeRef1} 
        args={planeSize}
        position={[0, 0, -1]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        castShadow={!isLowEnd} // Disable shadows on low-end devices
      >
        <meshStandardMaterial 
          attach="material" 
          map={texture1} 
          transparent 
          alphaTest={0.5} 
          depthWrite={false}
          // Simplify material for low-end devices
          roughness={isLowEnd ? 1 : 0.8}
          metalness={isLowEnd ? 0 : 0.2}
        />
      </Plane>
      <Plane 
        ref={planeRef2} 
        args={planeSize}
        position={[0, 0, -1]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        castShadow={!isLowEnd} // Disable shadows on low-end devices
      >
        <meshStandardMaterial 
          attach="material" 
          map={texture2} 
          transparent 
          alphaTest={0.5}
          depthWrite={!isLowEnd}
          // Simplify material for low-end devices
          roughness={isLowEnd ? 1 : 0.8}
          metalness={isLowEnd ? 0 : 0.2}
        />
      </Plane>
    </>
  );
};

export default React.memo(ImagePlane);
