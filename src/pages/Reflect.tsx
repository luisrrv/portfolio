import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/reflect.scss';
import { FiCamera } from 'react-icons/fi';
import { FaGithub, FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

const Reflect = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<THREE.Mesh | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    useEffect(() => {
        document.title = "Reflect – You bring the form, I return its reflection.";

        const mount = mountRef.current;
        if (!mount) return;

        document.documentElement.classList.add('reflect');
        document.body.classList.add('reflect');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0,
            envMapIntensity: 1.0,
            clearcoat: 1,
            clearcoatRoughness: 0,
        });

        const orb = new THREE.Mesh(geometry, material);
        orbRef.current = orb;
        scene.add(orb);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            orb.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach((track) => track.stop());
            }
            renderer.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    const toggleCamera = async () => {
        if (cameraEnabled) {
            // === Turn OFF camera ===
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach((track) => track.stop());
                videoRef.current.srcObject = null;
            }
            if (orbRef.current?.material) {
                (orbRef.current.material as THREE.MeshPhysicalMaterial).envMap = null;
                (orbRef.current.material as THREE.Material).needsUpdate = true;
            }
            setCameraEnabled(false);
        } else {
            // === Turn ON camera ===
            setIsStarting(true); // start indicator
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = document.createElement('video');
                video.autoplay = true;
                video.muted = true;
                video.playsInline = true;
                video.srcObject = stream;
                await video.play();
                videoRef.current = video;

                const videoTexture = new THREE.VideoTexture(video);
                videoTexture.colorSpace = THREE.SRGBColorSpace;

                if (orbRef.current?.material) {
                    (orbRef.current.material as THREE.MeshPhysicalMaterial).envMap = videoTexture;
                    (orbRef.current.material as THREE.Material).needsUpdate = true;
                }

                setCameraEnabled(true);
            } catch (err) {
                console.error('Camera error:', err);
                alert('Could not enable camera. Please check permissions.');
            } finally {
                setIsStarting(false);
            }
        }
    };

    return (
        <div className='reflect-container'>
            <header className='reflect-header'>
                <div className="left">
                    {/* <h1 className="text">Reflect</h1> */}
                    {/* <h3 className="text">You bring the form, I return its reflection.</h3> */}
                    {/* <h3 className="text">A creative blend of 3D rendering and real-time video</h3> */}
                </div>

                <div className="right">
                    {isStarting && (
                        <div className="starting-indicator" />
                    )}
                    
                    <div className='text'>
                        <FiCamera size={'1rem'} />
                    </div>

                    <div className="toggle">
                        <input
                            type="checkbox"
                            id="btn"
                            checked={cameraEnabled}
                            onChange={toggleCamera}
                        />
                        <label htmlFor="btn">
                            <span className="thumb"></span>
                        </label>
                        <div className="light"></div>
                    </div>
                </div>
            </header>

            <section
                ref={mountRef}
                className='reflect-content'
            />

            <footer className='reflect-footer'>
                <div className="text top">Camera never records or stores anything.</div>
                <div className="bottom">
                    <div className='text'>Designed and coded by <a href='https://github.com/luisrrv' target='_blank' rel="noreferrer"><FaGithub size={'0.7rem'}/>luisrrv.</a></div>
                    <div className='logos text'>
                        <a href="https://react.dev" target='_blank' rel='noreferrer' className='react'>
                            <FaReact size={'0.8rem'} />
                        </a>
                        <a href="https://www.typescriptlang.org" target='_blank' rel='noreferrer' className='ts'>
                            <SiTypescript size={'0.8rem'} />
                        </a>
                        <a href="https://threejs.org" target='_blank' rel='noreferrer' className='threejs'>
                            <TbBrandThreejs size={'0.8rem'} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Reflect;