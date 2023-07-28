import React, { useEffect, useState } from 'react';
import useDarkMode from './hooks/useDarkMode';
import './App.css';

import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import MouseTracker from './components/MouseTracker/MouseTracker';

export interface IAppProps {
  className?: string;
  isDarkMode?: boolean;
}

function App({ className, isDarkMode }: IAppProps) {

  isDarkMode = useDarkMode();
  const appClassName = isDarkMode ? 'dark' : 'light';
  const [showContact, setShowContact] = useState(false);
  
  const checkElements = (element: string, type: string, maxAttempts = 10, interval = 100) => {
    let attempts = 0;
    const checkElement = () => {
      let el = document.querySelector(`.${element}_container`) as HTMLElement | null;
      if (el) {
        setTimeout(() => {
          // console.log(element);
          // console.log(type);
          if (type === 'show') {
            el && el.classList.remove('out');
            el && el.classList.add('entered');
          } else if (type === 'hide') {
            el && el.classList.remove('entered');
            el && el.classList.add('out');
            setTimeout(()=> {
              setShowContact(false);
            }, 300)
          }
        }, interval);
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkElement, interval);
        } else {
          console.error(`Element with class ${element}_container not found after ${maxAttempts} attempts.`);
        }
      }
    };
    checkElement();
  };

  const handleShowContact = () => {
    if (showContact) {
      checkElements('contact','hide');
    } else {
      setShowContact((prev) => !prev);
    }
  };


  useEffect(() => {
    showContact && checkElements('contact', 'show');
  },[showContact]);

  return (
    <div className={`App ${appClassName}`}>
      <MouseTracker 
        size={30} 
        sizeSmall={8} 
      />
      <Header
        showContact={showContact}
        handleShowContact={handleShowContact}
      />
      <About />
      <Projects />
      {showContact && (
        <>
          <Contact 
          className={'out'} 
          />
        </>
      )}
    </div>
  );
}

export default App;
