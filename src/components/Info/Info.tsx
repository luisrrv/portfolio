import './Info.scss';

// import { AiFillCloseCircle } from 'react-icons/ai';

interface InfoProps {
    isDark: boolean;
    hideDialog: () => void;
}

export default function Header({ isDark, hideDialog }: InfoProps) {

  const compClassName = isDark ? 'dark' : 'light';


  return (
    <div id="info_bg" className={`close ${compClassName}`} onClick={hideDialog}>  
        <div id='info_container' className='info_container'>
            <div className="content">
                <p>Designed and coded by luisrrv.</p>
                <div className="info-img"></div>
            </div>
            {/* <button onClick={hideDialog}><AiFillCloseCircle size={22} /></button> */}
        </div>
    </div>
  );
}
