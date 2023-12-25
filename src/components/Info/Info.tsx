/* eslint-disable jsx-a11y/anchor-is-valid */
import './Info.scss';

import { BiLogoFigma, BiLogoReact, BiLogoTypescript, BiSolidBriefcaseAlt, BiSolidBrain, BiLogoGithub } from 'react-icons/bi';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { RiUser5Fill } from 'react-icons/ri';
import { MdOutlineDarkMode, MdSunny, MdAlternateEmail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai'

interface InfoProps {
    isDark: boolean;
    hideDialog: () => void;
    handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
    handleDarkModeChange: (toggle: boolean) => void;
    handleMore: (value: boolean) => void;
}

export default function Header({ isDark, hideDialog, handleContactMouseOverChange, handleDarkModeChange, handleMore }: InfoProps) {

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
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      hideDialog();
    }
  };

  return (
    <div id="info_bg" className={`close ${compClassName}`} onClick={handleBackgroundClick}>  
        <div id='info_container' className={`info_container ${(window.matchMedia("(any-hover: none)").matches) ? 'mobile' : ''}`}>
            <div className="toggles">
              {isDark ? (
                <div className="toggle dm"><MdSunny size={24} onClick={() => changeMode()} /></div> 
              ) : (
                <div className="toggle dm"><MdOutlineDarkMode size={24} onClick={() => changeMode()} /></div> 
              )}
              <div className="close"><AiOutlineClose size={28} onClick={hideDialog} /></div> 
            </div>
            <div className="content">
                <div className="nav">
                  <a href="#" className="about" onClick={() => {hideDialog(); handleMore(true);}}><RiUser5Fill />About me</a>
                  <a href="#skills" className="skills" onClick={hideDialog}><BiSolidBrain />My skills</a>
                  <a href="#work" className="work" onClick={hideDialog}><BiSolidBriefcaseAlt />Some of my work</a>
                  <div className="ext">
                    <a 
                      href="https://github.com/luisrrv" 
                      target="_blank" 
                      rel="noreferrer"
                      className="contact" 
                      onMouseEnter={handleMouseEnter('content')}
                      onMouseLeave={handleMouseLeave('content')}
                      >
                        <BsGithub />GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/luisrrv/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="contact" 
                      onMouseEnter={handleMouseEnter('content')}
                      onMouseLeave={handleMouseLeave('content')}
                      >
                        <BsLinkedin />LinkedIn
                    </a>
                    <a 
                      href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%72%6F%64%6C%75%69%73%72%40%67%6D%61%69%6C%2E%63%6F%6D" 
                      target="_blank" 
                      rel="noreferrer"
                      className="contact" 
                      onMouseEnter={handleMouseEnter('content')}
                      onMouseLeave={handleMouseLeave('content')}
                      >
                        <MdAlternateEmail />Send me an email
                    </a>

                  </div>
                </div>
                <p>Designed and coded by <a onMouseEnter={handleMouseEnter('content')} onMouseLeave={handleMouseLeave('content')} className='underline' href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer">me</a>.</p>
                <div className="icons">
                    <BiLogoFigma />
                    <BiLogoReact />
                    <BiLogoTypescript />
                    <BiLogoGithub />
                    <div className="info-img"></div>
                </div>
            </div>
        </div>
    </div>
  );
}
