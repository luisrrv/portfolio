import './Projects.scss';

import { IAppProps } from '../../App'; // Update the import path
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectsData, { ProjectProps } from '../../data/projects';
import Skills from '../Skills/Skills';
import { BiSolidBriefcaseAlt } from 'react-icons/bi'

interface ProjectsProps extends IAppProps {
  // Add any other specific props for the Projects component if needed
  isDark: boolean;
  hideApp: boolean;
  handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
  scrolling: boolean;
}

export default function App ({className, isDark, hideApp, handleContactMouseOverChange, scrolling}: ProjectsProps) {
    const projectsData: ProjectProps[] = ProjectsData();
    // const isDarkMode = useDarkMode();
    const compClassName = isDark ? 'dark' : 'light';

    return (
        <div id='projects_container' className={`projects_container ${className ? className : ''} ${compClassName} ${hideApp && 'hidden'}`} /*style={{marginTop:`${window.innerHeight}px`}}*/>
            <Skills 
                isDark={isDark}
            />
            <h3 id='work'><BiSolidBriefcaseAlt />Some of my work</h3>
            <p className='mobile-instr'>click project for details</p>
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
        </div>
    );
}
