import './Projects.scss';

import { IAppProps } from '../../App'; // Update the import path
import ProjectCard from '../ProjectCard/ProjectCard';
// import useDarkMode from '../../hooks/useDarkMode';
import ProjectsData, { ProjectProps } from '../../data/projects';

interface ProjectsProps extends IAppProps {
  // Add any other specific props for the Projects component if needed
  isDark: boolean;
  hideApp: boolean;
  handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
}

export default function App ({className, isDark, hideApp, handleContactMouseOverChange}: ProjectsProps) {
    const projectsData: ProjectProps[] = ProjectsData();
    // const isDarkMode = useDarkMode();
    const compClassName = isDark ? 'dark' : 'light';

    return (
        <div id='projects_container' className={`projects_container ${className ? className : ''} ${compClassName} ${hideApp && 'hidden'}`} /*style={{marginTop:`${window.innerHeight}px`}}*/>
            <h3>Some of my work<br></br><span>click project for details</span></h3>
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

                    />
                ))
            }
            </div>
        </div>
    );
}
