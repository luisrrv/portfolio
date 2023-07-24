import React, { useEffect, useState } from 'react';
import './App.css';

// Import your components
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';

function App() {
  const [showProjectsAndContact, setShowProjectsAndContact] = useState(false);

  const handleShowProjectsAndContact = () => {
    setShowProjectsAndContact(!showProjectsAndContact);
  };

  useEffect(()=>{
    console.log(showProjectsAndContact);
  },[showProjectsAndContact])

  return (
    <div className="App">
      {/* Show the Header component */}
      <Header />

      {/* Show the About component */}
      <About />

      {/* Conditionally show the Projects and Contact components */}
      {showProjectsAndContact && (
        <>
          <Projects />
          <Contact />
        </>
      )}

      {/* Show the button to trigger showing Projects and Contact */}
      {/* {!showProjectsAndContact && ( */}
        <button onClick={handleShowProjectsAndContact}>Projects and Contact</button>
      {/* )} */}
    </div>
  );
}

export default App;
