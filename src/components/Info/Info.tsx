import './Info.scss';

import { BiLogoFigma, BiLogoReact, BiLogoTypescript } from 'react-icons/bi';

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
        <div id='info_container' className='info_container'>
            <div className="content">
                <p>Designed and coded by <a onMouseEnter={handleMouseEnter('content')} onMouseLeave={handleMouseLeave('content')} className='underline' href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer">luisrrv</a>.</p>
                <div className="icons">
                    <BiLogoFigma />
                    <BiLogoReact />
                    <BiLogoTypescript />
                </div>
                <div className="info-img"></div>
            </div>
            {/* <button onClick={hideDialog}><AiFillCloseCircle size={22} /></button> */}
        </div>
    </div>
  );
}
