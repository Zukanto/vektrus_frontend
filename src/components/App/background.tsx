import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';

interface NodeProps {
    position: [number, number, number];
}

const Node: React.FC<NodeProps> = ({ position }) => {
    // Material für die Nodes
    const glassMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                toneMapped: false,
                fog: true,
                emissive: '#aed2e5',
                emissiveIntensity: 3,
                color: new THREE.Color('#0c545b'),
            }),
        []
    );

    return (
        <mesh position={position}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <primitive attach="material" object={glassMaterial} />
        </mesh>
    );
};

interface NetworkProps {
    nodes: number;
}

const generateNetwork = (nodes: number) => {
    const positions = [];
    const edges = [];
    const maxEdgesPerNode = 2;

    for (let i = 0; i < nodes; i++) {
        let position: [number, number, number];
        let overlap;
        do {
            position = [
                Math.random() * 50 - 25,
                Math.random() * 40 - 20,
                Math.random() * 30 - 10,
            ];
            overlap = positions.some(
                (pos) =>
                    Math.sqrt(
                        Math.pow(pos[0] - position[0], 2) +
                        Math.pow(pos[1] - position[1], 2) +
                        Math.pow(pos[2] - position[2], 2)
                    ) < 0.3
            );
        } while (overlap);
        positions.push(position);
    }

    const edgesPerNode = Array(nodes).fill(0);
    for (let i = 0; i < nodes; i++) {
        for (let j = i + 1; j < nodes; j++) {
            if (
                edgesPerNode[i] < maxEdgesPerNode &&
                edgesPerNode[j] < maxEdgesPerNode
            ) {
                edges.push([i, j]);
                edgesPerNode[i]++;
                edgesPerNode[j]++;
            }
        }
    }

    return { positions, edges };
};

const Network: React.FC<NetworkProps> = ({ nodes }) => {
    const { positions, edges } = useMemo(() => generateNetwork(nodes), [nodes]);
    const lineMaterial = useMemo(
        () =>
            new THREE.LineBasicMaterial({
                color: 'rgb(53,129,115)',
                transparent: true,
                opacity: 0.05,

            }),
        []
    );

    return (
        <>
            {positions.map((position, index) => (
                <Node key={index} position={position} />
            ))}
            {edges.map(([start, end], index) => {
                const startPos = positions[start];
                const endPos = positions[end];
                const points = new Float32Array([...startPos, ...endPos]);
                return (
                    <line key={index}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                array={points}
                                itemSize={3}
                                count={2}
                            />
                        </bufferGeometry>
                        <primitive attach="material" object={lineMaterial} />
                    </line>
                );
            })}
        </>
    );
};

const CameraRig: React.FC = () => {
    const { camera } = useThree();
    const clockRef = useRef(new THREE.Clock());
    const currentPos = useRef({ x: 0, z: 0 });
    const targetPos = useRef({ x: 0, z: 0 });

    useFrame(() => {
        const t = clockRef.current.getElapsedTime();
        targetPos.current.x = 40 * Math.sin(t / 50);
        targetPos.current.z = 40 * Math.cos(t / 50);

        currentPos.current.x = THREE.MathUtils.lerp(
            currentPos.current.x,
            targetPos.current.x,
            0.1
        );
        currentPos.current.z = THREE.MathUtils.lerp(
            currentPos.current.z,
            targetPos.current.z,
            0.1
        );

        camera.position.x = currentPos.current.x;
        camera.position.z = currentPos.current.z;
        camera.lookAt(0, 0, 0);
    });

    return <directionalLight />;
};

const Background: React.FC = () => {
    const nodes = 20;

    return (
        <Canvas style={{ width: '100vw', height: '100vh', zIndex: 0}}>
            <EffectComposer>
                <DepthOfField
                    focusDistance={2}
                    focalLength={0.00001}
                    bokehScale={0.5}
                />
                <Bloom
                    mipmapBlur
                    intensity={10}
                    luminanceThreshold={1}
                    luminanceSmoothing={1}
                    kernelSize={KernelSize.LARGE}
                    resolutionX={Resolution.AUTO_SIZE}
                    resolutionY={Resolution.AUTO_SIZE}
                />
            </EffectComposer>

            <Network nodes={nodes} />
            <CameraRig />
        </Canvas>
    );
};

export default Background;
