import React, { useEffect, useState } from 'react';
import useDarkMode from './hooks/useDarkMode';
import './App.css';

import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
// import Contact from './components/Contact/Contact';
import MouseTracker from './components/MouseTracker/MouseTracker';

export interface IAppProps {
  className?: string;
  isDarkMode?: boolean;
}


function App({ className, isDarkMode }: IAppProps) {

  const [isDark, setIsDark] = useState(useDarkMode());
  const appClassName = isDark ? 'light' : 'dark';
  const [showContact, setShowContact] = useState(false);
  const [contactMS, setContactMS] = useState(false);
  const [contactOptsMS, setContactOptsMS] = useState(false);
  
  const checkElements = (element: string, type: string, maxAttempts = 10, interval = 100) => {
    let attempts = 0;
    const checkElement = () => {
      let el = document.querySelector(`.${element}-opts`) as HTMLElement | null;
      if (el) {
        setTimeout(() => {
          // console.log(element);
          // console.log(type);
          if (type === 'show') {
            setTimeout(()=> {
              el && el.classList.remove('out');
              el && el.classList.add('entered');
            },300)
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
          console.error(`Element with class ${element}-opts not found after ${maxAttempts} attempts.`);
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

  const handleContactMouseOverChange = (isMouseOver: boolean, element: string) => {
    if (element==='btn') setContactMS(isMouseOver);
    else if (element==='content') setContactOptsMS(isMouseOver);
  };

  const handleDarkModeChange = (toggle: boolean) => {
    setIsDark(toggle);
    document.body.classList.toggle('dark');
  };

  useEffect(() => {
    showContact && checkElements('contact', 'show');
  },[showContact]);

  // useEffect(()=> {
  //   console.log ('isDark:', isDark);
  // }, [isDark]);

  return (
    <div className={`App ${appClassName}`}>
      <MouseTracker 
        size={40} 
        sizeSmall={8} 
        contactMS={contactMS}
        contactOptsMS={contactOptsMS}
        isDark={isDark}
        handleDarkModeChange={handleDarkModeChange}
      />
      <Header
        showContact={showContact}
        handleShowContact={handleShowContact}
        handleContactMouseOverChange={handleContactMouseOverChange}
        isDark={isDark}
        handleDarkModeChange={handleDarkModeChange}
      />
      <About isDark={isDark} />
      <Projects isDark={isDark} />
      {/* {showContact && (
        <>
          <Contact 
          className={'out'} 
          />
        </>
      )} */}
    </div>
  );
}

export default App;
