import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import { ScrollControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import Loader from './Loader.jsx';

const Members = () => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  useEffect(() => {
    // Simple performance detection
    const fps = navigator.hardwareConcurrency;
    const isMobile = /webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsLowEndDevice(fps <= 4 || isMobile);
  }, []);

  return (
    <motion.div className="w-screen h-screen">
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{
            fov: 60,
            position: [0, 1, 1],
            near: 0.1,
            far: 100
          }}
          dpr={[1, isLowEndDevice ? 1.5 : 2]} // Limit DPR based on device capability
          style={{
            background: "#000000"
          }}
          performance={{ min: 0.5 }} // Allow performance scaling
        >
          <ScrollControls pages={0} /* specify how many pages to scroll */ damping={0.25}>
            <Experience />
          </ScrollControls>
          
          {!isLowEndDevice && (
            <EffectComposer multisampling={0} /* disable multisampling for better performance */>
              <Bloom
                luminanceThreshold={0.6}
                intensity={0.3}
                luminanceSmoothing={0.4}
                kernelSize={KernelSize.MEDIUM}
                resolutionScale={0.1}
              />
            </EffectComposer>
          )}
        </Canvas>
      </Suspense>
    </motion.div>
  );
};

export default Members;
