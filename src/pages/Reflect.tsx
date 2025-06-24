import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/reflect.scss';
import { FiCamera } from 'react-icons/fi';
import { FaGithub, FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import { PMREMGenerator } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Reflect = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const orbRef = useRef<THREE.Mesh | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const defaultEnvMapRef = useRef<THREE.Texture | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const autoRotateRef = useRef(true);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    useEffect(() => {
        document.title = "Reflect – You bring the form, I return its reflection.";

        const mount = mountRef.current;
        if (!mount) return;

        document.documentElement.classList.add('reflect');
        document.body.classList.add('reflect');

        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;
        mount.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;  // for smooth interaction
        controls.enableZoom = false;    // optional: disable zoom
        controls.enablePan = false;     // optional: disable pan
        controls.rotateSpeed = -1;      // Negative to invert drag direction
        controls.dampingFactor = 0.05;  // Optional (keep positive)
        controls.autoRotate = true;     // optional: auto-rotate the scene
        controls.enableZoom = false;    // optional: lock zoom to camera distance

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const geometry = new THREE.SphereGeometry(1, 128, 128);
        const material = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0.05,              // ⬅️ slight blur to reflections (not zero)
            envMapIntensity: 1.2,         // ⬅️ brighten the reflection
            clearcoat: 1,
            clearcoatRoughness: 0.1,      // ⬅️ softens the clearcoat highlight
            reflectivity: 1,              // ⬅️ (optional if using MeshPhysicalMaterial)
        });

        const orb = new THREE.Mesh(geometry, material);
        orb.scale.set(0.85, 0.85, 0.85);
        orbRef.current = orb;
        scene.add(orb);

        // Load a single equirectangular env map
        const exrLoader = new EXRLoader();
        const pmrem = new PMREMGenerator(renderer);
        pmrem.compileEquirectangularShader();

        // HDR/equirectangular map load - from polyhaven
        exrLoader.load('/envmap.exr', (texture) => {
            const envMap = pmrem.fromEquirectangular(texture).texture;
            defaultEnvMapRef.current = envMap; // Save for later switching

            scene.environment = envMap;
            (material as THREE.MeshPhysicalMaterial).envMap = envMap;
            material.needsUpdate = true;

            const textureLoader = new THREE.TextureLoader();

            textureLoader.load('/textures/metal030_normal.jpg', (tex) => {
                tex.colorSpace = THREE.NoColorSpace;
                material.normalMap = tex;
                material.normalScale.set(0.2, 0.2); // Light scratches
            });

            textureLoader.load('/textures/metal030_roughness.jpg', (tex) => {
                tex.colorSpace = THREE.NoColorSpace;
                material.roughnessMap = tex;
                material.roughness = 0.1;
            });

            texture.dispose(); // free original exr
            renderer.render(scene, camera);
        });

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);

            if (autoRotateRef.current && orbRef.current) {
                orbRef.current.rotation.y += 0.005;
            } else if (orbRef.current) {
                // reset rotations with lerp
                orbRef.current.rotation.y += (0 - orbRef.current.rotation.y) * 0.1;
                orbRef.current.rotation.x += (0 - orbRef.current.rotation.x) * 0.1;
                orbRef.current.rotation.z += (0 - orbRef.current.rotation.z) * 0.1;
            }

            controls.update();
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
            controls.dispose();
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

            // Switch back to default EXR envMap
            if (orbRef.current?.material && defaultEnvMapRef.current) {
                const material = orbRef.current.material as THREE.MeshPhysicalMaterial;
                material.envMap = defaultEnvMapRef.current;
                material.needsUpdate = true;
            }

            autoRotateRef.current = true;
            setCameraEnabled(false);
        } else {
            // === Turn ON camera ===
            setIsStarting(true);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = document.createElement('video');
                video.autoplay = true;
                video.muted = true;
                video.playsInline = true;
                video.srcObject = stream;
                await video.play();
                videoRef.current = video;

                const scene = sceneRef.current;
                if (!scene) return;

                const videoTexture = new THREE.VideoTexture(video);
                videoTexture.colorSpace = THREE.SRGBColorSpace;
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.generateMipmaps = false;

                const material = orbRef.current?.material as THREE.MeshPhysicalMaterial;
                if (material) {
                    material.envMap = videoTexture;
                    material.needsUpdate = true;
                }

                scene.environment = null;
                scene.add(new THREE.AmbientLight(0xffffff, 0.5));
                scene.add(new THREE.DirectionalLight(0xffffff, 1));

                autoRotateRef.current = false;
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
                    <div className='text'>Designed and coded by <a href='https://github.com/luisrrv' target='_blank' rel="noreferrer"><FaGithub size={'0.7rem'} style={{marginRight:'0.1rem'}}/>luisrrv.</a></div>
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