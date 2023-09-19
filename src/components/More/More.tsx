
import './More.scss';
import { RiUser5Fill } from 'react-icons/ri';

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

  const closeMore = (): void => {
    handleMore(false);
  }
  const cancelCloseMore = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  }
  const handleMouseTrackerEnter = (type:string, element: EventTarget | undefined): any => {
    // setTimeout(() => {
      handleContactMouseOverChange(true, type, element);
    // }, 200);
  };
  const handleMouseTrackerLeave = (type:string, element: EventTarget | undefined): any => {
    // setTimeout(() => {
      handleContactMouseOverChange(false, type, element);
    // }, 200);
  };
  const addIcon = (element: EventTarget) => {
    const el = element as HTMLElement;
    el.classList.add('over');
    // if(el.classList.contains('github')) setGithubIcon(true);
    // else if(el.classList.contains('web')) setWebIcon(true);
  }
  const removeIcon = (element: EventTarget) => {
    const el = element as HTMLElement;
    el.classList.remove('over');
    // if(el.classList.contains('github')) setGithubIcon(false);
    // else if(el.classList.contains('web')) setWebIcon(false);
  }

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
            <h3 className='more-title'><RiUser5Fill /></h3>
            <p className='more-content'
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
                <br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
                <br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
                <br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
            </p>
            <p 
                className="close-more"
                onClick={closeMore}
                onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}} 
                onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
                >close
            </p>
        </div>
    </div>
    
  );
}


