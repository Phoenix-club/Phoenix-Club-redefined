import React, { useRef, useEffect, useMemo, useState } from "react";
import { useGLTF, useDetectGPU } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { isMobile } from "react-device-detect";

const Model = ({ textContent, ...props }) => {
  const ref = useRef();
  const ObjPosition = useRef({ x: 0, y: 0, z: 0 });
  const ObjRotation = useRef({ x: 0, y: 0, z: 0 });
  const { viewport } = useThree();
  
  // Detect GPU capabilities
  const GPUTier = useDetectGPU();
  const isLowEndDevice = useMemo(() => {
    return GPUTier.tier < 2 || GPUTier.isMobile;
  }, [GPUTier]);

  // Simplified model for low-end devices
  const [modelPath, setModelPath] = useState('/src/assets/3d/untitled.glb');
  useEffect(() => {
    // If low-end device detected, use a lower poly model if available
    if (isLowEndDevice || isMobile) {
      // Ideally you would have a low-poly version at this path
      setModelPath('/3d/untitled_lowpoly.glb');
    }
  }, [isLowEndDevice]);

  const positionMap = useMemo(() => ({
    Presidents: { x: -5.7, y: 0.15, z: 4.6, rx: 0, ry: 0, rz: 0 },
    Secretaries: { x: 1.5, y: 0, z: 6.9, rx: 0, ry: Math.PI / 2, rz: 0 },
    Treasurers: { x: 5.5, y: -0.1, z: -1.6, rx: 0, ry: Math.PI, rz: 0 },
    CreativeTeam: { x: -0.1, y: 0, z: 9, rx: 0, ry: Math.PI / 3, rz: 0 },
    ManagementTeam: { x: -6.9, y: 0, z: 1.5, rx: 0, ry: 0, rz: 0 },
    TechTeam: { x: -3, y: -0.5, z: -2, rx: 0, ry: -Math.PI * 0.5, rz: 0 }
  }), []);

  // Distance-based LOD (Level of Detail)
  const [detailLevel, setDetailLevel] = useState(1);
  
  useEffect(() => {
    if (!ref.current) return;
    const newValues = positionMap[textContent] || positionMap['Presidents'];
    if (
      newValues.x !== ObjPosition.current.x ||
      newValues.y !== ObjPosition.current.y ||
      newValues.z !== ObjPosition.current.z ||
      newValues.ry !== ObjRotation.current.y
    ) {
      // Use a less complex animation curve for low-end devices
      const easingCurve = isLowEndDevice ? 'power1.out' : 'power1.inOut';
      gsap.to(
        ObjPosition.current,{
          ...newValues,
          duration: isLowEndDevice ? 2.5 : 2,
          ease: easingCurve 
      });
      gsap.to(
        ObjRotation.current,{ 
          x: newValues.rx, 
          y: newValues.ry, 
          z: newValues.rz, 
          duration: isLowEndDevice ? 2.5 : 2, 
          ease: easingCurve });
    }
  }, [textContent, positionMap, isLowEndDevice]);

  useFrame(() => {
    if (
      ref.current &&
      (ref.current.position.x !== ObjPosition.current.x ||
        ref.current.position.y !== ObjPosition.current.y ||
        ref.current.position.z !== ObjPosition.current.z ||
        ref.current.rotation.y !== ObjRotation.current.y)
    ) {
      ref.current.position.set(ObjPosition.current.x, ObjPosition.current.y, ObjPosition.current.z);
      ref.current.rotation.set(ObjRotation.current.x, ObjRotation.current.y, ObjRotation.current.z);
    }
  });

  // Load the appropriate model based on device capability
  const { nodes, materials } = useGLTF(modelPath);

  return (
    <group {...props} ref={ref} dispose={null} scale={isLowEndDevice ? 0.002 : 0.002}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {Object.keys(nodes).map((key) => {
          // Skip rendering very small or detailed parts on low-end devices
          if (isLowEndDevice && nodes[key].geometry?.attributes?.position?.count > 10000) {
            // Skip high-poly meshes or render simplified versions
            return null;
          }
          
          return (
            <mesh 
              key={key} 
              geometry={nodes[key].geometry} 
              material={nodes[key].material ? materials[nodes[key].material.name] : undefined}
              scale={detailLevel}
            />
          );
        })}
      </group>
    </group>
  );
};

// Preload both high and low resolution models
useGLTF.preload('/3d/untitled.glb');
// Uncomment if you have a low-poly version
useGLTF.preload('/3d/untitled_lowpoly.glb');

export default React.memo(Model);