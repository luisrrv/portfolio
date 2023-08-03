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
  const darkMode = useDarkMode();
  const [isDark, setIsDark] = useState(darkMode);
  const appClassName = isDark ? 'dark' : 'light';
  const [loading, setLoading] = useState(true);
  const [hideApp, setHideApp] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [contactMS, setContactMS] = useState(false);
  const [contactOptsMS, setContactOptsMS] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideApp(false);
      setLoading(false);
      // setTimeout(() => {
      // },200);

    }, 2700);
  },[]);
  
  useEffect(() => {
    setIsDark(darkMode);
  },[darkMode]);

  // useEffect(() => {
  //   console.log('loading',loading);
  //   console.log('hideApp',hideApp);
  // },[loading, hideApp]);

  
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
    <>
    {/* <div className={`loading ${appClassName}`}> */}
      {/* <p>loading</p> */}
      {/* <div className="loading-bar"> */}
        {/* <div className={`fill ${loading ? '' : 'full' }`}></div> */}
      {/* </div> */}
    {/* </div> */}
    {loading ? (
      <div id="load" className={`load ${appClassName}`}>
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
      ) : (
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
          hideApp={hideApp}
          showContact={showContact}
          handleShowContact={handleShowContact}
          handleContactMouseOverChange={handleContactMouseOverChange}
          isDark={isDark}
          handleDarkModeChange={handleDarkModeChange}
        />
        <About isDark={isDark} hideApp={hideApp} />
        <Projects isDark={isDark} hideApp={hideApp} />
        </div>
      )}
    </>
  );
}

export default App;
