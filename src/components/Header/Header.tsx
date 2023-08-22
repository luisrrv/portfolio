import { useState, useEffect } from 'react';
import './Header.scss';
import { MdOutlineDarkMode, MdSunny } from 'react-icons/md';
// import useDarkMode from '../../hooks/useDarkMode';

import { BsGithub, BsLinkedin, BsInfoCircle } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';


interface HeaderProps {
  showContact: boolean;
  handleShowContact: () => void;
  handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
  isDark: boolean;
  handleDarkModeChange: (toggle: boolean) => void;
  hideApp: boolean;
  showDialog: () => void;
  aboutMS: boolean;
  aboutMSOn: () => void;
  aboutMSOff: () => void;
}

export default function Header({ showContact, handleShowContact, handleContactMouseOverChange, isDark, handleDarkModeChange, hideApp, showDialog, aboutMS, aboutMSOn, aboutMSOff }: HeaderProps) {

  const compClassName = isDark ? 'dark' : 'light';
  const [isScrolled, setIsScrolled] = useState(false);

  // Update isScrolled state based on scroll position
  const handleScroll = () => {
    const scrollThreshold = window.innerHeight; // Set the threshold scroll height here
    const scrolled = window.scrollY >= scrollThreshold;
    setIsScrolled(scrolled);
  };

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const changeMode = () => {
    handleDarkModeChange(!isDark);
  };

  const handleMouseEnter = (element: string): React.MouseEventHandler<HTMLElement> => () => {
    setTimeout(() => {
      handleContactMouseOverChange(true, element);
    }, 200);
  };
  
  const handleMouseLeave = (element: string): React.MouseEventHandler<HTMLElement> => () => {
    setTimeout(() => {
      handleContactMouseOverChange(false, element);
    }, 200);
  };

  const handleOnOff = (toggle: string): React.MouseEventHandler<HTMLDivElement> | void => {
    if (!aboutMS ) return;
    if(toggle==='on') {
      aboutMSOn();
    } else if (toggle==='off') {
      aboutMSOff();
    }
  }

  return (
    <div 
      id='header_container' 
      className={`header_container ${compClassName} ${hideApp && 'hidden'}`}
      onMouseEnter={() => handleOnOff('on')}
      onMouseLeave={() => handleOnOff('off')}
      >
      <div className={`header-logo ${isScrolled ? 'show' : ''}`}>LR</div>

      <div className={`header-right ${isScrolled ? 'show' : ''}`}>
        <div className="contact-opts-m">
          {showContact && (
            <div 
              className="contact-opts out"
              onMouseEnter={handleMouseEnter('content')}
              onMouseLeave={handleMouseLeave('content')}
            >
              <a href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer">
                <BsGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/luisrrv/" target="_blank" rel="noopener noreferrer">
                <BsLinkedin size={18} />
              </a>
              <a href="mailto:rodluisr@gmail.com">
                <MdAlternateEmail size={22} />
              </a>
            </div>
          )}
        </div>
        <div className="contact-m hidden">
          {showContact ? (
              <button 
              className='open'
              onClick={() => { handleShowContact(); }}
              onMouseEnter={handleMouseEnter('btn')}
              onMouseLeave={handleMouseLeave('btn')}
              ><AiOutlineClose size={16} /></button>
            ): (
              <button 
              className='closed'
              onClick={() => { handleShowContact(); }}
              onMouseEnter={handleMouseEnter('btn')}
              onMouseLeave={handleMouseLeave('btn')}
              >Contact</button>
            )
          }
        </div>
        <div 
              className="contact-opts f"
              onMouseEnter={handleMouseEnter('content')}
              onMouseLeave={handleMouseLeave('content')}
            >
              <a href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer">
                <BsGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/luisrrv/" target="_blank" rel="noopener noreferrer">
                <BsLinkedin size={18} />
              </a>
              <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%72%6F%64%6C%75%69%73%72%40%67%6D%61%69%6C%2E%63%6F%6D">
                <MdAlternateEmail size={22} />
              </a>
        </div>
        <div className="divider"></div>
        {isDark ? (
          <div className="toggle">
            <MdSunny onClick={changeMode} />
          </div>
        ) : (
          <div className="toggle">
            <MdOutlineDarkMode onClick={changeMode} />
          </div>
        )}
        <BsInfoCircle className='info'  size={13} onClick={showDialog}/>
      </div>

    </div>
  );
}
