import React, { useEffect, useState } from 'react';
import './About.scss';

interface AboutProps {
  isDark: boolean;
  hideApp: boolean;
}

export default function About({ isDark, hideApp }: AboutProps) {
  const compClassName = isDark ? 'dark' : 'light';

  const [scrollPosition, setScrollPosition] = useState(0);

  // Update scroll position on scroll
  const handleScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.scrollY);
    });
  };

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the opacity based on the scroll position
  const calculateOpacity = () => {
    const maxScroll = window.innerHeight * 0.5; // Adjust the value as needed for the fade-out distance
    const opacity = 1 - scrollPosition / maxScroll;
    return opacity < 0 ? 0 : opacity; // Make sure opacity doesn't go below 0
  };

  // Apply the opacity to the element's style
  const fadeOutStyle: React.CSSProperties = {
    opacity: calculateOpacity(),
  };

  return (
    <div id='about_container' className={`about_container ${compClassName} ${hideApp && 'hidden'}`}>
      <div className="content" style={fadeOutStyle}>
        {/* <div className="img"></div> */}
        <div className="special">
          <p className="small hello">HELLO, I'M</p>
          <p className="big">LUIS</p>
          <p className="big">RODRIGUEZ</p>
          <p className="small name">LUIS RODRIGUEZ</p>
        </div>
        <div className="divider"></div>
        <div className="text">
          <p>
            A passionate Software Developer based in Tokyo. <br></br>Experienced
            in working on both front-end and back-end development for web and
            native apps.
          </p>
        </div>
      </div>
    </div>
  );
}
