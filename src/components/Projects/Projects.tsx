import './Projects.scss';

import { IAppProps } from '../../App'; // Update the import path
import ProjectCard from '../ProjectCard/ProjectCard';
// import useDarkMode from '../../hooks/useDarkMode';
import ProjectsData, { ProjectProps } from '../../data/projects';

interface ProjectsProps extends IAppProps {
  // Add any other specific props for the Projects component if needed
  isDark: boolean;
  hideApp: boolean;
}

export default function App ({className, isDark, hideApp}: ProjectsProps) {
    const projectsData: ProjectProps[] = ProjectsData();
    // const isDarkMode = useDarkMode();
    const compClassName = isDark ? 'dark' : 'light';

    return (
        <div className={`projects_container ${className ? className : ''} ${compClassName} ${hideApp && 'hidden'}`}>
            <h3>Some of my work</h3>
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

                    />
                ))
            }
            </div>
        </div>
    );
}
