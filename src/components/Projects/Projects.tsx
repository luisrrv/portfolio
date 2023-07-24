import './Projects.scss';

import { IAppProps } from '../../App'; // Update the import path

interface ProjectsProps extends IAppProps {
  // Add any other specific props for the Projects component if needed
}

export default function App (props: ProjectsProps) {
    const { className } = props;

    return (
        <div className={`projects_container ${className}`}>
        <h1>Projects</h1>
        </div>
    );
}
