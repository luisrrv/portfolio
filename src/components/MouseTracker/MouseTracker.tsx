import React, { useEffect, useState, useRef } from 'react';
import './MouseTracker.scss';
// import useDarkMode from '../../hooks/useDarkMode';

import {BiSolidMessageRoundedDetail, BiLinkExternal } from 'react-icons/bi'

interface FollowCircleProps {
  size: number;
  sizeSmall: number;
  contactMS: boolean;
  contactOptsMS: boolean;
  isDark: boolean;
  handleDarkModeChange: (toggle: boolean) => void;
}

const FollowCircle: React.FC<FollowCircleProps> = ({ size, sizeSmall, contactMS, contactOptsMS, isDark, handleDarkModeChange}) => {
  // const isDarkMode = useDarkMode();
  const appClassName = isDark ? 'dark' : 'light';
  const circleRef = useRef<HTMLDivElement | null>(null);
  const circleRefSmall = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);


  const handleMouseMove = (event: MouseEvent) => {
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

          const nextX = currentX + distanceX * easeT;
          const nextY = currentY + distanceY * easeT;

          circleElement.style.left = nextX + 'px';
          circleElement.style.top = nextY + 'px';

          currentFrame++;
          requestAnimationFrame(updatePosition);
        }
      };

      updatePosition();
    });
  };

  const handleClick = () => {
    const circle = document.querySelector('.follow-circle');
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
  }, [size, sizeSmall]);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // useEffect(()=> {
  //   console.log('inside mousetracker, contact hover value: ',contactOptsMS);
  // }, [contactOptsMS]);

  return (
    <>
      <div
        ref={circleRef}
        onClick={handleClick}
        className={`follow-circle ${appClassName} ${isClicked ? 'clicked' : ''} ${contactMS ? 'contact' : ''} ${contactOptsMS ? 'external' : ''}`}
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
        </div>
      </div>
    </>
  );
};

export default FollowCircle;
