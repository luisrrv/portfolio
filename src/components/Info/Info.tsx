/* eslint-disable jsx-a11y/anchor-is-valid */
import './Info.scss';

import { BiLogoGithub, BiLogoFigma, BiLogoReact, BiLogoTypescript, BiLogoNetlify } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai'

interface InfoProps {
    isDark: boolean;
    hideDialog: () => void;
    handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
}

export default function Header({ isDark, hideDialog, handleContactMouseOverChange }: InfoProps) {

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

  return (
    <div id="info_bg" className={`close ${compClassName}`} onClick={hideDialog}>  
        <div id='info_container' className={`info_container ${(window.matchMedia("(any-hover: none)").matches) ? 'mobile' : ''}`}>
          {(window.matchMedia("(any-hover: none)").matches) && <div className="close"><AiOutlineClose size={28} /></div> }
            <div className="content">
                {(window.matchMedia("(any-hover: none)").matches) && (
                  <div className="nav">
                    <a href="#" className="about">About me</a>
                    <a href="#skills" className="skills">Skills</a>
                    <a href="#work" className="work">My work</a>
                    <p className="contact">Contact</p>
                  </div>
                )}
                <p>Designed and coded by <a onMouseEnter={handleMouseEnter('content')} onMouseLeave={handleMouseLeave('content')} className='underline' href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer"><BiLogoGithub />luisrrv</a>.</p>
                <div className="info-img"></div>
                <div className="icons">
                    <BiLogoFigma />
                    <BiLogoReact />
                    <BiLogoTypescript />
                    <BiLogoNetlify />
                </div>
            </div>
        </div>
    </div>
  );
}
