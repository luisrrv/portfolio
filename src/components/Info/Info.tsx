/* eslint-disable jsx-a11y/anchor-is-valid */
import './Info.scss';

import { useState } from 'react';
import { BiLogoFigma, BiLogoReact, BiLogoTypescript, BiSolidBriefcaseAlt, BiSolidBrain, BiLogoGithub } from 'react-icons/bi';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { RiUser5Fill } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { CgDarkMode } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai'
import { LiaLanguageSolid } from 'react-icons/lia'
import LanguageSwitcher from '../../components/Language/LanguageSwitcher'

interface InfoProps {
    isDark: boolean;
    langBtn: boolean;
    handleLangBtn: (setting: boolean|undefined) => void;
    hideDialog: () => void;
    showSection: (e: any, section: string) => void;
    handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
    handleDarkModeChange: (toggle: boolean) => void;
    handleMore: (value: boolean) => void;
    translations: any;
}

export default function Header({ isDark, langBtn, handleLangBtn, hideDialog, showSection, handleContactMouseOverChange, handleDarkModeChange, handleMore, translations }: InfoProps) {
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
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [languageSwitcherClosed, setLanguageSwitcherClosed] = useState<boolean>(false);

  const handleLanguageSwitcherClose = (closeSwitcher: boolean) => {
    setLanguageSwitcherClosed(closeSwitcher);
  };

  return (
    <div id="info_bg" className={`close ${compClassName}`} onClick={handleBackgroundClick}>  
        <div id='info_container' className={`info_container ${(window.matchMedia("(any-hover: none)").matches) ? 'mobile' : ''}`}>
            <div className="toggles">
              {isDark ? (
                <div className="toggle dm"><CgDarkMode className='invert' size={25} onClick={() => changeMode()} /></div> 
              ) : (
                <div className="toggle dm"><CgDarkMode size={25} onClick={() => changeMode()} /></div> 
              )}
              <div className="toggle lang"><LiaLanguageSolid size={28} onClick={e => handleLangBtn(undefined)} /></div> 
              <div className="close"><AiOutlineClose size={28} onClick={hideDialog} /></div> 
            </div>
            <div className="content">
                {langBtn && <LanguageSwitcher onCloseSwitcher={handleLanguageSwitcherClose} />}
                <div className="nav">
                  <a href="#" className="about" onClick={() => {hideDialog(); handleMore(true);}}><RiUser5Fill />{translations.about_me}</a>
                  <a href="#" className="skills" onClick={(e) => {hideDialog(); showSection(e,'skills');}}><BiSolidBrain />{translations.info_skills}</a>
                  <a href="#" className="work" onClick={(e) => {hideDialog(); showSection(e, 'work');}}><BiSolidBriefcaseAlt />{translations.projects_title}</a>
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
                        <MdAlternateEmail />{translations.send_email}
                    </a>

                  </div>
                </div>
                <div className="icons">
                    <div className="info-img"></div>
                    <div className='divider'>|</div>
                    <BiLogoFigma />
                    <BiLogoReact />
                    <BiLogoTypescript />
                    <BiLogoGithub />
                </div>
                <p>{translations.info_footer}<a onMouseEnter={handleMouseEnter('content')} onMouseLeave={handleMouseLeave('content')} className='underline' href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer">{translations.info_footer_me}</a>.</p>
            </div>
        </div>
    </div>
  );
}
