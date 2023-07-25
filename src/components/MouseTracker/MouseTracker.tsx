import React, { useEffect, useState, useRef } from 'react';
import './MouseTracker.scss';

interface FollowCircleProps {
  size: number;
}

const FollowCircle: React.FC<FollowCircleProps> = ({ size }) => {
  const circleRef = useRef<HTMLDivElement | null>(null);
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
    });
  };

  const handleClick = () => {
    const circle = document.querySelector('.follow-circle');
    if (circle && !circle.classList.contains('clicked')) {
      setIsClicked(true);
  
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const circleElement = circleRef.current;

    if (circleElement) {
      const boundingRect = circleElement.getBoundingClientRect();
      const circleSize = size || Math.max(boundingRect.width, boundingRect.height);
      circleElement.style.width = `${circleSize}px`;
      circleElement.style.height = `${circleSize}px`;
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size]);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      onClick={handleClick}
      className={`follow-circle ${isClicked ? 'clicked' : ''}`}
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
      }}
    />
  );
};

export default FollowCircle;
