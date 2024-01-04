import React, { useState } from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';

interface LanguageSwitcherProps {
  onCloseSwitcher: (closeSwitcher: boolean) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onCloseSwitcher }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { language, setLanguage } = useLanguage();
  const [closeSwitcher, setCloseSwitcher] = useState<boolean>(false);

  const handleCloseSwitcher = () => {
    if (closeSwitcher) return;
    setCloseSwitcher(true);
    onCloseSwitcher(true);
  };

//   useEffect(() => {
//     console.log(language);
//   }, [language]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as Language);
  };

  return (
    <div className='languages-list'>
      <button onClick={() => { handleLanguageChange('en'); handleCloseSwitcher(); }}>English</button>
      <button onClick={() => { handleLanguageChange('es'); handleCloseSwitcher(); }}>Español</button>
      <button onClick={() => { handleLanguageChange('pt'); handleCloseSwitcher(); }}>Português</button>
      <button onClick={() => { handleLanguageChange('ja'); handleCloseSwitcher(); }}>日本語</button>
    </div>
  );
};

export default LanguageSwitcher;
