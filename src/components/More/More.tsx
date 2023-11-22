
import './More.scss';
import { RiUser5Fill } from 'react-icons/ri';
import Tilt from 'react-parallax-tilt';

interface MoreProps {
    isDark: boolean;
    more: boolean;
    moreOn: boolean;
    handleMore: (value: boolean) => void;
    handleContactMouseOverChange: (isMouseOver: boolean, type: string, element: EventTarget | undefined) => void;
}

export default function More({ isDark, more, moreOn, handleMore, handleContactMouseOverChange }: MoreProps) {
  const compClassName = isDark ? 'dark' : 'light';
  let activeClass = moreOn ? 'on' : '';
  const glareClr = isDark ? '#62626270' :'#90909050';

  const closeMore = (): void => {
    handleMore(false);
  }
  const cancelCloseMore = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  }
  // const handleMouseTrackerEnter = (type:string, element: EventTarget | undefined): any => {
  //   // setTimeout(() => {
  //     handleContactMouseOverChange(true, type, element);
  //   // }, 200);
  // };
  // const handleMouseTrackerLeave = (type:string, element: EventTarget | undefined): any => {
  //   // setTimeout(() => {
  //     handleContactMouseOverChange(false, type, element);
  //   // }, 200);
  // };
  // const addIcon = (element: EventTarget) => {
  //   const el = element as HTMLElement;
  //   el.classList.add('over');
  //   // if(el.classList.contains('github')) setGithubIcon(true);
  //   // else if(el.classList.contains('web')) setWebIcon(true);
  // }
  // const removeIcon = (element: EventTarget) => {
  //   const el = element as HTMLElement;
  //   el.classList.remove('over');
  //   // if(el.classList.contains('github')) setGithubIcon(false);
  //   // else if(el.classList.contains('web')) setWebIcon(false);
  // }

  return (
    <div 
        id='more' 
        className={`${compClassName} ${activeClass}`}
        onClick={closeMore}
    >
        <div 
            className="more-container"
            onClick={(e) => cancelCloseMore(e)}
            >
            <Tilt 
              trackOnWindow={false}
              tiltEnable={false}
              glareEnable={true} 
              glareMaxOpacity={0.8} 
              glareColor={glareClr} 
              glarePosition="all"
              glareBorderRadius="6px"
              >
            </Tilt>
            <h3 className='more-title'><RiUser5Fill /></h3>
            <p className='more-content'
                >
                <span>
                I'm a passionate software developer based in Tokyo experienced in crafting web and native applications.
                </span>
                <br></br>
                <span className='title'>
                I live for clean and maintainable code.
                </span>

                {/* <span className='title'>
                Front-end Development
                </span>

                <span>
                Proficient in React for both web and native applications, with a focus on delivering user-friendly and responsive experiences.
                </span>

                <span className='title'>
                Full-Stack Proficiency
                </span>

                <span>
                Strong backend skills using PHP, ensuring robust server-side functionality. Experienced with databases such as MySQL and Redis, optimizing data management and performance.
                </span>

                <span className='title'>
                Problem Solver
                </span>

                <span>
                Adept at dissecting complex challenges and devising creative solutions to ensure smooth project delivery.
                </span>

                <span className='title'>
                Collaboration
                </span>

                <span>
                Effective communication and teamwork are at the core of my approach. I thrive in collaborative environments and value open feedback and knowledge sharing.
                </span>
                
                <span className='title'>
                Attention to Detail
                </span>

                <span>
                I believe that the little things matter in software development. I'm meticulous in my work, ensuring high-quality and bug-free code.
                </span>

                <span className='title'>
                Continuous Learner
                </span>

                <span>
                The tech landscape is constantly evolving, and I stay up-to-date with the latest trends and technologies to deliver cutting-edge solutions.
                </span> */}
                <br></br>
                <span>
                My goal is to leverage my technical skills and collaborative mindset to contribute to exciting projects that make a positive impact. Whether you're interested in discussing potential collaborations or simply want to chat about tech, please feel free to reach out :)
                </span>

                {/* <span>
                Let's build something great together!
                </span> */}
            </p>
            {/* <p 
                className="close-more"
                onClick={closeMore}
                onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}} 
                onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
                >close
            </p> */}
        </div>
    </div>
    
  );
}


