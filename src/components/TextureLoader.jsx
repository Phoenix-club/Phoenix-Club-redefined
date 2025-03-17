import React from 'react';
import { Html } from '@react-three/drei';

// This component will be used within R3F context
const TextureLoader = ({ progress }) => (
  <Html fullscreen>
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Loading Assets</h2>
        <div style={{
          width: '200px',
          height: '5px',
          background: '#333',
          borderRadius: '5px',
          overflow: 'hidden',
          margin: '10px auto'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#fff',
            transition: 'width 0.3s ease-out'
          }} />
        </div>
        <div>{progress}%</div>
      </div>
    </div>
  </Html>
);

export default TextureLoader;
