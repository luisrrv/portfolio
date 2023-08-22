import React, { useEffect, useState } from 'react';
import './About.scss';

interface AboutProps {
  isDark: boolean;
  hideApp: boolean;
  aboutMSOn: () => void;
  aboutMSOff: () => void;
}

export default function About({ isDark, hideApp, aboutMSOn, aboutMSOff }: AboutProps) {
  const compClassName = isDark ? 'dark' : 'light';

  const [scrollPosition, setScrollPosition] = useState(0);

  // Update scroll position on scroll
  const handleScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.scrollY);
    });
  };

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const flipLetters = () => {
      const letters = document.querySelectorAll("span.letter.highlight-s:not(.flip)");
      if (letters.length >= 3) {
        const randomIndex = () => Math.floor(Math.random() * letters.length);

        const randomLetterIndexes = new Set<number>();

        while (randomLetterIndexes.size < 3) {
          randomLetterIndexes.add(randomIndex());
        }

        const randomLetters = Array.from(randomLetterIndexes).map(index => letters[index] as HTMLElement);

        randomLetters[0].classList.add('flip');
        setTimeout(() => {
          randomLetters[0].classList.remove('flip');
        }, 1800);

        setTimeout(()=> {
          randomLetters[1].classList.add('flip');
          setTimeout(() => {
            randomLetters[1].classList.remove('flip');
          }, 1800);
        },500)
        
        setTimeout(()=> {
          randomLetters[2].classList.add('flip');
          setTimeout(() => {
            randomLetters[2].classList.remove('flip');
          }, 1800);
        },1000)
      }
    };

    const intervalId = setInterval(flipLetters, 2000); // Run flipLetters every 3 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on unmount
    };
  }, []);


  // Calculate the opacity based on the scroll position
  const calculateOpacity = () => {
    const maxScroll = window.innerHeight * 1.2; // Adjust the value as needed for the fade-out distance
    const opacity = 1 - scrollPosition / maxScroll;
    return opacity < 0 ? 0 : opacity; // Make sure opacity doesn't go below 0
  };

  // Apply the opacity to the element's style
  const fadeOutStyle: React.CSSProperties = {
    opacity: calculateOpacity(),
  };

  const HandleBlurIn = (e:any) => {
    if(e) return;
    if (e.target.classList.contains('blur-in')) return;
    e.target.classList.add('blur-in');
    setTimeout(()=>{
      e.target.classList.remove('blur-in');
    },1000)
  }
  const HandleBlurOut = (e:any) => {
    if(e) return;
    if (e.target.classList.contains('blur-out')) return;
    e.target.classList.add('blur-out');
    setTimeout(()=>{
      e.target.classList.remove('blur-out');
    },1000)
  }

  const handleOnOff = (toggle: string): React.MouseEventHandler<HTMLDivElement> | void => {
    if(toggle==='on') {
      console.log('ABOUT hover on');
      aboutMSOn();
    } else if (toggle==='off') {
      console.log('ABOUT hover off');
      aboutMSOff();
    }
  }

  return (
    <div 
      id='about_container' 
      className={`about_container ${compClassName} ${hideApp && 'hidden'}`}
      onMouseEnter={() => handleOnOff('on')}
      onMouseLeave={() => handleOnOff('off')}
      >
      <div className="content" style={fadeOutStyle}>
        <div className="me-img"></div>
        <div className="special">
          <p className="small hello">HELLO, I'M</p>
          {/* <div className='name-img'></div> */}
          <p className={`big first`}>
            <span className='letter faded'>L</span>
            <span className='letter faded'>U</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>S</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>L</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>U</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>I</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>S</span>
            <span className='letter faded'>L</span>
            <span className='letter faded'>U</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>S</span>
            </p>
          <p className={`big last`}>
            <span className='letter faded'>U</span>
            <span className='letter faded'>E</span>
            <span className='letter faded'>Z</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>R</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>O <span className="me-img"></span></span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>D</span>
            <span className='letter faded'>R</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>G</span>

            <span className='letter faded'>R</span>
            <span className='letter faded'>O</span>
            <span className='letter faded'>D</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>R</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>I</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>G</span>
            <span className='letter faded'>U</span>
            <span className='letter faded'>E</span>
            <span className='letter faded'>Z</span>

            <span className='letter faded'>R</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>G</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>U</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>E</span>
            <span className={`letter highlight-s`} onMouseEnter={(e)=>{HandleBlurOut(e)}} onMouseLeave={(e)=>{HandleBlurIn(e)}}>Z</span>
            <span className='letter faded'>R</span>
            <span className='letter faded'>O</span>
            <span className='letter faded'>D</span>
            </p>
          <p className="small name">LUIS RODRIGUEZ</p>
        </div>
        <div className="divider"></div>
        <div className="text">
          <p>
            A <span className='bold'>Software Developer</span> based in Tokyo. <br></br>Experienced
            in working on both  <span className='bold'>front-end</span> and  <span className='bold'>back-end</span> development for  <span className='bold'>web</span> and <span className='bold'>native apps</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
