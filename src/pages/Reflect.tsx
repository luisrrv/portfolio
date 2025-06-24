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
    const fadeFactorRef = useRef(0); // 0 = EXR, 1 = webcam
    const fadeTargetRef = useRef(0); // target we will interpolate toward
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const orbRef = useRef<THREE.Mesh | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const defaultEnvMapRef = useRef<THREE.Texture | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
    const webcamSphereRef = useRef<THREE.Mesh | null>(null);
    const cameraEnabledRef = useRef(false);
    
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
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.rotateSpeed = -1;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const geometry = new THREE.SphereGeometry(1, 128, 128);
        const material = new THREE.MeshPhysicalMaterial({
            metalness: 1,
            roughness: 0.05,
            envMapIntensity: 1.5,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        const orb = new THREE.Mesh(geometry, material);
        orb.scale.set(0.85, 0.85, 0.85);
        orbRef.current = orb;
        scene.add(orb);

        // Create cube camera for reflections
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
        });

        const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
        scene.add(cubeCamera);

        // Load default environment map
        const exrLoader = new EXRLoader();
        const pmrem = new PMREMGenerator(renderer);
        pmrem.compileEquirectangularShader();

        exrLoader.load('/envmap.exr', (texture) => {
            const envMap = pmrem.fromEquirectangular(texture).texture;
            defaultEnvMapRef.current = envMap;
            scene.environment = envMap;
            material.envMap = envMap;
            material.needsUpdate = true;
            texture.dispose();
        });

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Video plane setup (hidden from main view)
        const videoPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshBasicMaterial({ visible: false })
        );
        videoPlane.position.z = -10;
        scene.add(videoPlane);

        const animate = () => {
            requestAnimationFrame(animate);

            // Smoothly interpolate fadeFactor towards fadeTarget
            fadeFactorRef.current += (fadeTargetRef.current - fadeFactorRef.current) * 0.05;

            if (cameraEnabledRef.current && videoTextureRef.current && orbRef.current && webcamSphereRef.current) {
                videoTextureRef.current.needsUpdate = true;

                webcamSphereRef.current.visible = true;

                cubeCamera.position.copy(orbRef.current.position);
                cubeCamera.update(renderer, scene);

                webcamSphereRef.current.visible = false;

                const mat = orbRef.current.material as THREE.MeshPhysicalMaterial;
                mat.envMap = cubeCamera.renderTarget.texture;

                // Blend between EXR and webcam reflection
                if (fadeFactorRef.current < 0.99) {
                    mat.envMap = defaultEnvMapRef.current;
                }
                if (fadeFactorRef.current > 0.01 && cameraEnabled) {
                    mat.envMap = cubeRenderTarget.texture;
                }
                
                mat.needsUpdate = true;
            }

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            }
            controls.dispose();
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleCamera = async () => {
        if (cameraEnabled) {
            // Turn OFF camera
            fadeTargetRef.current = 0; // fade back to EXR
            const scene = sceneRef.current;
            if (!scene) return;
            
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            
            if (videoTextureRef.current) {
                videoTextureRef.current.dispose();
                videoTextureRef.current = null;
            }

            // Restore default env map
            if (orbRef.current?.material && defaultEnvMapRef.current) {
                const material = orbRef.current.material as THREE.MeshPhysicalMaterial;
                material.envMap = defaultEnvMapRef.current;
                material.needsUpdate = true;
            }

            cameraEnabledRef.current = false;
            setCameraEnabled(false);
        } else {
            // Turn ON camera
            setIsStarting(true);
            fadeTargetRef.current = 1; // fade to webcam reflection
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

                // Create video texture
                const videoTexture = new THREE.VideoTexture(video);
                videoTexture.colorSpace = THREE.SRGBColorSpace;
                videoTextureRef.current = videoTexture;

                // Update video plane material
                scene.children.forEach(child => {
                    if (child instanceof THREE.Mesh && child.geometry.type === 'PlaneGeometry') {
                        (child.material as THREE.MeshBasicMaterial).map = videoTexture;
                        (child.material as THREE.MeshBasicMaterial).needsUpdate = true;
                    }
                });

                // Create large inverted sphere with webcam feed
                const webcamGeometry = new THREE.SphereGeometry(5, 64, 64);
                const webcamMaterial = new THREE.MeshBasicMaterial({
                    map: videoTexture,
                    side: THREE.BackSide
                });
                const webcamSphere = new THREE.Mesh(webcamGeometry, webcamMaterial);
                webcamSphere.visible = false;
                scene.add(webcamSphere);
                webcamSphereRef.current = webcamSphere;

                cameraEnabledRef.current = true;
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
                    {isStarting && <div className="starting-indicator" />}
                    <div className='text'><FiCamera size={'1rem'} /></div>
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

            <section ref={mountRef} className='reflect-content' />

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