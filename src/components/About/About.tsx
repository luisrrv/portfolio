import React, { useEffect, useState } from 'react';
import './About.scss';

// import * as React from 'react';
interface AboutProps {
  isDark: boolean;
  hideApp: boolean;
}

export default function About ({isDark, hideApp}: AboutProps) {
  const compClassName = isDark ? 'dark' : 'light';

  const [scrollPosition, setScrollPosition] = useState(0);

  // Update scroll position on scroll
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the scaling factor based on the scroll position
  const calculateScale = () => {
    const scaleFactor = 1 - (scrollPosition / window.innerHeight) * 0.1;
    return scaleFactor;
  };

  // Apply the scaling transformation to the element's style
  const zoomStyle: React.CSSProperties = {
    transform: `scale(${calculateScale()})`,
  };
  

  return (
    <div className={`about_container ${compClassName} ${hideApp && 'hidden'}`}>
      <div className="content" style={zoomStyle}>
        <div className="img"></div>
        <div className="text">
          <p>HELLO! I'M LUIS RODRIGUEZ</p>
          <p>A passionate Software Developer based in Tokyo experienced in working on both front-end and back-end development for web and native apps.</p>
        </div>
      </div>
    </div>
  );
}
