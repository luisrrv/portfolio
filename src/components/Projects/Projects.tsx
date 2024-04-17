import { useEffect } from 'react';
import './Projects.scss';
import { useInView } from 'react-intersection-observer';
import { IAppProps } from '../../App'; // Update the import path
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectsData, { ProjectProps } from '../../data/projects';
import Skills from '../Skills/Skills';
import { BiSolidBriefcaseAlt } from 'react-icons/bi'
import { BsArrowDownShort } from 'react-icons/bs';

interface ProjectsProps extends IAppProps {
  isDark: boolean;
  hideApp: boolean;
  handleContactMouseOverChange: (isMouseOver: boolean, element: string) => void;
  scrolling: boolean;
  translations: any;
  language: string;
}

export default function App ({className, isDark, hideApp, handleContactMouseOverChange, scrolling, translations, language}: ProjectsProps) {
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

    const getDescriptions = (project: any = undefined) => {
        if (!project) {
            projectsData.forEach((proj: any) => {
                switch (proj.name) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    case 'FootyPulse': proj.description = translations.card_desc_seven;
                    break;
                    case 'Travel Journal': proj.description = translations.card_desc_one;
                    break;
                    case 'Bicho Bot (X/Twitter Bot)': proj.description = translations.card_desc_two;
                    break;
                    case 'Web Chat App': proj.description = translations.card_desc_three;
                    break;
                    case 'Ally Maps': proj.description = translations.card_desc_four;
                    break;
                    case 'News Feed': proj.description = translations.card_desc_five;
                    break;
                    case 'Rubber Ducking': proj.description = translations.card_desc_six;
                    break;
                }
            });
        } else {
            switch (project.name) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                case 'FootyPulse': project.description = translations.card_desc_seven;
                break;
                case 'Travel Journal': project.description = translations.card_desc_one;
                break;
                case 'Bicho Bot (X/Twitter Bot)': project.description = translations.card_desc_two;
                break;
                case 'Web Chat App': project.description = translations.card_desc_three;
                break;
                case 'Ally Maps': project.description = translations.card_desc_four;
                break;
                case 'News Feed': project.description = translations.card_desc_five;
                break;
                case 'Rubber Ducking': project.description = translations.card_desc_six;
                break;
            }
            return project.description;
        }
    }

    useEffect(() => {
        getDescriptions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [language]);

    return (
        <div 
            id='projects_container' 
            className={`projects_container ${className ? className : ''} ${compClassName} ${hideApp && 'hidden'}`} /*style={{marginTop:`${window.innerHeight}px`}}*/
            >
            <Skills 
                isDark={isDark}
                handleContactMouseOverChange={handleContactMouseOverChange}
                translations={translations}
            />
            <h3 ref={ref} id='work' className={inViewClassName}><BiSolidBriefcaseAlt />{translations.projects_title}</h3>
            <p ref={ref} className={`mobile-instr w ${inViewClassName}`}>{translations.projects_desc}<BsArrowDownShort size={16}/></p>
            <div className="projects">
            {
                projectsData.map((project,index) => (
                <ProjectCard 
                    key={JSON.stringify(index)} 
                    title={project.name}
                    description={getDescriptions(project)}
                    github={project.github} 
                    live={project.live}
                    stack={project.stack}
                    bg={project.bg}
                    isDark={isDark}
                    hideApp={hideApp}
                    pics={project.pics}
                    handleContactMouseOverChange={handleContactMouseOverChange}
                    scrolling={scrolling}
                    translations={translations}
                    language={language}
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
                    >{translations.see_all_projects}
                </a>
            </div>
        </div>
    );
}
