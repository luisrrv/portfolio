import './About.scss';

// import * as React from 'react';
interface AboutProps {
  isDark: boolean;
}

export default function About ({isDark}: AboutProps) {
  const compClassName = isDark ? 'light' : 'dark';
  

  return (
    <div className={`about_container ${compClassName}`}>
      <div className="content">
        <div className="img"></div>
        <div className="text">
          <p>HELLO! I'M LUIS RODRIGUEZ</p>
          <p>A passionate Software Developer based in Tokyo experienced in working on both front-end and back-end development for web and native apps.</p>
        </div>
      </div>
    </div>
  );
}
