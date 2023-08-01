import './Projects.scss';

import { IAppProps } from '../../App'; // Update the import path
import ProjectCard from '../ProjectCard/ProjectCard';
// import useDarkMode from '../../hooks/useDarkMode';
import ProjectsData, { Project } from '../../data/projects';

interface ProjectsProps extends IAppProps {
  // Add any other specific props for the Projects component if needed
  isDark: boolean;
}

export default function App ({className, isDark}: ProjectsProps) {
    const projectsData: Project[] = ProjectsData();
    // const isDarkMode = useDarkMode();
    const compClassName = isDark ? 'light' : 'dark';

    return (
        <div className={`projects_container ${className ? className : ''} ${compClassName}`}>
            <h3>My work</h3>
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
                    />
                ))
            }
            </div>
        </div>
    );
}
