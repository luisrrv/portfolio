import './ProjectCard.scss';
import useDarkMode from '../../hooks/useDarkMode';

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

export default function ProjectCard({
  title,
  description,
  github,
  live,
  stack,
  bg,
}: {
  key: string;
  title: string;
  description: string;
  github: string;
  live: string;
  stack: string[] | Element[];
  bg: string;
}) {

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

    const isDarkMode = useDarkMode();
    const compClassName = isDarkMode ? 'dark' : 'light';

  return (
    <div className={`card ${compClassName}`} style={{background: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${bg})`}}>
      <h4>{title}</h4>
      <p>{description}</p>
      <div>
        <div className={`stack ${compClassName}`}>
            {setIcons().map((icon) => icon)}
        </div>
        <div className={`cta ${compClassName}`}>
            <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={live} target="_blank" rel="noopener noreferrer">Check it out</a>
        </div>
      </div>

      {/* <div className={.project_pic}>
        {
            pics.length > 0 ? (
                pics.map((pic) => (
                    <img
                      className={.img} 
                      src={pic} 
                      alt="project picture"
                      />
                  ))
            ) : <img className={.img} src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/01/become-web-developer.jpg" alt="project picture" />
        }
      </div> */}
    </div>
  );
}
