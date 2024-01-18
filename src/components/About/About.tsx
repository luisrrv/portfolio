import React, { useState, useEffect } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { PiCardsFill } from 'react-icons/pi';
import { useLanguage } from '../../context/LanguageContext';
import './About.scss';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
// import defaultTranslations  from '../../data/translations/en';

// const getTranslations = (language: string) => {
//   switch (language) {
//     case 'en':
//       return import('../../data/translations/en');
//     case 'es':
//       return import('../../data/translations/es');
//     case 'pt':
//       return import('../../data/translations/pt');
//     case 'ja':
//       return import('../../data/translations/ja');
//     default:
//       return import('../../data/translations/en'); // Fallback to English if language is not recognized
//   }
// };
// import Tilt from 'react-parallax-tilt';
// import { RiUser5Fill } from 'react-icons/ri';
// import hacker from '../../assets/images/menobg.png';
// import hackerShadow from '../../assets/images/menobg_stencil.png';

interface AboutProps {
  isDark: boolean;
  hideApp: boolean;
  aboutMSOn: () => void;
  aboutMSOff: () => void;
  opZero: boolean;
  handleContactMouseOverChange: (isMouseOver: boolean, type: string, element: EventTarget | undefined) => void;
  handleMore: (value: boolean) => void;
  loading: boolean;
  translations: any;
}

export default function About({ isDark, hideApp, aboutMSOn, aboutMSOff, opZero, handleContactMouseOverChange, handleMore, loading, translations }: AboutProps) {
  const compClassName = isDark ? 'dark' : 'light';
  const showClassName = opZero ? 'shw' : '';
  const loadingClass = loading ? 'loading' : '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [style, setStyle] = useState({ opacity: '1' });
  
  const { language } = useLanguage();
  let languageClass = language + ' typewriter' || 'en typewriter';

  // Add event listener on mount and remove it on unmount
  useEffect(() => {
    const jumboBg = document.querySelector('.jumbo');
    if (jumboBg) {
      jumboBg.classList.add('loaded');
      return () => {
        jumboBg.classList.remove('loaded');
      };
    }
  }, []);
  
  useEffect(() => {
    if (!loading) {
      const selfDesc = document.querySelector('.self-desc');
      if (selfDesc) {
        setTimeout(() => {
          selfDesc.classList.add('typewriter');
        },3000);
      }
    }
  }, [loading]);

  // Fade out content on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);

      const maxScroll = 800;
      let opacityValue = 1 - currentPosition / maxScroll;

      if (opacityValue < 0) opacityValue = 0;
      if (currentPosition <= 0) opacityValue = 1;

      opacityValue = parseFloat(opacityValue.toFixed(1));

      setStyle({ opacity: `${opacityValue}` });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Letters Flip (unused)
  // useEffect(() => {
  //   const flipLetters = () => {
  //     const letters = document.querySelectorAll("span.letter.highlight-s:not(.flip)");
  //     if (letters.length >= 3) {
  //       const randomIndex = () => Math.floor(Math.random() * letters.length);

  //       const randomLetterIndexes = new Set<number>();

  //       while (randomLetterIndexes.size < 3) {
  //         randomLetterIndexes.add(randomIndex());
  //       }

  //       const randomLetters = Array.from(randomLetterIndexes).map(index => letters[index] as HTMLElement);

  //       randomLetters[0].classList.add('flip');
  //       randomLetters[0].classList.remove('shw');

  //       setTimeout(() => {
  //         randomLetters[0].classList.remove('flip');
  //       }, 2800);

  //       setTimeout(()=> {
  //         randomLetters[1].classList.add('flip');
  //         randomLetters[1].classList.remove('shw');
  //         setTimeout(() => {
  //           randomLetters[1].classList.remove('flip');
  //         }, 2800);
  //       },1500)

  //       setTimeout(()=> {
  //         randomLetters[2].classList.add('flip');
  //         randomLetters[2].classList.remove('shw');
  //         setTimeout(() => {
  //           randomLetters[2].classList.remove('flip');
  //         }, 2800);
  //       },2000)
  //     }
  //   };
  //   const intervalId = setInterval(flipLetters, 7000); // Run flipLetters every 7 seconds

  //   return () => {
  //     clearInterval(intervalId); // Clean up the interval on unmount
  //   };
  // }, []);


  // Calculate the opacity based on the scroll position (unused)
  // const calculateOpacity = () => {
  //   const maxScroll = window.innerHeight * 1.2; // Adjust the value as needed for the fade-out distance
  //   const opacity = 1 - scrollPosition / maxScroll;
  //   return opacity < 0 ? 0 : opacity; // Make sure opacity doesn't go below 0
  // };

  // // Apply the opacity to the element's style
  // const fadeOutStyle: React.CSSProperties = {
  //   opacity: calculateOpacity(),
  // };

  // const HandleBlurIn = (e:any) => {
  //   if(e) return;
  //   if (e.target.classList.contains('blur-in')) return;
  //   e.target.classList.add('blur-in');
  //   setTimeout(()=>{
  //     e.target.classList.remove('blur-in');
  //   },1000)
  // }
  // const HandleBlurOut = (e:any) => {
  //   if(e) return;
  //   if (e.target.classList.contains('blur-out')) return;
  //   e.target.classList.add('blur-out');
  //   setTimeout(()=>{
  //     e.target.classList.remove('blur-out');
  //   },1000)
  // }

  const handleOnOff = (toggle: string): React.MouseEventHandler<HTMLDivElement> | void => {
    if(toggle==='on') {
      aboutMSOn();
    } else if (toggle==='off') {
      aboutMSOff();
    }
  }
  const handleMouseTrackerEnter = (type:string, element: EventTarget | undefined): any => {
    // setTimeout(() => {
      handleContactMouseOverChange(true, type, element);
    // }, 200);
  };
  const handleMouseTrackerLeave = (type:string, element: EventTarget | undefined): any => {
    // setTimeout(() => {
      handleContactMouseOverChange(false, type, element);
    // }, 200);
  };
  const addIcon = (element: EventTarget) => {
    const el = element as HTMLElement;
    el.classList.add('over');
    // if(el.classList.contains('github')) setGithubIcon(true);
    // else if(el.classList.contains('web')) setWebIcon(true);
  }
  const removeIcon = (element: EventTarget) => {
    const el = element as HTMLElement;
    el.classList.remove('over');
    // if(el.classList.contains('github')) setGithubIcon(false);
    // else if(el.classList.contains('web')) setWebIcon(false);
  }

  if (!translations) {
    // console.log('No translations - waiting...');
    return <div>Loading...</div>;
  }

  return (
    <div
      id='about_container'
      className={`about_container ${compClassName} ${hideApp && 'hidden'}`}
      onMouseEnter={() => handleOnOff('on')}
      onMouseLeave={() => handleOnOff('off')}
      >
      <div className="content" style={style}>
        {/* <div className="me-img"></div> */}

        <div className="special">
          {/* <div className="grain"></div> */}
          <p className={`small hello ${showClassName}`}>{translations.hello}</p>
          {/* <div className='name-img'></div> */}
          {/* <p className={`big first`}>
            <span className='letter faded'>L</span>
            <span className='letter faded'>U</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>S</span>
            <span className={`letter highlight-s ${showClassName}`}>L</span>
            <span className={`letter highlight-s ${showClassName}`}>U</span>
            <span className={`letter highlight-s ${showClassName}`}>I</span>
            <span className={`letter highlight-s ${showClassName}`}>S</span>
            <span className='letter faded'>L</span>
            <span className='letter faded'>U</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>S</span>
            </p> */}
          {/* <p className={`big last`}>
            <span className='letter faded'>U</span>
            <span className='letter faded'>E</span>
            <span className='letter faded'>Z</span>
            <span className={`letter highlight-s ${showClassName}`}>R</span>
            <span className={`letter highlight-s ${showClassName}`}>O <span className="me-img"></span></span>
            <span className={`letter highlight-s ${showClassName}`}>D</span>
            <span className='letter faded'>R</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>G</span>

            <span className='letter faded'>R</span>
            <span className='letter faded'>O</span>
            <span className='letter faded'>D</span>
            <span className={`letter highlight-s ${showClassName}`}>R</span>
            <span className={`letter highlight-s ${showClassName}`}>I</span>
            <span className={`letter highlight-s ${showClassName}`}>G</span>
            <span className='letter faded'>U</span>
            <span className='letter faded'>E</span>
            <span className='letter faded'>Z</span>

            <span className='letter faded'>R</span>
            <span className='letter faded'>I</span>
            <span className='letter faded'>G</span>
            <span className={`letter highlight-s ${showClassName}`}>U</span>
            <span className={`letter highlight-s ${showClassName}`}>E</span>
            <span className={`letter highlight-s ${showClassName}`}>Z</span>
            <span className='letter faded'>R</span>
            <span className='letter faded'>O</span>
            <span className='letter faded'>D</span>
            </p> */}
          <p className={`small name after bold ${showClassName}`}>{language==='ja' ? 'RODRIGUEZ LUIS' : 'LUIS RODRIGUEZ'}{language==='ja' && <span className='after-name'>{translations.hello_after}</span>}</p>
        </div>



        {/* <div className="divider"></div> */}
        {/* <Tilt> */}
          <div className="hacker-cont">
            <img className='hacker shadow' alt="hacker" />
            <img className={`hacker ${showClassName}`} alt="hacker" />
            {/* <p
              className="more"
              onClick={(e) => {handleMore(true); handleMouseTrackerLeave('web',e.target);}}
              onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}}
              onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
            >
              about me <PiCardsFill />
            </p> */}
          </div>
        {/* </Tilt> */}

        <div className={`text ${showClassName}`}>
          {/* < RiUser5Fill size={20} /> */}
          <p className='small name'>
            {/* <span className='typewriter'>
              A <span className='bold'>Software Developer</span> based in Tokyo. <br></br>Experienced in working on both  <span className='bold'>front-end</span> and  <span className='bold'>back-end</span> development for  <span className='bold'>web</span> and <span className='bold'>native apps</span>.
            </span> */}
            <span className={`self-desc ${languageClass} ${loadingClass}`}></span>
            <br></br>
          </p>
          <div 
              className='contact-opts f'
              onMouseEnter={(e) => {handleMouseTrackerEnter('content',e.target)}}
              onMouseLeave={(e) => {handleMouseTrackerLeave('content',e.target)}}
            >
              <a href="https://github.com/luisrrv" target="_blank" rel="noopener noreferrer">
                <BsGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/luisrrv/" target="_blank" rel="noopener noreferrer">
                <BsLinkedin size={18} />
              </a>
              <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%72%6F%64%6C%75%69%73%72%40%67%6D%61%69%6C%2E%63%6F%6D">
                <MdAlternateEmail size={22} />
              </a>
          </div>
          <p
            className="more"
            onClick={(e) => {handleMore(true); handleMouseTrackerLeave('web',e.target);}}
            onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}}
            onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
          >
            {translations.more} <PiCardsFill />
          </p>
          {/* <span
            className="more"
            onClick={(e) => {handleMore(true); handleMouseTrackerLeave('web',e.target);}}
            onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}}
            onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
          >
            more
          </span> */}
        </div>
      </div>
      <a href='#skills' className="scroll-ind">
        <div className='int' style={style}>
          <AiOutlineArrowDown />
        </div>
      </a>
    </div>
  );
}
