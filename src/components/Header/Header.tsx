import './Header.scss';
import { MdOutlineDarkMode, MdSunny } from 'react-icons/md';
// import useDarkMode from '../../hooks/useDarkMode';

import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';


interface HeaderProps {
  showContact: boolean;
  handleShowContact: () => void;
  handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
  isDark: boolean;
  handleDarkModeChange: (toggle: boolean) => void;
  hideApp: boolean;
}

export default function Header({ showContact, handleShowContact, handleContactMouseOverChange, isDark, handleDarkModeChange, hideApp }: HeaderProps) {

  const compClassName = isDark ? 'dark' : 'light';

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

  return (
    <div className={`header_container ${compClassName} ${hideApp && 'hidden'}`}>
      <p>L</p>

      <div className="right">
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
                <MdEmail size={22} />
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
              <a href="mailto:rodluisr@gmail.com">
                <MdEmail size={22} />
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
      </div>

    </div>
  );
}
