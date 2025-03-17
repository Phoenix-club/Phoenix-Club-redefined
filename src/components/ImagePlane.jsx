import { Plane } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import TextureLoader from './TextureLoader'
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

// Enhanced texture preloading and management
const textureCache = {};
const MEMBER_IMAGES = [
  '/members/NULL.png',
  '/members/RIDDHI.png',
  '/members/ASUS.png',
  '/members/VIDHEE.png',
  '/members/ARYAN.png',
  '/members/UDAY.png',
  '/members/ATHARVA.png',
  '/members/PRATIK.png',
  '/members/SIDDHI.png',
  '/members/LULWA.png',
  '/members/OREWA.png'
];

const useTexturePreloader = () => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;
    const total = MEMBER_IMAGES.length;

    MEMBER_IMAGES.forEach(url => {
      if (!textureCache[url]) {
        const texture = new THREE.TextureLoader().load(url, () => {
          count++;
          setProgress(Math.floor((count / total) * 100));
          if (count === total) setLoaded(true);
        });

        // Apply optimizations to all textures up front
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.anisotropy = 4; // Improves texture quality at angles
        textureCache[url] = texture;
      }
    });

    // If all textures were already cached
    if (Object.keys(textureCache).length === total) {
      setLoaded(true);
      setProgress(100);
    }
  }, []);

  return { loaded, progress };
};

const ImagePlane = ({ textContent }) => {
  const isLowEnd = usePerformanceCheck();
  const { loaded, progress } = useTexturePreloader();
  const [textureUrl1, setTextureUrl1] = useState("/members/NULL.png");
  const [textureUrl2, setTextureUrl2] = useState("/members/NULL.png");

  // Get textures from cache directly instead of using useLoader
  const texture1 = textureCache[textureUrl1];
  const texture2 = textureCache[textureUrl2];

  const planeRef1 = useRef();
  const planeRef2 = useRef();
  const planePosition1 = useRef({ x: 0, y: 0, z: -1 });
  const planeRotation1 = useRef({ x: 0, y: 0, z: 0 });
  const planePosition2 = useRef({ x: 0, y: 0, z: -1 });
  const planeRotation2 = useRef({ x: 0, y: 0, z: 0 });

  // Pre-compute all animation configurations to avoid recalculations
  const animationConfigurations = useMemo(() => {
    const createConfig = (isLowEndDevice) => {
      const duration = isLowEndDevice ? 1.5 : 2.5;
      const animEase = isLowEndDevice ? 'power1.out' : 'power2.out';

      // Pre-compute positions for all possible textContent values
      const configs = {
        'Presidents': {
          textures: ['/members/RIDDHI.png', '/members/ASUS.png'],
          positions: {
            pos1: { x: 0.1, y: 0.5, z: 0.5 },
            rot1: { x: -Math.PI/4, y: 0, z: 0 },
            pos2: {
              x: isMobile ? 0.1 : 0.3,
              y: 0.4,
              z: isMobile ? 0.15 : 0.1
            },
            rot2: { x: -Math.PI/4, y: 0, z: 0 },
          }
        },
        'Secretaries': {
          textures: ['/members/VIDHEE.png', '/members/ARYAN.png'],
          positions: {
            pos1: {
              x: isMobile ? 0.1 : -0.1,
              y: 0.5,
              z: 0.5
            },
            rot1: {
              x: -Math.PI/3,
              y: isMobile ? -Math.PI/8 : 0,
              z: 0
            },
            pos2: {
              x: isMobile ? 0 : 0.35,
              y: 0.25,
              z: isMobile ? 0 : 0.07
            },
            rot2: { x: -Math.PI/4, y: 0, z: 0 },
          }
        },
        'Treasurers': {
          textures: ['/members/UDAY.png', '/members/ATHARVA.png'],
          positions: {
            pos1: {
              x: isMobile ? 0.1 : -0.1,
              y: 0.3,
              z: 0.5
            },
            rot1: {
              x: isMobile ? -Math.PI/4 : -Math.PI/6,
              y: Math.PI/6,
              z: 0
            },
            pos2: {
              x: isMobile ? 0.1 : 0.6,
              y: isMobile ? 0.5 : 0.3,
              z: isMobile ? 0.3 : -0.1
            },
            rot2: { x: -Math.PI/6, y: -Math.PI/6, z: 0 },
          }
        },
        'CreativeTeam': {
          textures: ['/members/PRATIK.png', '/members/SIDDHI.png'],
          positions: {
            pos1: {
              x: isMobile ? 0 : -0.2,
              y: 0.3,
              z: isMobile ? 0.1 : 0.2
            },
            rot1: { x: -Math.PI/8, y: Math.PI/6, z: 0 },
            pos2: {
              x: isMobile ? 0.15 : 0.3,
              y: 0.25,
              z: isMobile ? -0.2 : 0
            },
            rot2: {
              x: -Math.PI/8,
              y: isMobile ? Math.PI/8 : -Math.PI/8,
              z: 0
            },
          }
        },
        'TechTeam': {
          textures: ['/members/LULWA.png', '/members/OREWA.png'],
          positions: {
            pos1: {
              x: isMobile ? 0 : -0.2,
              y: 0.3,
              z: isMobile ? 0.15 : 0.3
            },
            rot1: { x: -Math.PI/8, y: Math.PI/6, z: 0 },
            pos2: {
              x: isMobile ? 0.25 : 0.5,
              y: 0.25,
              z: isMobile ? -0.1 : 0.1
            },
            rot2: { x: -Math.PI/8, y: -Math.PI/6, z: 0 },
          }
        }
      };

      // If low-end, simplify values
      if (isLowEndDevice) {
        Object.keys(configs).forEach(key => {
          const round = (val) => Math.round(val * 10) / 10;
          const positions = configs[key].positions;

          Object.keys(positions).forEach(posKey => {
            positions[posKey] = Object.fromEntries(
              Object.entries(positions[posKey]).map(([k, v]) => [k, round(v)])
            );
          });
        });
      }

      return { configs, duration, animEase };
    };

    // Create configs for both performance levels
    return {
      normal: createConfig(false),
      lowEnd: createConfig(true)
    };
  }, []);

  // Update textures when textContent changes, using the pre-computed configs
  useEffect(() => {
    const config = isLowEnd
      ? animationConfigurations.lowEnd
      : animationConfigurations.normal;

    const selectedConfig = config.configs[textContent] ||
      { textures: ['/members/NULL.png', '/members/NULL.png'] };

    setTextureUrl1(selectedConfig.textures[0]);
    setTextureUrl2(selectedConfig.textures[1]);
  }, [textContent, isLowEnd, animationConfigurations]);

  // Apply animations when textContent or textures change
  useEffect(() => {
    if (!planeRef1.current && !planeRef2.current) return;

    // Get the current animation config based on device capability
    const config = isLowEnd
      ? animationConfigurations.lowEnd
      : animationConfigurations.normal;

    const selectedConfig = config.configs[textContent];

    if (!selectedConfig) return;

    const { pos1, rot1, pos2, rot2 } = selectedConfig.positions;

    // Apply animations using pre-computed values
    gsap.to(planePosition1.current, {
      ...pos1,
      duration: config.duration,
      ease: config.animEase,
      overwrite: true
    });

    gsap.to(planeRotation1.current, {
      ...rot1,
      duration: config.duration,
      ease: config.animEase,
      overwrite: true
    });

    const delay = isLowEnd ? 0.1 : 0;

    gsap.to(planePosition2.current, {
      ...pos2,
      duration: config.duration,
      delay,
      ease: config.animEase,
      overwrite: true
    });

    gsap.to(planeRotation2.current, {
      ...rot2,
      duration: config.duration,
      delay,
      ease: config.animEase,
      overwrite: true
    });

  }, [textContent, isLowEnd, animationConfigurations]);

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

  // Show loading screen if textures aren't loaded
  if (!loaded) {
    return <TextureLoader progress={progress} />;
  }

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
