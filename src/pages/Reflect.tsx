// src/pages/Reflect.tsx
import { useEffect } from 'react';

const Reflect = () => {
    useEffect(() => {
        console.log('Reflect component mounted');
    }, []);

    return (
        <div>
            {/* TODO: Three.js orb + camera feed goes here */}
            🚧 Reflect page under construction 🚧
        </div>
    );
};

export default Reflect;