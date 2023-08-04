import './Info.scss';

import { AiFillCloseCircle } from 'react-icons/ai';

interface InfoProps {
    isDark: boolean;
}

export default function Header({ isDark }: InfoProps) {

  const compClassName = isDark ? 'dark' : 'light';


  return (
    <dialog id='info_container' className={`info_container ${compClassName}`}>
        <div className="content">
            <p>Designed and coded by luisrrv.</p>
            <div className="info-img"></div>
        </div>

        <form method="dialog">
            <button><AiFillCloseCircle size={22} /></button>
        </form>

    </dialog>
  );
}
