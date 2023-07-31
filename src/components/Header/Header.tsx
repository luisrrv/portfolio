import './Header.scss';
import { MdOutlineDarkMode, MdSunny } from 'react-icons/md';
import useDarkMode from '../../hooks/useDarkMode'; // Import the custom hook

interface HeaderProps {
  showContact: boolean;
  handleShowContact: () => void;
  handleContactMouseOverChange: (isMouseOver: boolean) => void;
}

export default function Header({ showContact, handleShowContact, handleContactMouseOverChange }: HeaderProps) {
  const isDarkMode = useDarkMode(); // Use the custom hook to get the dark mode state

  const compClassName = isDarkMode ? 'dark' : 'light';

  const changeMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  const handleMouseEnter = () => {
    setTimeout(()=> {
      handleContactMouseOverChange(true);
    },200);
  };

  const handleMouseLeave = () => {
    setTimeout(()=> {
      handleContactMouseOverChange(false);
    },200);
  };


  return (
    <div className={`header_container ${compClassName}`}>
      <p>Header</p>

      <div className="right">
        <button 
        onClick={() => { handleShowContact(); }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >Contact</button>
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
