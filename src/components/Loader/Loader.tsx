import './Loader.scss';

// import { AiFillCloseCircle } from 'react-icons/ai';

interface LoaderProps {
    isDark: boolean;
    loadingClose: boolean;
}

export default function Header({ isDark, loadingClose }: LoaderProps) {

  const compClassName = isDark ? 'dark' : 'light';
  const closingClassName = loadingClose ? 'closing' : '';


  return (
    <div className={`loader-container ${compClassName} ${closingClassName}`}>
        <div className="loader">
            <span>{'{'}</span><span>{'}'}</span>
        </div>
    </div>
    
  );
}


