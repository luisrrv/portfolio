import './ProjectCard.scss';
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

    // const isDarkMode = useDarkMode();
    const compClassName = isDark ? 'dark' : 'light';

  return (
    <div id='card' className={`card ${compClassName} ${hideApp && 'hidden'}`} /*style={{background: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${bg})`}}*/ >

      <div className="card-left">
        <h4>{title}</h4>
        <div className='project-pics'>
          {
              pics.length > 0 ? (
                  pics.map((pic) => (
                      <img
                        className='pic' 
                        src={pic} 
                        alt=""
                        />
                    ))
              ) : <img className='pic' src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/01/become-web-developer.jpg" alt="" />
          }
        </div>
      </div>

      <div className="card-right">
        <p>{description}</p>
        <div>
          <div className={`stack`}>
              {setIcons().map((icon) => icon)}
          </div>
          <div className={`cta`}>
              <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={live} target="_blank" rel="noopener noreferrer">Check it out</a>
          </div>
        </div>
      </div>

    </div>
  );
}
