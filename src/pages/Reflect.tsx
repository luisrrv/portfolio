import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../styles/reflect.scss';
import { FiCamera } from 'react-icons/fi';
import { FaGithub, FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Reflect = () => {
    const fadeFactorRef = useRef(0); // 0 = EXR, 1 = webcam
    const fadeTargetRef = useRef(0); // target we will interpolate toward
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const orbRef = useRef<THREE.Mesh | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
    const webcamSphereRef = useRef<THREE.Mesh | null>(null);
    const cameraEnabledRef = useRef(false);
    const shadowFadeRef = useRef(0); // current value: 0 (invisible) → 1 (full shadow)
    const shadowTargetRef = useRef(1); // what we interpolate toward
    const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
    
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
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current = renderer;
        mount.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.rotateSpeed = 1;
        controls.dampingFactor = 0.05;
        // Lock vertical rotation
        controls.minPolarAngle = Math.PI / 2; // 90 degrees
        controls.maxPolarAngle = Math.PI / 2; // 90 degrees

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.intensity = 0; // Start with no light
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        dirLight.shadow.radius = 4;
        dirLight.shadow.bias = -0.001;
        dirLightRef.current = dirLight;
        scene.add(dirLight);

        scene.background = new THREE.Color('#111') // Dark background for better contrast

        const geometry = new THREE.SphereGeometry(1, 128, 128);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xaaaaaa,      // light silver tint
            metalness: 1,         // still very metallic
            roughness: 0.2,       // not fully polished (more silver than mirror)
            envMapIntensity: 1.2,
            clearcoat: 0.6,
            clearcoatRoughness: 0.1,
        });

        const orb = new THREE.Mesh(geometry, material);
        orb.scale.set(0.85, 0.85, 0.85);
        orb.castShadow = true;
        orbRef.current = orb;
        scene.add(orb);

        const textureLoader = new THREE.TextureLoader();
        const rockColorMap = textureLoader.load('/textures/rock/color.jpg');
        const rockNormalMap = textureLoader.load('/textures/rock/normal.jpg');
        const rockRoughnessMap = textureLoader.load('/textures/rock/roughness.jpg');
        const rockAOMap = textureLoader.load('/textures/rock/ao.jpg');
        const displacementMap = textureLoader.load('/textures/rock/displacement.jpg');
        displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
        displacementMap.repeat.set(4, 4);

        rockColorMap.wrapS = rockColorMap.wrapT = THREE.RepeatWrapping;
        rockColorMap.repeat.set(4, 4);
        rockNormalMap.wrapS = rockNormalMap.wrapT = THREE.RepeatWrapping;
        rockNormalMap.repeat.set(4, 4);
        rockRoughnessMap.wrapS = rockRoughnessMap.wrapT = THREE.RepeatWrapping;
        rockRoughnessMap.repeat.set(4, 4);
        rockAOMap.wrapS = rockAOMap.wrapT = THREE.RepeatWrapping;
        rockAOMap.repeat.set(4, 4);

        const floorMaterial = new THREE.MeshStandardMaterial({
            map: rockColorMap,
            normalMap: rockNormalMap,
            roughnessMap: rockRoughnessMap,
            aoMap: rockAOMap,
            displacementMap: displacementMap,
            displacementScale: 0.3, // tweak for subtle unevenness
            metalness: 0.1,
            roughness: 0.7
        });

        const floorGeometry = new THREE.PlaneGeometry(20, 20, 128, 128);
        floorGeometry.computeVertexNormals(); // just in case
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1;
        floor.receiveShadow = true;
        scene.add(floor);

        renderer.shadowMap.enabled = true;
        orb.castShadow = true;

        const starsGeometry = new THREE.SphereGeometry(50, 64, 64);
        const starsMaterial = new THREE.MeshBasicMaterial({
            color: 0x000011,
            side: THREE.BackSide,
        });
        const stars = new THREE.Mesh(starsGeometry, starsMaterial);
        scene.add(stars);

        // Create cube camera for reflections
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
        });

        const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
        scene.add(cubeCamera);


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

            // Smoothly fade in shadows
            shadowFadeRef.current += (shadowTargetRef.current - shadowFadeRef.current) * 0.05;

            if (dirLightRef.current) {
                dirLightRef.current.intensity = shadowFadeRef.current;
            }

            if (orbRef.current) {
                const mat = orbRef.current.material as THREE.MeshPhysicalMaterial;

                // Webcam update (if running)
                if (cameraEnabledRef.current && videoTextureRef.current) {
                    videoTextureRef.current.needsUpdate = true;
                }

                const showWebcam = fadeFactorRef.current > 0.01;

                const webcamSphere = webcamSphereRef.current;
                const floor = sceneRef.current?.children.find(
                    obj => obj instanceof THREE.Mesh &&
                        obj.geometry instanceof THREE.PlaneGeometry &&
                        obj !== webcamSphere // exclude the videoPlane
                ) as THREE.Mesh | undefined;

                if (webcamSphere) webcamSphere.visible = showWebcam;
                if (floor && showWebcam) floor.visible = false;

                cubeCamera.position.copy(orbRef.current.position);
                cubeCamera.update(renderer, scene);

                if (webcamSphere) webcamSphere.visible = false;
                if (floor) floor.visible = true;

                // Apply updated env map
                mat.envMap = cubeRenderTarget.texture;
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


            shadowTargetRef.current = 0; // fade out
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

                const videoPlane = scene.children.find(child =>
                    child instanceof THREE.Mesh &&
                    child.geometry instanceof THREE.PlaneGeometry &&
                    (child.material as THREE.MeshBasicMaterial).visible === false
                ) as THREE.Mesh | undefined;

                if (videoPlane && videoTexture) {
                    (videoPlane.material as THREE.MeshBasicMaterial).map = videoTexture;
                    (videoPlane.material as THREE.MeshBasicMaterial).needsUpdate = true;
                }

                // Create large inverted sphere with webcam feed
                const webcamGeometry = new THREE.SphereGeometry(5, 64, 64);
                const webcamMaterial = new THREE.MeshBasicMaterial({
                    map: videoTexture,
                    side: THREE.BackSide
                });
                const webcamSphere = new THREE.Mesh(webcamGeometry, webcamMaterial);
                webcamSphere.scale.x = -1; // Flip horizontally like a mirror
                webcamSphere.visible = false;
                scene.add(webcamSphere);
                webcamSphereRef.current = webcamSphere;

                shadowTargetRef.current = 1; // fade in
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