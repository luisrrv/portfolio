import './Projects.scss';
import { useInView } from 'react-intersection-observer';
import { IAppProps } from '../../App'; // Update the import path
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectsData, { ProjectProps } from '../../data/projects';
import Skills from '../Skills/Skills';
import { BiSolidBriefcaseAlt } from 'react-icons/bi'
import { BsArrowDownShort } from 'react-icons/bs';

interface ProjectsProps extends IAppProps {
  // Add any other specific props for the Projects component if needed
  isDark: boolean;
  hideApp: boolean;
  handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
  scrolling: boolean;
}

export default function App ({className, isDark, hideApp, handleContactMouseOverChange, scrolling}: ProjectsProps) {
    const projectsData: ProjectProps[] = ProjectsData();
    const compClassName = isDark ? 'dark' : 'light';
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
      });
    const inViewClassName = inView ?  'in-v' : '';

    const handleMouseEnter = (element: string): React.MouseEventHandler<HTMLElement> => () => {
        setTimeout(() => {
          handleContactMouseOverChange(true, element);
        }, 200);
    };
      
    const handleMouseLeave = (element: string): React.MouseEventHandler<HTMLElement> => () => {
        setTimeout(() => {
            handleContactMouseOverChange(false, element);
        }, 200);
    };

    return (
        <div 
            id='projects_container' 
            className={`projects_container ${className ? className : ''} ${compClassName} ${hideApp && 'hidden'}`} /*style={{marginTop:`${window.innerHeight}px`}}*/
            >
            <Skills 
                isDark={isDark}
                handleContactMouseOverChange={handleContactMouseOverChange}
            />
            <h3 ref={ref} id='work' className={inViewClassName}><BiSolidBriefcaseAlt />Some of my work</h3>
            <p ref={ref} className={`mobile-instr w ${inViewClassName}`}>click on a project for details <BsArrowDownShort size={16}/></p>
            <div className="projects">
            {
                projectsData.map((project,index) => (
                <ProjectCard 
                    key={JSON.stringify(index)} 
                    title={project.name}
                    description={project.description}
                    github={project.github} 
                    live={project.live}
                    stack={project.stack}
                    bg={project.bg}
                    isDark={isDark}
                    hideApp={hideApp}
                    pics={project.pics}
                    handleContactMouseOverChange={handleContactMouseOverChange}
                    scrolling={scrolling}
                    />
                ))
            }
            </div>
            <div className="all-projects">
                <a 
                    href="https://github.com/luisrrv?tab=repositories" 
                    target="_blank" 
                    rel="noreferrer" 
                    onMouseEnter={handleMouseEnter('content')} 
                    onMouseLeave={handleMouseLeave('content')}
                    >See all
                </a>
            </div>
        </div>
    );
}
