import './Header.scss';
import { MdOutlineDarkMode, MdSunny } from 'react-icons/md';
import useDarkMode from '../../hooks/useDarkMode'; // Import the custom hook

import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';


interface HeaderProps {
  showContact: boolean;
  handleShowContact: () => void;
  handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
}

export default function Header({ showContact, handleShowContact, handleContactMouseOverChange }: HeaderProps) {
  const isDarkMode = useDarkMode(); // Use the custom hook to get the dark mode state

  const compClassName = isDarkMode ? 'dark' : 'light';

  const changeMode = () => {
    document.body.classList.toggle('dark-mode');
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
    <div className={`header_container ${compClassName}`}>
      <p>L</p>

      <div className="right">

        {showContact && (
          <div 
            className="contact-opts"
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
        <div className="divider"></div>
        {isDarkMode ? (
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
