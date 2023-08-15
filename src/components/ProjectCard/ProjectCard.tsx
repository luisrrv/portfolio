import './ProjectCard.scss';
// import { useState } from 'react';
// import useDarkMode from '../../hooks/useDarkMode';

//icons
import { BsFillFileEarmarkCodeFill } from 'react-icons/bs';
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
        } else {
          if(target.parentElement && target.parentElement.classList.contains('open-card')) {
            target.parentElement.classList.add('selected');
          } else {
            if(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement.classList.contains('open-card')) {
              target.parentElement.parentElement.classList.add('selected');
            } else {
              if(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement.parentElement && target.parentElement.parentElement.parentElement.classList.contains('open-card')) {
                target.parentElement.parentElement.parentElement.classList.add('selected');
              } else {
                if(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement.parentElement && target.parentElement.parentElement.parentElement.parentElement && target.parentElement.parentElement.parentElement.parentElement.classList.contains('open-card')) {
                  target.parentElement.parentElement.parentElement.parentElement.classList.add('selected');
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
          card.classList.contains('selected') && card.classList.remove('selected');
        })
      }
    }

    const handleMouseTrackerEnter = (type:string, element: EventTarget | undefined): any => {
      setTimeout(() => {
        handleContactMouseOverChange(true, type, element);
      }, 200);
    };
    const handleMouseTrackerLeave = (type:string, element: EventTarget | undefined): any => {
      setTimeout(() => {
        handleContactMouseOverChange(false, type, element);
      }, 200);
    };

  return (
    <div id='card' className={`card ${compClassName} ${hideApp && 'hidden'}`}>
      <div className={`card-cover`} style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${bg})`}}>
            <p>{title}
            <span className={`stack`}>
                    {setIcons().map((icon) => icon)}
            </span>
            </p>
      </div>
      <div className="open-card"
        onMouseEnter={(e) => {handleMouseEnter(e); handleMouseTrackerEnter('project', undefined);}}
        onMouseLeave={() => {handleMouseLeave(); handleMouseTrackerLeave('project', undefined);}}
        >
        <h4 className='project-title'>{title}</h4>
        <div className="content">
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

          <div className="project-info">
            <p>{description}</p>
            <div>
              <div className={`stack`}>
                  {setIcons().map((icon) => icon)}
              </div>
              <div className={`cta`}>
                  <a href={github} target="_blank" rel="noopener noreferrer" onMouseEnter={(e)=>{handleMouseTrackerEnter('github',e.target)}} onMouseLeave={(e)=>{handleMouseTrackerLeave('github',e.target)}}>GitHub</a>
                  <a href={live} target="_blank" rel="noopener noreferrer" onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target)}} onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target)}}>Check it out</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
