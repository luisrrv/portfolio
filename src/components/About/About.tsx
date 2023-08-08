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

  const HandleBlurIn = (e:any) => {
    e.target.classList.remove('blur-out');
    e.target.classList.add('blur-in');
  }
  const HandleBlurOut = (e:any) => {
    e.target.classList.remove('blur-in');
    e.target.classList.add('blur-out');
  }

  return (
    <div id='about_container' className={`about_container ${compClassName} ${hideApp && 'hidden'}`}>
      <div className="content" style={fadeOutStyle}>
        <div className="me-img"></div>
        <div className="special">
          <p className="small hello">HELLO, I'M</p>
          {/* <div className='name-img'></div> */}
          <p className={`big first`}>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>L</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>U</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>I</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>S</span>
            </p>
          <p className={`big last`}>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>R</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>O</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>D</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>R</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>I</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>G</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>U</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>E</span>
            <span className={`letter highlight-s `} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>Z</span>
            </p>
          <p className="small name">LUIS RODRIGUEZ</p>
        </div>
        <div className="divider"></div>
        <div className="text">
          <p>
            A passionate <span className='bold'>Software Developer</span> based in Tokyo. <br></br>Experienced
            in working on both  <span className='bold'>front-end</span> and  <span className='bold'>back-end</span> development for  <span className='bold'>web</span> and
            <span className='bold'> native apps</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
