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
  const [aboutMS, setAboutMS] = useState<boolean>(false);
  const [githubMS, setGithubMS] = useState<EventTarget|HTMLElement|boolean>(false);
  const [webMS, setWebMS] = useState<EventTarget|HTMLElement|boolean>(false);
  const [contactOptsMS, setContactOptsMS] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollingTimeout, setScrollingTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const handleContactMouseOverChange = (isMouseOver: boolean, type: string, element: EventTarget | undefined = undefined) => {
    if (type==='btn') {
      setContactMS(isMouseOver);
    } else if (type==='content') {
      setContactOptsMS(isMouseOver);
    } else if (type==='project') {
      setProjectMS(isMouseOver);
    } else if (type==='github') {
      if (element) {
       if (isMouseOver===true) {
         setGithubMS(element);
       } else {
        setGithubMS(isMouseOver);
       }
      } else {
        setGithubMS(isMouseOver);
      }
    } else if (type==='web') {
      if (element) {
       if (isMouseOver===true) {
         setWebMS(element);
       } else {
        setWebMS(isMouseOver);
       }
      } else {
        setWebMS(isMouseOver);
      }
    }
  };

  const aboutMSOn = () => {
    setAboutMS(true);
  }
  const aboutMSOff = () => {
    setAboutMS(false);
  }

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
    const handleScroll = () => {
      setScrolling(true);

      // Clear the previous timeout (if any) to avoid premature reset
      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout);
      }

      // Set a new timeout to reset the scrolling state
      const newScrollingTimeout = setTimeout(() => {
        setScrolling(false);
      }, 200); // Adjust the delay as needed

      setScrollingTimeout(newScrollingTimeout);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout);
      }
    };
  }, [scrollingTimeout]);

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
      <div id='App' className={`App ${appClassName}`} onScroll={() => setScrolling(true)}>
        <MouseTracker 
          size={60} 
          sizeSmall={12} 
          contactMS={contactMS}
          contactOptsMS={contactOptsMS}
          projectMS={projectMS}
          githubMS={githubMS}
          webMS={webMS}
          isDark={isDark}
          handleDarkModeChange={handleDarkModeChange}
          scrolling={scrolling}
          aboutMS={aboutMS}
        />
        <Header
          hideApp={hideApp}
          showContact={showContact}
          handleShowContact={handleShowContact}
          handleContactMouseOverChange={handleContactMouseOverChange}
          isDark={isDark}
          handleDarkModeChange={handleDarkModeChange}
          showDialog={showDialog}
          aboutMS={aboutMS}
          aboutMSOn={aboutMSOn} 
          aboutMSOff={aboutMSOff}
        />
        <About 
          isDark={isDark} 
          hideApp={hideApp} 
          aboutMSOn={aboutMSOn} 
          aboutMSOff={aboutMSOff} 
        />
        <Projects 
          isDark={isDark} 
          hideApp={hideApp} 
          handleContactMouseOverChange={handleContactMouseOverChange}
          scrolling={scrolling}

        />
        <Info isDark={isDark} hideDialog={hideDialog} handleContactMouseOverChange={handleContactMouseOverChange} />
      </div>
      )}
    </>
  );
}

export default App;
