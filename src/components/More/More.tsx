
import './More.scss';
import { RiUser5Fill } from 'react-icons/ri';

interface MoreProps {
    isDark: boolean;
    more: boolean;
    moreOn: boolean;
    handleMore: (value: boolean) => void;
}

export default function More({ isDark, more, moreOn, handleMore }: MoreProps) {
  const compClassName = isDark ? 'dark' : 'light';
  let activeClass = moreOn ? 'on' : '';

  const closeMore = (): void => {
    handleMore(false);
  }

  return (
    <div 
        id='more' 
        className={`${compClassName} ${activeClass}`}
        onClick={closeMore}
    >
        <div className="more-container">
            <h3 className='more-title'><RiUser5Fill /></h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
                <br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
                <br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
                <br></br>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ducimus debitis reiciendis velit accusamus voluptatum molestias natus veniam et qui aut, tenetur aspernatur possimus harum quaerat ipsa corporis ad suscipit.
            </p>
        </div>
    </div>
    
  );
}


