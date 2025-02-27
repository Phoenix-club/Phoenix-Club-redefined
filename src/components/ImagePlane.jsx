import { Plane } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { isMobile } from 'react-device-detect'

const ImagePlane = ({ textContent }) => {
  // Performance detection - determine if device is low-end
  const { gl } = useThree();
  const isLowEndDevice = useMemo(() => {
    // Check if WebGL renderer info suggests low performance
    const renderer = gl.getContext();
    const debugInfo = renderer.getExtension('WEBGL_debug_renderer_info');
    const gpu = debugInfo ? renderer.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    // Assume mobile is low-end by default
    return isMobile || gpu.toLowerCase().includes('intel') || !gpu;
  }, [gl]);

  // Optimize based on device capability
  const animationDuration = isLowEndDevice ? 1.5 : 2.5;
  const animationEase = isLowEndDevice ? 'power1.out' : 'power2.out';
  const frameSkipCount = isLowEndDevice ? 2 : 0;
  
  // States for texture URLs
  const [textureUrl1, setTextureUrl1] = useState("/members/NULL.png");
  const [textureUrl2, setTextureUrl2] = useState("/members/NULL.png");
  
  // States for loaded textures
  const [textureLoaded1, setTextureLoaded1] = useState(false);
  const [textureLoaded2, setTextureLoaded2] = useState(false);

  // Refs
  const planeRef1 = useRef();
  const planeRef2 = useRef();
  const planePosition1 = useRef({ x: 0, y: 0, z: -1 });
  const planeRotation1 = useRef({ x: 0, y: 0, z: 0 });
  const planePosition2 = useRef({ x: 0, y: 0, z: -1 });
  const planeRotation2 = useRef({ x: 0, y: 0, z: 0 });
  
  // For optimization
  const frameSkip = useRef(0);
  const animationsActive = useRef(false);
  
  // Create texture loader once
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  
  // Custom texture loading
  const loadTexture = (url, callback) => {
    if (url === "/members/NULL.png") {
      callback(null);
      return;
    }
    
    textureLoader.load(
      url,
      (texture) => {
        // Optimize texture
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = !isLowEndDevice;
        texture.anisotropy = isLowEndDevice ? 1 : 4;
        callback(texture);
      }
    );
  };
  
  // Load textures
  const [texture1, setTexture1] = useState(null);
  const [texture2, setTexture2] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    // Load texture 1
    loadTexture(textureUrl1, (texture) => {
      if (isMounted) {
        setTexture1(texture);
        setTextureLoaded1(texture !== null);
      }
    });
    
    // Load texture 2
    loadTexture(textureUrl2, (texture) => {
      if (isMounted) {
        setTexture2(texture);
        setTextureLoaded2(texture !== null);
      }
    });
    
    return () => {
      isMounted = false;
    };
  }, [textureUrl1, textureUrl2]);

  useEffect(() => {
    // Position Adjustment
    if (!planeRef1.current && !planeRef2.current) return;
    
    let newPosition1 = { x: 0.1, y: 0.5, z: 0.5 };
    let newRotation1 = { x: Math.PI / 4, y: 0, z: 0 };
    let newPosition2 = { x: (isMobile ? 0.1 : 0.3), y: 0.4, z: (isMobile ? 0.15 : 0.1) };
    let newRotation2 = { x: -Math.PI / 4, y: 0, z: 0 };
    
    // Create position/rotation configuration map for cleaner code
    const configs = {
      'Presidents': {
        position1: { y: 0.5, x: 0.1, z: 0.5 },
        rotation1: { x: -Math.PI / 4, y: 0, z: 0 },
        position2: { y: 0.4, x: (isMobile ? 0.1 : 0.3), z: (isMobile ? 0.15 : 0.1) },
        rotation2: { x: -Math.PI / 4, y: 0, z: 0 },
        texture1: '/members/RIDDHI.png',
        texture2: '/members/ASUS.png'
      },
      'Secretaries': {
        position1: { y: 0.5, x: (isMobile ? 0.1 : -0.1), z: 0.5 },
        rotation1: { x: -Math.PI / 3, y: (isMobile ? -Math.PI / 8 : 0), z: 0 },
        position2: { y: 0.25, x: (isMobile ? 0 : 0.35), z: (isMobile ? 0 : 0.07) },
        rotation2: { x: -Math.PI / 4, y: 0, z: 0 },
        texture1: '/members/VIDHEE.png',
        texture2: '/members/ARYAN.png'
      },
      'Treasurers': {
        position1: { y: 0.3, x: (isMobile ? 0.1 : -0.1), z: 0.5 },
        rotation1: { x: (isMobile ? -Math.PI / 4 : -Math.PI / 6), y: Math.PI / 6, z: 0 },
        position2: { y: (isMobile ? 0.5 : 0.3), x: (isMobile ? 0.1 : 0.6), z: (isMobile ? 0.3 : -0.1) },
        rotation2: { x: -Math.PI / 6, y: -Math.PI / 6, z: 0 },
        texture1: '/members/UDAY.png',
        texture2: '/members/ATHARVA.png'
      },
      'CreativeTeam': {
        position1: { y: 0.3, x: (isMobile ? 0 : -0.2), z: (isMobile ? 0.1 : 0.2) },
        rotation1: { x: -Math.PI / 8, y: Math.PI / 6, z: 0 },
        position2: { y: 0.25, x: (isMobile ? 0.15 : 0.3), z: (isMobile ? -0.2 : 0) },
        rotation2: { x: -Math.PI / 8, y: (isMobile ? Math.PI / 8 : -Math.PI / 8), z: 0 },
        texture1: '/members/PRATIK.png',
        texture2: '/members/SIDDHI.png'
      },
      'ManagementTeam': {
        texture1: '/members/NULL.png',
        texture2: '/members/NULL.png'
      },
      'TechTeam': {
        position1: { y: 0.3, x: (isMobile ? 0 : -0.2), z: (isMobile ? 0.15 : 0.3) },
        rotation1: { x: -Math.PI / 8, y: Math.PI / 6, z: 0 },
        position2: { y: 0.25, x: (isMobile ? 0.25 : 0.5), z: (isMobile ? -0.1 : 0.1) },
        rotation2: { x: -Math.PI / 8, y: -Math.PI / 6, z: 0 },
        texture1: '/members/LULWA.png',
        texture2: '/members/OREWA.png'
      }
    };
    
    // Get configuration for current textContent
    const config = configs[textContent];
    if (config) {
      // Apply configuration
      if (config.position1) newPosition1 = { ...newPosition1, ...config.position1 };
      if (config.rotation1) newRotation1 = { ...newRotation1, ...config.rotation1 };
      if (config.position2) newPosition2 = { ...newPosition2, ...config.position2 };
      if (config.rotation2) newRotation2 = { ...newRotation2, ...config.rotation2 };
      setTextureUrl1(config.texture1);
      setTextureUrl2(config.texture2);
    }
    
    // Signal that animations are active
    animationsActive.current = true;
    
    // First Image - Animate position smoothly
    gsap.to(planePosition1.current, {
      ...newPosition1,
      duration: animationDuration,
      ease: animationEase,
      onComplete: () => {
        // Ensure final position is set exactly
        if (planeRef1.current) {
          planeRef1.current.position.set(
            newPosition1.x,
            newPosition1.y,
            newPosition1.z
          );
        }
      }
    });
    
    // Animate rotation smoothly
    gsap.to(planeRotation1.current, {
      ...newRotation1,
      duration: animationDuration,
      ease: animationEase,
      onComplete: () => {
        // Ensure final rotation is set exactly
        if (planeRef1.current) {
          planeRef1.current.rotation.set(
            newRotation1.x,
            newRotation1.y,
            newRotation1.z
          );
        }
      }
    });
    
    // Second Image - Animate position smoothly
    gsap.to(planePosition2.current, {
      ...newPosition2,
      duration: animationDuration,
      ease: animationEase,
      onComplete: () => {
        // Ensure final position is set exactly
        if (planeRef2.current) {
          planeRef2.current.position.set(
            newPosition2.x,
            newPosition2.y,
            newPosition2.z
          );
        }
      }
    });
    
    // Animate rotation smoothly
    gsap.to(planeRotation2.current, {
      ...newRotation2,
      duration: animationDuration,
      ease: animationEase,
      onComplete: () => {
        // Ensure final rotation is set exactly
        if (planeRef2.current) {
          planeRef2.current.rotation.set(
            newRotation2.x,
            newRotation2.y,
            newRotation2.z
          );
        }
        // Mark animations as complete
        animationsActive.current = false;
      }
    });
    
  }, [textContent, animationDuration, animationEase]);

  // Optimized render loop
  useFrame(() => {
    // Skip frames on lower-end devices if not animating
    if (frameSkipCount > 0 && !animationsActive.current) {
      frameSkip.current = (frameSkip.current + 1) % (frameSkipCount + 1);
      if (frameSkip.current !== 0) return;
    }
    
    // Update plane 1
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
    
    // Update plane 2
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

  // Plane dimensions
  const planeSize = useMemo(() => {
    return isMobile ? [0.7, 0.4] : [0.9, 0.5];
  }, [isMobile]);

  // Use simpler material for low-end devices
  const materialType = isLowEndDevice ? 'meshBasicMaterial' : 'meshStandardMaterial';

  return (
    <>
      {textureLoaded1 && (
        <Plane 
          ref={planeRef1} 
          args={planeSize} 
          position={[0, 0, -1]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          castShadow={!isLowEndDevice}
        >
          {isLowEndDevice ? (
            <meshBasicMaterial 
              attach="material" 
              map={texture1} 
              transparent 
              alphaTest={0.5} 
              depthWrite={false}
            />
          ) : (
            <meshStandardMaterial 
              attach="material" 
              map={texture1} 
              transparent 
              alphaTest={0.5} 
              depthWrite={false}
            />
          )}
        </Plane>
      )}
      
      {textureLoaded2 && (
        <Plane 
          ref={planeRef2} 
          args={planeSize} 
          position={[0, 0, -1]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          castShadow={!isLowEndDevice}
        >
          {isLowEndDevice ? (
            <meshBasicMaterial 
              attach="material" 
              map={texture2} 
              transparent 
              alphaTest={0.5}
            />
          ) : (
            <meshStandardMaterial 
              attach="material" 
              map={texture2} 
              transparent 
              alphaTest={0.5}
            />
          )}
        </Plane>
      )}
    </>
  );
};

// Use memo to prevent unnecessary re-renders
export default React.memo(ImagePlane);
