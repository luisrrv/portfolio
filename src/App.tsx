import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './charm.scss';
import Reflect from './pages/Reflect';
import { LanguageProvider } from './context/LanguageContext';
import Main from './pages/Main';

export interface IAppProps {
  className?: string;
  isDarkMode?: boolean;
}

function App({ className, isDarkMode }: IAppProps) {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
            <LanguageProvider>
              <Main />
            </LanguageProvider>
          } />
        <Route path="/reflect" element={<Reflect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
