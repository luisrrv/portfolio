import React, { useEffect, useState } from 'react';
import useDarkMode from './hooks/useDarkMode';
import './App.css';

import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import MouseTracker from './components/MouseTracker/MouseTracker';
import Info from './components/Info/Info';

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
  const [projectMS, setProjectMS] = useState(false);
  const [githubMS, setGithubMS] = useState(false);
  const [webMS, setWebMS] = useState(false);
  const [contactOptsMS, setContactOptsMS] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideApp(false);
      setLoading(false);
    }, 2700);
  },[]);
  
  useEffect(() => {
    setIsDark(darkMode);
  },[darkMode]);
  
  const checkElements = (element: string, type: string, maxAttempts = 10, interval = 100) => {
    let attempts = 0;
    const checkElement = () => {
      let el = document.querySelector(`.${element}-opts`) as HTMLElement | null;
      if (el) {
        setTimeout(() => {
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
    else if (element==='project') setProjectMS(isMouseOver);
    else if (element==='github') setGithubMS(isMouseOver);
    else if (element==='web') setWebMS(isMouseOver);
  };

  const handleDarkModeChange = (toggle: boolean) => {
    setIsDark(toggle);
    document.body.classList.toggle('dark');
    document.querySelector('html')?.classList.toggle('dark');
  };

  const showDialog = () => {
    const dialog = document.querySelector('#info_bg');
    dialog?.classList.remove('close');
    dialog?.classList.remove('closing');
    dialog?.classList.add('open');
  }
  const hideDialog = () => {
    const dialog = document.querySelector('#info_bg');
    dialog?.classList.remove('open');
    dialog?.classList.add('closing');
    setTimeout(() => {
      dialog?.classList.remove('closing');
      dialog?.classList.add('close');
    },300);
  }

  useEffect(() => {
    showContact && checkElements('contact', 'show');
  },[showContact]);

  return (
    <>
    {loading ? (
      <div className={`loader-bg ${appClassName}`}>
        <Loader isDark={isDark} />
        {/* <p className='loader-txt'>LR</p> */}
      </div>
      ) : (
      <div id='App' className={`App ${appClassName}`}>
        <MouseTracker 
          size={40} 
          sizeSmall={8} 
          contactMS={contactMS}
          contactOptsMS={contactOptsMS}
          projectMS={projectMS}
          githubMS={githubMS}
          webMS={webMS}
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
          showDialog={showDialog}
        />
        <About isDark={isDark} hideApp={hideApp} />
        <Projects isDark={isDark} hideApp={hideApp} 
          handleContactMouseOverChange={handleContactMouseOverChange}
        />
        <Info isDark={isDark} hideDialog={hideDialog} handleContactMouseOverChange={handleContactMouseOverChange} />
      </div>
      )}
    </>
  );
}

export default App;
