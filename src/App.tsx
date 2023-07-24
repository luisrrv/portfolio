import React, { useEffect, useState } from 'react';
import './App.css';

// Import your components
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';

export interface IAppProps {
  className?: string;
}

function App({ className }: IAppProps) {
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);
  // const projects = document.querySelector('.projects_container');
  // const contact = document.querySelector('.contact_container');
  
  const checkElements = (element: string, type: string, maxAttempts = 10, interval = 100) => {
    let attempts = 0;
    const checkElement = () => {
      let el = document.querySelector(`.${element}_container`) as HTMLElement | null;
      if (el) {
        setTimeout(() => {
          console.log(element);
          console.log(type);
          if (type === 'show') {
            el && el.classList.remove('out');
            el && el.classList.add('entered');
          } else if (type === 'hide') {
            el && el.classList.remove('entered');
            el && el.classList.add('out');
            setTimeout(()=> {
              setShowProjects(false);
            }, 200)
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

  const handleShowProjects = () => {
    if (showProjects) {
      checkElements('projects','hide');
    } else {
      setShowContact(false);
      setShowProjects((prev) => !prev);
    }
  };
  const handleShowContact = () => {
    if (showContact) {
      checkElements('contact','hide');
    } else {
      setShowProjects(false);
      setShowContact((prev) => !prev);
    }
  };


  useEffect(() => {
    console.log(showProjects);
    showProjects && checkElements('projects', 'show');
    showContact && checkElements('contact', 'show');
  },[showProjects,showContact]);

  return (
    <div className="App">
      <Header
        showProjects={showProjects}
        handleShowProjects={handleShowProjects}
        showContact={showContact}
        handleShowContact={handleShowContact}
      />

      <About />

      {showProjects && (
        <>
          <Projects className={'out'} />
        </>
      )}
      {showContact && (
        <>
          <Contact className={'out'} />
        </>
      )}
    </div>
  );
}

export default App;
