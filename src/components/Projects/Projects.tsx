import './Projects.scss';

import { IAppProps } from '../../App'; // Update the import path
import ProjectCard from '../ProjectCard/ProjectCard';
import useDarkMode from '../../hooks/useDarkMode';

interface ProjectsProps extends IAppProps {
  // Add any other specific props for the Projects component if needed
}

export default function App (props: ProjectsProps) {
    const { className } = props;
    const isDarkMode = useDarkMode();
    const compClassName = isDarkMode ? 'dark' : 'light';

    return (
        <div className={`projects_container ${className ? className : ''} ${compClassName}`}>
            <h3>My work</h3>
            <div className="projects">
                <ProjectCard />
            </div>
        </div>
    );
}
