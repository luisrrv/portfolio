import React, { useEffect, useState } from 'react';
import useDarkMode from './hooks/useDarkMode';
import { useLanguage } from './context/LanguageContext';
import './App.css';
import './charm.scss';

import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import MouseTracker from './components/MouseTracker/MouseTracker';
import Info from './components/Info/Info';
import More from './components/More/More';

const getTranslations = (language: string) => {
  switch (language) {
    case 'en':
      return import('./data/translations/en');
    case 'es':
      return import('./data/translations/es');
    case 'pt':
      return import('./data/translations/pt');
    case 'ja':
      return import('./data/translations/ja');
    default:
      return import('./data/translations/en'); // Fallback to English if language is not recognized
  }
};

export interface IAppProps {
  className?: string;
  isDarkMode?: boolean;
}


function App({ className, isDarkMode }: IAppProps) {
  const darkMode = useDarkMode();
  const [isDark, setIsDark] = useState(darkMode);
  const appClassName = isDark ? 'dark' : 'light';
  const [loading, setLoading] = useState(true);
  const [loadingClose, setLoadingClose] = useState(false);
  const [opZero, setOpZero] = useState(false);
  const [back, setBack] = useState(false);
  const [hideApp, setHideApp] = useState(true);
  const [hideOverlay, setHideOverlay] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [contactMS, setContactMS] = useState(false);
  const [projectMS, setProjectMS] = useState(false);
  const [aboutMS, setAboutMS] = useState<boolean>(false);
  const [githubMS, setGithubMS] = useState<EventTarget|HTMLElement|boolean>(false);
  const [webMS, setWebMS] = useState<EventTarget|HTMLElement|boolean>(false);
  const [contactOptsMS, setContactOptsMS] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollingTimeout, setScrollingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [more, setMore] = useState(false);
  const [moreOn, setMoreOn] = useState(false);
  const [langBtn, setLangBtn] = useState<boolean>(false);
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    getTranslations(language)
      .then((module) => setTranslations(module.default))
      .catch((error) => console.error('Error loading translations:', error));
  }, [language]);
  
  useEffect(() => {
    // setShowApp(true);
    setTimeout(() => {
      setLoadingClose(true);
    }, 2500);
    setTimeout(() => {
      setHideApp(false);
      setLoading(false);
      setLoadingClose(false);
      setHideOverlay(true);
    }, 2800);
    setTimeout(() => {
      setOpZero(true)
    }, 3200);
    setTimeout(() => {
      setBack(true)
    }, 3600);
  },[]);

  useEffect(() => {
    setIsDark(darkMode);
  },[darkMode]);

  const handleLangBtn = (setting :boolean|undefined = undefined) => {
    if(setting === true || setting === false) setLangBtn(setting);
    else setLangBtn(!langBtn);
  }

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
  const handleMore = (value: boolean) => {
    if (value) {
      setMore(value);
      setTimeout(() => {
        setMoreOn(value);
      }, 300);
    } else {
      setMoreOn(value);
      setTimeout(() => {
        setMore(value);
      }, 300);
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

  if (!translations) {
    // console.log('No translations - waiting...');
    return <div>Loading...</div>;
  }

  return (
    <>
      {loading && (
        <div id='loaderBg' className={`loader-bg ${appClassName}`}>
          <Loader isDark={isDark} loadingClose={loadingClose} />
        </div>
      )}
      <div id='App' className={`App ${appClassName}`} onScroll={() => setScrolling(true)}>
        <div className="jumbo"></div>
        <div className={`app-overlay ${hideOverlay ? 'hide' : ''} ${opZero ? 'op-z' : ''} ${back ? 'bck' : ''}`}></div>
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
          opZero={opZero}
        />
        <About
          isDark={isDark}
          hideApp={hideApp}
          aboutMSOn={aboutMSOn}
          aboutMSOff={aboutMSOff}
          opZero={opZero}
          handleContactMouseOverChange={handleContactMouseOverChange}
          handleMore={handleMore}
          loading={loading}
          translations={translations}
        />
        {more && (
          <More
            isDark={isDark}
            more={more}
            moreOn={moreOn}
            handleMore={handleMore}
            handleContactMouseOverChange={handleContactMouseOverChange}
            translations={translations}
            />
            )}
        <Projects
          isDark={isDark}
          hideApp={hideApp}
          handleContactMouseOverChange={handleContactMouseOverChange}
          scrolling={scrolling}
          translations={translations}
          language={language}
          />
        <Info
          isDark={isDark}
          langBtn= {langBtn}
          handleLangBtn= {handleLangBtn}
          hideDialog={hideDialog}
          handleContactMouseOverChange={handleContactMouseOverChange}
          handleDarkModeChange={handleDarkModeChange}
          handleMore={handleMore}
          translations={translations}
        />
      </div>
    </>
  );
}

export default App;
