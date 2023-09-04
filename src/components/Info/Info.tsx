/* eslint-disable jsx-a11y/anchor-is-valid */
import './Info.scss';

import { BiLogoGithub, BiLogoFigma, BiLogoReact, BiLogoTypescript, BiLogoNetlify } from 'react-icons/bi';
import { MdOutlineDarkMode, MdSunny } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai'

interface InfoProps {
    isDark: boolean;
    hideDialog: () => void;
    handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
    handleDarkModeChange: (toggle: boolean) => void;
}

export default function Header({ isDark, hideDialog, handleContactMouseOverChange, handleDarkModeChange}: InfoProps) {

  const compClassName = isDark ? 'dark' : 'light';

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
  const changeMode = () => {
    handleDarkModeChange(!isDark);
  };

  return (
    <div id="info_bg" className={`close ${compClassName}`} onClick={hideDialog}>  
        <div id='info_container' className={`info_container ${(window.matchMedia("(any-hover: none)").matches) ? 'mobile' : ''}`}>
            <div className="toggles">
              {isDark ? (
                <div className="toggle dm"><MdSunny size={20} onClick={changeMode} /></div> 
              ) : (
                <div className="toggle dm"><MdOutlineDarkMode size={20} onClick={changeMode} /></div> 
              )}
              <div className="close"><AiOutlineClose size={28} /></div> 
            </div>
            <div className="content">
                <div className="nav">
                  <a href="#" className="about">About me</a>
                  <a href="#skills" className="skills">Skills</a>
                  <a href="#work" className="work">My work</a>
                  <p className="contact">Contact</p>
                </div>
                <p>Designed and coded by <a onMouseEnter={handleMouseEnter('content')} onMouseLeave={handleMouseLeave('content')} className='underline' href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer"><BiLogoGithub />luisrrv</a>.</p>
                <div className="icons">
                    <BiLogoFigma />
                    <BiLogoReact />
                    <BiLogoTypescript />
                    <BiLogoNetlify />
                    <div className="info-img"></div>
                </div>
            </div>
        </div>
    </div>
  );
}
