import './ProjectCard.scss';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
// import useDarkMode from '../../hooks/useDarkMode';

//icons
import { BsFillFileEarmarkCodeFill, BsTwitterX } from 'react-icons/bs';
import {MdWeb } from 'react-icons/md'
import {LiaWindowMinimizeSolid, 
        LiaGithub, 
        LiaPlaneSolid,
        LiaRobotSolid,
        LiaRocketchat,
        LiaMapMarkedAltSolid,
        LiaNewspaper,
        LiaPuzzlePieceSolid
      } from 'react-icons/lia'
import { SiRubyonrails, 
        SiPostgresql, 
        SiHeroku, 
        SiReact,
        SiTypescript,
        SiFirebase,
        SiPython,
        SiAmazonaws,
        SiDocker,
        // SiTwitter,
        SiVuedotjs,
        SiJavascript,
        SiGooglechrome,
        SiExpress,
        SiTailwindcss,
        SiSocketdotio,
    } from 'react-icons/si';

interface ProjectCardProps {
  title: string;
  description: string;
  github: string;
  live: string;
  stack: string[] | Element[];
  bg: string;
  pics: string[];
  isDark: boolean; // Add isDark prop to the interface
  hideApp: boolean; // Add hideApp prop to the interface
  handleContactMouseOverChange: (isMouseOver: boolean, type: string, element: EventTarget | undefined) => void;
  scrolling: boolean;
}

export default function ProjectCard({
  title,
  description,
  github,
  live,
  stack,
  bg,
  pics,
  isDark,
  hideApp,
  handleContactMouseOverChange,
  scrolling,
  }: ProjectCardProps) {

    // const [githubIcon,setGithubIcon] = useState<boolean>(false)
    // const [webIcon,setWebIcon] = useState<boolean>(false)
    const [mouseLeave,setMouseLeave] = useState<boolean>(true);
    const mouseLeaveRef = useRef(mouseLeave);
    const { ref, inView } = useInView({
      threshold: 0,
      // triggerOnce: true,
    });
    const inViewClassName = inView ?  'in-v' : 'no-v';

    const setIcons = () => {
        let stackIcons = stack && stack.map((t,index) => {
            switch (t) {
                case 'rails':
                  return <SiRubyonrails key={index} />;
                case 'postgress':
                  return <SiPostgresql key={index} />;
                case 'heroku':
                  return <SiHeroku key={index} />;
                case 'react':
                  return <SiReact key={index} />;
                case 'typescript':
                  return <SiTypescript key={index} />;
                case 'expressjs':
                  return <SiExpress key={index} />;
                case 'socketio':
                  return <SiSocketdotio key={index} />;
                case 'tailwind':
                  return <SiTailwindcss key={index} />;
                case 'firebase':
                  return <SiFirebase key={index} />;
                case 'python':
                  return <SiPython key={index} />;
                case 'aws':
                  return <SiAmazonaws key={index} />;
                case 'docker':
                  return <SiDocker key={index} />;
                case 'twitter':
                  return <BsTwitterX key={index} />;
                case 'vue':
                  return <SiVuedotjs key={index} />;
                case 'javascript':
                  return <SiJavascript key={index} />;
                case 'chrome':
                  return <SiGooglechrome key={index} />;
                default:
                  return <BsFillFileEarmarkCodeFill key={index} />;
              }
        });
        return stackIcons;
    }

    const compClassName = isDark ? 'dark' : 'light';
    const cardTitleClass = title.split(' ')[0];
    let ctaText = 'Website';
    if (title === 'Travel Journal') ctaText = 'Journal';
    else if (title === 'Bicho Bot (X/Twitter Bot)') ctaText = "Bot's profile";
    else if (title === 'Web Chat App') ctaText = 'Chat!';
    else if (title === 'Ally Maps') ctaText = 'Check it out';
    else if (title === 'News Feed') ctaText = 'Browse';
    else if (title === 'Rubber Ducking') ctaText = 'Try it!';

    const addClassWithTimeout = (element: EventTarget | null, className: string, timeout: number = 0) => {
      if (element) {
        const el = element as HTMLElement;
        
        setTimeout(() => {
          // if (scrolling) return;
          // if (mouseLeaveRef.current) return;

          el.classList.add(className);
        }, timeout);
      }
    };
    
    const handleOpenCard = (element: EventTarget | null, depth: number = 0): void => {
      if (!element || depth > 5) {
        return;
      }
      setMouseLeave(false);
      mouseLeaveRef.current = false;
      
      const el = element as HTMLElement;
      // handleCloseCards();
      
      if (el.classList.contains('open-card')) {
          addClassWithTimeout(el, 'selected', 0);
          addClassWithTimeout(el, 'cta', 600);
        // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        //   if (!scrolling) {
        //   }
        // }
        // else{
        //   if (!scrolling) {
        //     addClassWithTimeout(el, 'selected', 800);
        //     addClassWithTimeout(el, 'cta', 1400);
        //   }
        // }
    
        const cover: HTMLElement | null = el.previousSibling as HTMLElement;
        if (cover) {
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            if (!scrolling) {
              if (mouseLeaveRef.current) return;
              cover.classList.add('off');
              cover.classList.remove('on');
            }
          }
          else{
            if (!scrolling) {
              setTimeout(() => {
                if (mouseLeaveRef.current) return;
                cover.classList.add('off');
                cover.classList.remove('on');
              }, 800);
            }
          }
        }
      } else {
        handleOpenCard(el.parentElement, depth + 1);
        handleCloseCards(element);
      }
    };

    const handleCloseCards = (element: EventTarget | null, depth: number = 0): void => {
      if (!element || depth > 5) {
        return;
      }

      const closeCards = (cElement: HTMLElement) => {
        const openCards: NodeListOf<Element> = document.querySelectorAll('.open-card');
        const cardsArray: Element[] = Array.from(openCards);
        const selected = cardsArray.find(card => card.classList.contains('selected'));

        if (openCards && openCards.length > 0) {
          [].forEach.call(openCards, (card: HTMLElement) => {
            if (card === cElement && selected) {
              // do nothing
            }
            else {
              card.classList.remove('selected');
              card.classList.remove('cta');
            }
            const cover: HTMLElement|undefined = card.previousSibling ? card.previousSibling as HTMLElement : undefined;
            cover?.classList.remove('off');
            cover?.classList.add('on');
          })
        }
      }

      const el = element as HTMLElement;
      let clickedEl: string|HTMLElement = '';

      if (el.classList.contains('open-card')) {
        clickedEl = el;
        closeCards(clickedEl);

      } else {
        handleCloseCards(el.parentElement, depth + 1);
      }
    }

    const closeAll = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      event.preventDefault();
      event.stopPropagation();

      const openCards: NodeList = document.querySelectorAll('.open-card');
      if (openCards && openCards.length > 0) {
        [].forEach.call(openCards, (card: HTMLElement) => {
          card.classList.remove('selected');
          card.classList.remove('cta');
          const cover: HTMLElement|undefined = card.previousSibling ? card.previousSibling as HTMLElement : undefined;
          cover?.classList.remove('off');
          cover?.classList.add('on');
        })
      }
    }

    const handleMouseTrackerEnter = (type:string, element: EventTarget | undefined): any => {
      const el = element as HTMLElement;
      if (!element || el.classList.contains('selected') || el.classList.contains('github') || el.classList.contains('web')) {
        handleContactMouseOverChange(true, type, element);
      } 
    };
    const handleMouseTrackerLeave = (type:string, element: EventTarget | undefined): any => {
      handleContactMouseOverChange(false, type, undefined);
    };

    const getIcon = () => {
      if (ctaText==='Journal') return <LiaPlaneSolid />;
      else if (ctaText==="Bot's profile") return <LiaRobotSolid />;
      else if (ctaText==='Chat!') return <LiaRocketchat />;
      else if (ctaText==='Check it out') return <LiaMapMarkedAltSolid />;
      else if (ctaText==='Browse') return <LiaNewspaper />;
      else if (ctaText==='Try it!') return <LiaPuzzlePieceSolid />;
      else return <MdWeb />;
    }

    // const addIcon = (element: EventTarget) => {
    //   const el = element as HTMLElement;
    //   el.classList.add('over');
    //   if(el.classList.contains('github')) setGithubIcon(true);
    //   else if(el.classList.contains('web')) setWebIcon(true);
    // }
    // const removeIcon = (element: EventTarget) => {
    //   const el = element as HTMLElement;
    //   el.classList.remove('over');
    //   if(el.classList.contains('github')) setGithubIcon(false);
    //   else if(el.classList.contains('web')) setWebIcon(false);
    // }

  return (
    <div 
      id='card' 
      className={`card ${cardTitleClass} ${compClassName} ${hideApp ? 'hidden' : ''} ${scrolling ? 'scrolling' : ''}`}
      >
      <div 
        ref={ref} 
        className={`card-cover on ${inViewClassName}`}
        // style={isDark ? {backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${bg})`} : {backgroundImage:`linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.7)), url(${bg})`}}
      >
        <div className='name-container'>
            <p>{title}
            <span className={`stack`}>
                    {setIcons().map((icon) => icon)}
            </span>
            </p>
        </div>
        {/* <div className='project-pics'>
            {
                pics.length > 0 ? (
                    pics.map((pic,index) => (
                        <img
                        key={index}
                          className={`pic ${pic.includes('wide') && 'wide'}`} 
                          src={pic} 
                          alt=""
                          />
                      ))
                ) : <img className='pic' src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/01/become-web-developer.jpg" alt="" />
            }
          </div> */}
      </div>
      <div className="open-card"
        style={isDark ? {backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${bg})`} : {backgroundImage:`linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.7)), url(${bg})`}}
        onMouseEnter={(e) => {handleMouseTrackerEnter('project', undefined);}}
        onMouseLeave={(e) => {handleMouseTrackerLeave('project', e.target);}}
        onClick={(e) => {handleOpenCard(e.target); handleMouseTrackerEnter('project', undefined);}}
        >
        <div className="grain"></div>
        <div className="minimize">
          <p onClick={(e) => closeAll(e)}><LiaWindowMinimizeSolid size={20} /></p>
        </div>
        <h4 className='project-title'>{title}</h4>
        <div className="content">
          <div className="project-info">
            <p>{description}</p>
            <div className='more'>
              <div className={`stack`}>
                  {setIcons().map((icon) => icon)}
              </div>
              <div className={`cta`}>
                  {
                    (title === 'News Feed' || title === 'Ally Maps') ? (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a 
                        className='web disabled' 
                        href={live} 
                        onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target);}} 
                        onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target);}}
                        >
                          <p className="svg">
                            {getIcon()}
                            {ctaText}
                          </p>
                      </a>
                    ) : (
                      <a 
                        className='web' 
                        href={live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target);}} 
                        onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target);}}
                        >
                          <p className="svg">
                            {getIcon()}
                            {ctaText}
                          </p>
                      </a>
                    )
                  }
                  <a 
                    className='github' 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onMouseEnter={(e)=>{handleMouseTrackerEnter('github',e.target);}} 
                    onMouseLeave={(e)=>{handleMouseTrackerLeave('github',e.target);}}
                    >
                      <p className="svg">
                        <LiaGithub />
                        Code
                      </p>
                  </a>
              </div>
              <div className='project-pics'>
                {
                    pics.length > 0 ? (
                        pics.map((pic,index) => (
                            <img
                            key={index}
                              className={`pic ${pic.includes('wide') ? 'wide' : ''} ${pic.includes('chat1') ? 'chat1' : ''}`} 
                              src={pic} 
                              alt=""
                              />
                          ))
                    ) : <img className='pic' src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/01/become-web-developer.jpg" alt="" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
