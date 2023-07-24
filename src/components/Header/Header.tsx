import './Header.scss';

interface HeaderProps {
    showProjects: boolean;
    showContact: boolean;
    handleShowProjects: () => void;
    handleShowContact: () => void;
    // handleSetPClass: () => void;
    // handleSetCClass: () => void;
  }
  
  export default function Header({ showProjects, showContact, handleShowProjects, handleShowContact }: HeaderProps) {
    // Other parts of the component
  
    return (
      <div className="header_container">
        <p>Header</p>
  
        <button onClick={()=> {handleShowProjects();}}>Projects</button>
        <button onClick={()=> {handleShowContact();}}>Contact</button>
  
      </div>
    );
  }