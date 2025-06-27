
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface NodeProps {
    position: [number, number, number];
}

const Node: React.FC<NodeProps> = ({ position }) => {
    const mesh = useRef<THREE.Mesh>(null);

    // Refractive Material
    const glassMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                toneMapped: false,
                fog: true,
                emissive: '#e1efff',
                emissiveIntensity: 5,
                color: new THREE.Color('#e9fdff'),
            }),
        []
    );

    return (
        <mesh position={position}>
            <sphereGeometry args={[0.06 + Math.random() * 0.1, 32, 32]} />
            <meshStandardMaterial
                toneMapped={false}
                fog={true}
                emissive={'#a9d7ff'}
                emissiveIntensity={3}
                color={new THREE.Color('#cdeeff')}
            />
        </mesh>
    );
};

export default Node;
