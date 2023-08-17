import './ProjectCard.scss';
import { useState } from 'react';
// import useDarkMode from '../../hooks/useDarkMode';

//icons
import { BsFillFileEarmarkCodeFill, BsGithub } from 'react-icons/bs';
import {MdWeb } from 'react-icons/md'
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
  }: ProjectCardProps) {

    const [githubIcon,setGithubIcon] = useState<boolean>(false)
    const [webIcon,setWebIcon] = useState<boolean>(false)

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

    const handleMouseEnter = (e: any): void => {
      setTimeout(() => {
        const target: HTMLInputElement = e.target; 
        if (target.classList.contains('open-card')) {
          target.classList.add('selected');
          const cover: HTMLElement|undefined = target.previousSibling ? target.previousSibling as HTMLElement : undefined;
          cover?.classList.add('off');
        } else {
          if(target.parentElement && target.parentElement.classList.contains('open-card')) {
            target.parentElement.classList.add('selected');
            const cover: HTMLElement|undefined = target.parentElement.previousSibling ? target.parentElement.previousSibling as HTMLElement : undefined;
            cover?.classList.add('off');
          } else {
            if(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement.classList.contains('open-card')) {
              target.parentElement.parentElement.classList.add('selected');
              const cover: HTMLElement|undefined = target.parentElement.parentElement.previousSibling ? target.parentElement.parentElement.previousSibling as HTMLElement : undefined;
              cover?.classList.add('off');
            } else {
              if(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement.parentElement && target.parentElement.parentElement.parentElement.classList.contains('open-card')) {
                target.parentElement.parentElement.parentElement.classList.add('selected');
                const cover: HTMLElement|undefined = target.parentElement.parentElement.parentElement.previousSibling ? target.parentElement.parentElement.parentElement.previousSibling as HTMLElement : undefined;
                cover?.classList.add('off');
              } else {
                if(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement.parentElement && target.parentElement.parentElement.parentElement.parentElement && target.parentElement.parentElement.parentElement.parentElement.classList.contains('open-card')) {
                  target.parentElement.parentElement.parentElement.parentElement.classList.add('selected');
                  const cover: HTMLElement|undefined = target.parentElement.parentElement.parentElement.parentElement.previousSibling ? target.parentElement.parentElement.parentElement.parentElement.previousSibling as HTMLElement : undefined;
                  cover?.classList.add('off');
                } else {
                  return
                }
              }
            }
          }
        }
      },300);
    }
    const handleMouseLeave = (): void => {
      const openCards: NodeList = document.querySelectorAll('.open-card');
      if (openCards && openCards.length > 0) {
        [].forEach.call(openCards, (card: HTMLElement) => {
          if (card.classList.contains('selected'))  {
            card.classList.remove('selected');
            const cover: HTMLElement|undefined = card.previousSibling ? card.previousSibling as HTMLElement : undefined;
            cover?.classList.remove('off');
          }
          
        })
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
      if(el.classList.contains('github')) setGithubIcon(true);
      else if(el.classList.contains('web')) setWebIcon(true);
    }
    const removeIcon = (element: EventTarget) => {
      const el = element as HTMLElement;
      if(el.classList.contains('github')) setGithubIcon(false);
      else if(el.classList.contains('web')) setWebIcon(false);
    }

  return (
    <div id='card' className={`card ${compClassName} ${hideApp && 'hidden'}`}>
      <div className={`card-cover`}>
        <div className='name-container'>
            <p>{title}
            <span className={`stack`}>
                    {setIcons().map((icon) => icon)}
            </span>
            </p>
        </div>
        <div className='project-pics'>
            {
                pics.length > 0 ? (
                    pics.map((pic,index) => (
                        <img
                        key={index}
                          className='pic' 
                          src={pic} 
                          alt=""
                          />
                      ))
                ) : <img className='pic' src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/01/become-web-developer.jpg" alt="" />
            }
          </div>
      </div>
      <div className="open-card"
        style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${bg})`}}
        onMouseEnter={(e) => {handleMouseEnter(e); handleMouseTrackerEnter('project', undefined);}}
        onMouseLeave={() => {handleMouseLeave(); handleMouseTrackerLeave('project', undefined);}}
        >
        <h4 className='project-title'>{title}</h4>
        <div className="content">
          {/* <div className='project-pics'>
            {
                pics.length > 0 ? (
                    pics.map((pic,index) => (
                        <img
                        key={index}
                          className='pic' 
                          src={pic} 
                          alt=""
                          />
                      ))
                ) : <img className='pic' src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/01/become-web-developer.jpg" alt="" />
            }
          </div> */}

          <div className="project-info">
            <p>{description}</p>
            <div>
              <div className={`stack`}>
                  {setIcons().map((icon) => icon)}
              </div>
              <div className={`cta`}>
                  <a className='github' href={github} target="_blank" rel="noopener noreferrer" onMouseEnter={(e)=>{handleMouseTrackerEnter('github',e.target); addIcon(e.target);}} onMouseLeave={(e)=>{handleMouseTrackerLeave('github',e.target); removeIcon(e.target)}}>{githubIcon ? <BsGithub /> : 'GitHub'}</a>
                  <a className='web' href={live} target="_blank" rel="noopener noreferrer" onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}} onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}>{webIcon ? <MdWeb /> : 'Check it out'}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
