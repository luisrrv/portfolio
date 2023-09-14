import './ProjectCard.scss';
import { useRef, useState } from 'react';
// import useDarkMode from '../../hooks/useDarkMode';

//icons
import { BsFillFileEarmarkCodeFill, BsGithub } from 'react-icons/bs';
import {MdWeb } from 'react-icons/md'
import {LiaWindowMinimizeSolid } from 'react-icons/lia'
import { SiRubyonrails, 
        SiPostgresql, 
        SiHeroku, 
        SiReact,
        SiTypescript,
        SiFirebase,
        SiPython,
        SiAmazonaws,
        SiDocker,
        SiTwitter,
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
  scrolling
  }: ProjectCardProps) {

    const [githubIcon,setGithubIcon] = useState<boolean>(false)
    const [webIcon,setWebIcon] = useState<boolean>(false)
    const [mouseLeave,setMouseLeave] = useState<boolean>(true);
    const mouseLeaveRef = useRef(mouseLeave);

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
                  return <SiTwitter key={index} />;
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
        handleCloseCards();
      }
    };

    const handleCloseCards = (): void => {
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
      const card = hasParentWithId(el, 'card');
      if (!element || el.classList.contains('selected') || el.classList.contains('github') || el.classList.contains('web')) {
        handleContactMouseOverChange(true, type, element);
      } else if (card && !el.classList.contains('selected')) {
        const cover = card.querySelector('.card-cover.on');
        const elm = cover as HTMLElement;
        // elm.style.cursor = 'pointer';
        handleContactMouseOverChange(true, 'cover', elm);
      }
    };
    const handleMouseTrackerLeave = (type:string, element: EventTarget | undefined): any => {
      handleContactMouseOverChange(false, type, undefined);
      const el = element as HTMLElement;
      const card = hasParentWithId(el, 'card');
      if (card) {
        const cover = card.querySelector('.card-cover.on');
        const elm = cover as HTMLElement;
        // elm.style.cursor = 'default';
        handleContactMouseOverChange(false, 'cover', elm);
      }
    };

    const addIcon = (element: EventTarget) => {
      const el = element as HTMLElement;
      el.classList.add('over');
      if(el.classList.contains('github')) setGithubIcon(true);
      else if(el.classList.contains('web')) setWebIcon(true);
    }
    const removeIcon = (element: EventTarget) => {
      const el = element as HTMLElement;
      el.classList.remove('over');
      if(el.classList.contains('github')) setGithubIcon(false);
      else if(el.classList.contains('web')) setWebIcon(false);
    }

    const hasParentWithId = (element: HTMLElement | null, parentId: string): HTMLElement | false => {
      if (!element) {
        return false;
      }
      if (element.id === parentId) {
        return element;
      }
      return hasParentWithId(element.parentElement, parentId);
    };

  return (
    <div 
      id='card' 
      className={`card ${cardTitleClass} ${compClassName} ${hideApp ? 'hidden' : ''} ${scrolling ? 'scrolling' : ''}`}
      >
      <div className={`card-cover on`}>
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
        onMouseEnter={(e) => {handleMouseTrackerEnter('project', e.target);}}
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
                  <a 
                    className='github' 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onMouseEnter={(e)=>{handleMouseTrackerEnter('github',e.target); addIcon(e.target);}} 
                    onMouseLeave={(e)=>{handleMouseTrackerLeave('github',e.target); removeIcon(e.target)}}
                    >{githubIcon ? <BsGithub /> : 'GitHub'}
                  </a>
                  <a 
                    className='web' 
                    href={live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}} 
                    onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
                    >{webIcon ? <MdWeb /> : ''}
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
