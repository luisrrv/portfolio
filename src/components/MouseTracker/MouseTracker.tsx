import React, { useEffect, useState, useRef } from 'react';
import './MouseTracker.scss';

interface FollowCircleProps {
  size: number;
  sizeSmall: number;
}

const FollowCircle: React.FC<FollowCircleProps> = ({ size, sizeSmall }) => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const circleRefSmall = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);


  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    requestAnimationFrame(() => {
      if (circleRef.current) {
        setTimeout(() => {
            setPosition({ x: mouseX, y: mouseY });
        },100);
      }
      if (circleRefSmall.current) {
        setTimeout(() => {
            setPosition({ x: mouseX, y: mouseY });
        },100);
      }
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

  return (
    <>
        <div
        ref={circleRef}
        onClick={handleClick}
        className={`follow-circle ${isClicked ? 'clicked' : ''}`}
        style={{
            left: position.x - size / 2,
            top: position.y - size / 2,
        }}
        >
            <div
            ref={circleRefSmall}
            // onClick={handleClick}
            className={`follow-circle-small ${isClicked ? 'clicked' : ''}`}
            // style={{
            //     left: position.x - sizeSmall / 2,
            //     top: position.y - sizeSmall / 2,
            // }}
            />

        </div>
    </>
  );
};

export default FollowCircle;
