import React, { useEffect, useState, useRef } from 'react';
import './MouseTracker.scss';
// import useDarkMode from '../../hooks/useDarkMode';

import {BiSolidMessageRoundedDetail, BiLinkExternal, BiSolidBriefcaseAlt  } from 'react-icons/bi'
import {PiBracketsCurlyBold } from 'react-icons/pi'
import {MdWeb } from 'react-icons/md'

interface FollowCircleProps {
  size: number;
  sizeSmall: number;
  contactMS: boolean;
  contactOptsMS: boolean;
  projectMS: boolean;
  githubMS: EventTarget|HTMLElement|boolean;
  webMS: EventTarget|HTMLElement|boolean;
  coverMS: EventTarget|HTMLElement|boolean;
  isDark: boolean;
  handleDarkModeChange: (toggle: boolean) => void;
  handleMouseCoverChange: (toggle: boolean) => void;
  scrolling: boolean;
  aboutMS: boolean;
}

const FollowCircle: React.FC<FollowCircleProps> = ({ size, sizeSmall, contactMS, contactOptsMS, projectMS, githubMS, webMS, coverMS, isDark, handleDarkModeChange, handleMouseCoverChange, scrolling, aboutMS}) => {
  // const isDarkMode = useDarkMode();
  const appClassName = isDark ? 'light' : 'dark';
  const circleRef = useRef<HTMLDivElement | null>(null);
  const circleRefSmall = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [projectIcon, setProjectIcon] = useState(false);

  const handleMouseMove = (event: MouseEvent, github: EventTarget|HTMLElement|boolean = githubMS, web: EventTarget|HTMLElement|boolean = webMS, cover: EventTarget|HTMLElement|boolean = coverMS) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const linear = (t: number) => t;

    requestAnimationFrame(() => {
      const circleElement = circleRef.current;
      if (!circleElement) return;

      const circleSize = size || 100;
      const newX = mouseX - circleSize / 2;
      const newY = mouseY - circleSize / 2;

      // Calculate the current position of the circle
      const currentX = parseFloat(circleElement.style.left || '0');
      const currentY = parseFloat(circleElement.style.top || '0');

      // Calculate the distance to move in each frame
      const distanceX = newX - currentX;
      const distanceY = newY - currentY;

      // Number of frames for the animation
      const numFrames = 6;
      let currentFrame = 0;

      const updatePosition = () => {
        if (currentFrame <= numFrames) {
          const t = currentFrame / numFrames;
        //   const easeT = easeInOut(t);
          const easeT = linear(t);

          if (github instanceof HTMLElement) {
              circleElement.classList.add('button');
              circleElement.style.left = github.getBoundingClientRect().left + 'px';
              circleElement.style.top = github.getBoundingClientRect().top + 'px';
              circleElement.style.width = github.offsetWidth + 'px';
              circleElement.style.height = github.offsetHeight + 'px';
              circleElement.style.borderRadius = '8px';
          } else if (web instanceof HTMLElement) {
              circleElement.classList.add('button');
              circleElement.style.left = web.getBoundingClientRect().left + 'px';
              circleElement.style.top = web.getBoundingClientRect().top + 'px';
              circleElement.style.width = web.offsetWidth + 'px';
              circleElement.style.height = web.offsetHeight + 'px';
              circleElement.style.borderRadius = '8px';
          } else if (cover instanceof HTMLElement) {
            circleElement.classList.add('button');
            circleElement.style.left = cover.getBoundingClientRect().left + 'px';
            circleElement.style.top = cover.getBoundingClientRect().top + 'px';
            circleElement.style.width = cover.offsetWidth + 'px';
            circleElement.style.height = cover.offsetHeight + 'px';
            circleElement.style.borderRadius = '8px';
        } else {
            circleElement.classList.remove('button');
            const nextX = currentX + distanceX * easeT;
            const nextY = currentY + distanceY * easeT;
            
            circleElement.style.left = nextX + 'px';
            circleElement.style.top = nextY + 'px';
          
            const boundingRect = circleElement.getBoundingClientRect();
            const circleSize = size || Math.max(boundingRect.width, boundingRect.height);
            circleElement.style.width = `${circleSize}px`;
            circleElement.style.height = `${circleSize}px`;
            circleElement.style.borderRadius = '50%';
            circleElement.style.borderWidth = '1px !important';
        }


          currentFrame++;
          requestAnimationFrame(updatePosition);
        }
      };

      updatePosition();
    });
  };

  const handleClick = () => {
    const circle = document.querySelector('.follow-circle');
    if (circle && circle.classList.contains('button')) return;
    if (circle && !circle.classList.contains('clicked')) {
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    }
  };

  useEffect(() => {
    const circleElement = circleRef.current;
    const circleSmallElement = circleRefSmall.current;

    if (circleElement) {
      const boundingRect = circleElement.getBoundingClientRect();
      const circleSize = size || Math.max(boundingRect.width, boundingRect.height);
      circleElement.style.width = `${circleSize}px`;
      circleElement.style.height = `${circleSize}px`;
    }
    if (circleSmallElement) {
      const boundingRect = circleSmallElement.getBoundingClientRect();
      const circleSmallSize = sizeSmall || Math.max(boundingRect.width, boundingRect.height);
      circleSmallElement.style.width = `${circleSmallSize}px`;
      circleSmallElement.style.height = `${circleSmallSize}px`;
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, sizeSmall, githubMS, webMS, coverMS]);

  useEffect(() => {
    // window.addEventListener("scroll", (e) => setScrolling(true));

    window.addEventListener('click', handleClick);
    
    return () => {
      // window.removeEventListener("scroll", (e) => setScrolling(false));
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (scrolling) {
      if (circleRef.current?.classList.contains('cover') ||
          circleRef.current?.classList.contains('button')) {
        circleRef.current?.classList.add('scrolling');
      }
    } else {
      circleRef.current?.classList.remove('scrolling');
    }
  }, [scrolling]);

  useEffect(() => {
    if (scrolling) return;
    if(projectMS) {
      // setLoading(true);
      setTimeout(() => {
        // setLoading(false);
        setProjectIcon(true);
      }, 800);
    } else if (!projectMS) {
      setProjectIcon(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectMS]);

  return (
    <>
      {(window.matchMedia("(any-hover: none)").matches) ? (
        <div style={{display: 'none'}}></div>
      ) : (
        <div
          ref={circleRef}
          onClick={handleClick}
          // id={`${projectMS && loading ? 'loading' : ''}`}
          className={
            `
            follow-circle ${appClassName} 
            ${isClicked ? 'clicked' : ''} 
            ${contactMS ? 'contact' : ''} 
            ${contactOptsMS ? 'external' : ''} 
            ${(projectMS && projectIcon && !githubMS && !webMS) ? 'project' : (projectMS && githubMS instanceof HTMLElement) ? 'github' : (projectMS && webMS instanceof HTMLElement) ? 'web' : ''} 
            ${!projectMS && !githubMS && !webMS && coverMS ? 'cover' : ''}
            ${!isDark && !aboutMS ? 'black' : ''}
            `
          }
          style={{
            left: position.x - size / 2,
            top: position.y - size / 2,
          }}
        >
          <div
            ref={circleRefSmall}
            className={`follow-circle-small ${isClicked ? 'clicked' : ''}`}
            >
            {contactMS && (<BiSolidMessageRoundedDetail size={6} />)}
            {contactOptsMS && (<BiLinkExternal size={6} />)}
            {projectMS && !githubMS && !webMS && (<BiSolidBriefcaseAlt size={6} />)}
            {githubMS && (<PiBracketsCurlyBold size={6} />)}
            {webMS && (<MdWeb size={6} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default FollowCircle;
