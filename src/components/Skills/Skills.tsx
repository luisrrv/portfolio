/* eslint-disable react/jsx-no-comment-textnodes */
import './Skills.scss';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { TiHtml5 } from 'react-icons/ti';
import { BiLogoPostgresql, BiSolidBrain } from 'react-icons/bi';
import { BsArrowDownShort } from 'react-icons/bs';

import { 
    SiCss3,
    SiSass,
    SiBootstrap,
    SiPhp,
    SiRubyonrails, 
    SiMysql,
    SiRedis,
    SiNetlify, 
    SiReact,
    SiTypescript,
    SiFirebase,
    SiPython,
    SiAmazonaws,
    SiDocker,
    SiVuedotjs,
    SiJavascript,
    SiFigma,
    SiAdobephotoshop,
    SiRuby,
    SiTailwindcss,
    SiVite
} from 'react-icons/si';

interface SkillsProps {
    isDark: boolean;
    handleContactMouseOverChange: (isMouseOver: boolean, type: string, element: EventTarget | undefined) => void;
}

export default function Skills({ isDark, handleContactMouseOverChange }: SkillsProps) {

  const [frontOn, setFrontOn] = useState<boolean>(false);
  const [backOn, setBackOn] = useState<boolean>(false);
  const [otherOn, setOtherOn] = useState<boolean>(false);
  const compClassName = isDark ? 'dark' : 'light';
  const glareClr = isDark ? '#33333380' :'#ffffff80';
  const { ref, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });
  const inViewClassName = inView ? 'in-v' : '';

const showSkills = (type: string, element: EventTarget | undefined) => {
    if (!type || !element) return;
    const el = element as HTMLElement;
    if (el.classList.contains('on')) {
        el.classList.remove('on');
        setFrontOn(false);
        setBackOn(false);
        setOtherOn(false);
        return;
    }
    const frontBtn = document.querySelector('.skill-types .f');
    const backBtn = document.querySelector('.skill-types .b');
    const otherBtn = document.querySelector('.skill-types .o');
    
    if (type === 'front') {
        frontBtn && frontBtn.classList.add('on');
        backBtn && backBtn.classList.remove('on');
        otherBtn && otherBtn.classList.remove('on');
        setFrontOn(true);
        setBackOn(false);
        setOtherOn(false);
    } else if (type === 'back') {
        backBtn && backBtn.classList.add('on');
        frontBtn && frontBtn.classList.remove('on');
        otherBtn && otherBtn.classList.remove('on');
        setBackOn(true);
        setFrontOn(false);
        setOtherOn(false);
    } else if (type === 'other') {
        otherBtn && otherBtn.classList.add('on');
        frontBtn && frontBtn.classList.remove('on');
        backBtn && backBtn.classList.remove('on');
        setOtherOn(true);
        setFrontOn(false);
        setBackOn(false);
    }
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
        ref={ref}
        id='skills' 
        className={`skills-container ${compClassName} ${inViewClassName}`}
        >
        <h3 className='title'><BiSolidBrain />Skills</h3>
        <p className='mobile-instr'>click to view skills <BsArrowDownShort size={16}/></p>
        <div className="skills">
            <div className="skill-types">
                <p 
                    className="f" 
                    onClick={(e) => showSkills('front', e.target)}
                    onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}} 
                    onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
                    >Front-end
                </p>
                <p 
                    className="b" 
                    onClick={(e) => showSkills('back', e.target)}
                    onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}} 
                    onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
                    >Back-end
                </p>
                <p 
                    className="o" 
                    onClick={(e) => showSkills('other', e.target)}
                    onMouseEnter={(e)=>{handleMouseTrackerEnter('web',e.target); addIcon(e.target);}} 
                    onMouseLeave={(e)=>{handleMouseTrackerLeave('web',e.target); removeIcon(e.target)}}
                    >Other
                </p>
            </div>
            {/* <div className='code-container'>
                <p className={`type code ${frontOn ? 'on' : ''}`}><span className='gray'>// Front-end</span><br />[html, css, javascript, typescript, react, vue, sass, tailwind, bootstrap, vite]</p>
                <p className={`type code ${backOn ? 'on' : ''}`}><span className='gray'>// Back-end</span><br />[php, ruby, rails, python, mysql, postgress, firebase, redis]</p>
                <p className={`type code ${otherOn ? 'on' : ''}`}><span className='gray'>// Other</span><br />[aws, docker, netlify, figma, photoshop]</p>
            </div> */}
            {/* <div className='code-container'>
            </div>
            <div className='code-container'>
            </div> */}
            <div className="frontend">
                <div className="skillset">
                    <div className="skillset-track front">
                        <div className="skill">
                            <TiHtml5 />
                            {/* <p>HTML</p> */}
                        </div>
                        <div className="skill">
                            <SiCss3 />
                            {/* <p>CSS</p> */}
                        </div>
                        <div className="skill">
                            <SiJavascript />
                            {/* <p>JavaScript</p> */}
                        </div>
                        <div className="skill">
                            <SiTypescript />
                            {/* <p>TypeScript</p> */}
                        </div>
                        <div className="skill">
                            <SiReact />
                            {/* <p>React/Native</p> */}
                        </div>
                        <div className="skill">
                            <SiVuedotjs />
                            {/* <p>Vue.js</p> */}
                        </div>
                        <div className="skill">
                            <SiSass />
                            {/* <p>SASS</p> */}
                        </div>
                        <div className="skill">
                            <SiTailwindcss />
                            {/* <p>TailWindCSS</p> */}
                        </div>
                        <div className="skill">
                            <SiBootstrap />
                            {/* <p>Bootstrap</p> */}
                        </div>
                        <div className="skill">
                            <SiVite />
                            {/* <p>Vite</p> */}
                        </div>
                        <div className="skill">
                            <TiHtml5 />
                            {/* <p>HTML</p> */}
                        </div>
                        <div className="skill">
                            <SiCss3 />
                            {/* <p>CSS</p> */}
                        </div>
                        <div className="skill">
                            <SiJavascript />
                            {/* <p>JavaScript</p> */}
                        </div>
                        <div className="skill">
                            <SiTypescript />
                            {/* <p>TypeScript</p> */}
                        </div>
                        <div className="skill">
                            <SiReact />
                            {/* <p>React/Native</p> */}
                        </div>
                        <div className="skill">
                            <SiVuedotjs />
                            {/* <p>Vue.js</p> */}
                        </div>
                        <div className="skill">
                            <SiSass />
                            {/* <p>SASS</p> */}
                        </div>
                        <div className="skill">
                            <SiTailwindcss />
                            {/* <p>TailWindCSS</p> */}
                        </div>
                        <div className="skill">
                            <SiBootstrap />
                            {/* <p>Bootstrap</p> */}
                        </div>
                        <div className="skill">
                            <SiVite />
                            {/* <p>Vite</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="backend">
                <div className='code-container'>
                    <Tilt 
                        trackOnWindow={false}
                        tiltEnable={false}
                        glareEnable={true} 
                        glareMaxOpacity={0.8} 
                        glareColor={glareClr} 
                        glarePosition="all"
                        glareBorderRadius="6px"
                        >
                        <div className={`type code f ${frontOn ? 'on' : ''}`}>
                            <div className="p">
                                <TiHtml5 />
                                <p>HTML</p>
                            </div>
                            {/* <div className="p">
                                <SiCss3 />
                                <p>CSS</p>
                            </div> */}
                            <div className="p">
                                <SiCss3 />
                                <p>CSS/SCSS</p>
                            </div>
                            <div className="p">
                                <SiJavascript />
                                <p>JavaScript</p>
                            </div>
                            <div className="p">
                                <SiTypescript />
                                <p>TypeScript</p>
                            </div>
                            <div className="p">
                                <SiReact />
                                <p>React/Native</p>
                            </div>
                            <div className="p">
                                <SiVuedotjs />
                                <p>Vue</p>
                            </div>
                            <div className="p">
                                <SiTailwindcss />
                                <p>Tailwind</p>
                            </div>
                            {/* <div className="p">
                                <SiBootstrap />
                                <p>Bootstrap</p>
                            </div> */}
                            <div className="p">
                                <SiVite />
                                <p>Vite</p>
                            </div>
                        </div>
                    </Tilt>
                    <Tilt 
                        trackOnWindow={false}
                        tiltEnable={false}
                        glareEnable={true} 
                        glareMaxOpacity={0.8} 
                        glareColor={glareClr} 
                        glarePosition="all"
                        glareBorderRadius="6px"
                        >
                        <div className={`type code b ${backOn ? 'on' : ''}`}>
                            <div className="p">
                                <SiPhp />
                                <p>PHP</p>
                            </div>
                            <div className="p">
                                <SiRuby />
                                <p>Ruby</p>
                            </div>
                            <div className="p">
                                <SiRubyonrails />
                                <p>Rails</p>
                            </div>
                            <div className="p">
                                <SiPython />
                                <p>Python</p>
                            </div>
                            <div className="p">
                                <SiMysql />
                                <p>MySQL</p>
                            </div>
                            <div className="p">
                                <BiLogoPostgresql />
                                <p>Postgress</p>
                            </div>
                            <div className="p">
                                <SiFirebase />
                                <p>Firebase</p>
                            </div>
                            <div className="p">
                                <SiRedis />
                                <p>Redis</p>
                            </div>
                        </div>
                    </Tilt>
                    <Tilt 
                        trackOnWindow={false}
                        tiltEnable={false}
                        glareEnable={true} 
                        glareMaxOpacity={0.8} 
                        glareColor={glareClr} 
                        glarePosition="all"
                        glareBorderRadius="6px"
                        >
                        <div className={`type code o ${otherOn ? 'on' : ''}`}>
                            <div className="p">
                                <SiAmazonaws />
                                <p>AWS</p>
                            </div>
                            <div className="p">
                                <SiDocker />
                                <p>Docker</p>
                            </div>
                            <div className="p">
                                <SiNetlify />
                                <p>Netlify</p>
                            </div>
                            <div className="p">
                                <SiFigma />
                                <p>Figma</p>
                            </div>
                            {/* <div className="p">
                                <SiAdobephotoshop />
                                <p>Photoshop</p>
                            </div> */}
                        </div>
                    </Tilt>
                </div>
                <div className="skillset">
                    <div className="skillset-track back">
                        <div className="skill">
                            <SiPhp />
                            {/* <p>PHP</p> */}
                        </div>
                        <div className="skill">
                            <SiRuby />
                            {/* <p>Ruby</p> */}
                        </div>
                        <div className="skill">
                            <SiRubyonrails />
                            {/* <p>Rails</p> */}
                        </div>
                        <div className="skill">
                            <SiPython />
                            {/* <p>Python</p> */}
                        </div>
                        <div className="skill">
                            <SiMysql />
                            {/* <p>MySQL</p> */}
                        </div>
                        <div className="skill">
                            <BiLogoPostgresql />
                            {/* <p>PostgreSQL</p> */}
                        </div>
                        <div className="skill">
                            <SiFirebase />
                            {/* <p>Firebase</p> */}
                        </div>
                        <div className="skill">
                            <SiRedis />
                            {/* <p>Redis</p> */}
                        </div>
                        <div className="skill">
                            <SiPhp />
                            {/* <p>PHP</p> */}
                        </div>
                        <div className="skill">
                            <SiRuby />
                            {/* <p>Ruby</p> */}
                        </div>
                        <div className="skill">
                            <SiRubyonrails />
                            {/* <p>Rails</p> */}
                        </div>
                        <div className="skill">
                            <SiPython />
                            {/* <p>Python</p> */}
                        </div>
                        <div className="skill">
                            <SiMysql />
                            {/* <p>MySQL</p> */}
                        </div>
                        <div className="skill">
                            <BiLogoPostgresql />
                            {/* <p>PostgreSQL</p> */}
                        </div>
                        <div className="skill">
                            <SiFirebase />
                            {/* <p>Firebase</p> */}
                        </div>
                        <div className="skill">
                            <SiRedis />
                            {/* <p>Redis</p> */}
                        </div>
                        <div className="skill">
                            <SiPhp />
                            {/* <p>PHP</p> */}
                        </div>
                        <div className="skill">
                            <SiRuby />
                            {/* <p>Ruby</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="other">
                <div className="skillset">
                    <div className="skillset-track other">
                        <div className="skill">
                            <SiAmazonaws />
                            {/* <p>AWS</p> */}
                        </div>
                        <div className="skill">
                            <SiDocker />
                            {/* <p>Docker</p> */}
                        </div>
                        <div className="skill">
                            <SiNetlify />
                            {/* <p>Netlify</p> */}
                        </div>
                        <div className="skill">
                            <SiFigma />
                            {/* <p>Figma</p> */}
                        </div>
                        <div className="skill">
                            <SiAdobephotoshop />
                            {/* <p>Photoshop</p> */}
                        </div>
                        <div className="skill">
                            <SiAmazonaws />
                            {/* <p>AWS</p> */}
                        </div>
                        <div className="skill">
                            <SiDocker />
                            {/* <p>Docker</p> */}
                        </div>
                        <div className="skill">
                            <SiNetlify />
                            {/* <p>Netlify</p> */}
                        </div>
                        <div className="skill">
                            <SiFigma />
                            {/* <p>Figma</p> */}
                        </div>
                        <div className="skill">
                            <SiAdobephotoshop />
                            {/* <p>Photoshop</p> */}
                        </div>
                        <div className="skill">
                            <SiAmazonaws />
                            {/* <p>AWS</p> */}
                        </div>
                        <div className="skill">
                            <SiDocker />
                            {/* <p>Docker</p> */}
                        </div>
                        <div className="skill">
                            <SiNetlify />
                            {/* <p>Netlify</p> */}
                        </div>
                        <div className="skill">
                            <SiFigma />
                            {/* <p>Figma</p> */}
                        </div>
                        <div className="skill">
                            <SiAdobephotoshop />
                            {/* <p>Photoshop</p> */}
                        </div>
                        <div className="skill">
                            <SiAmazonaws />
                            {/* <p>AWS</p> */}
                        </div>
                        <div className="skill">
                            <SiDocker />
                            {/* <p>Docker</p> */}
                        </div>
                        <div className="skill">
                            <SiNetlify />
                            {/* <p>Netlify</p> */}
                        </div>
                        <div className="skill">
                            <SiFigma />
                            {/* <p>Figma</p> */}
                        </div>
                        <div className="skill">
                            <SiAdobephotoshop />
                            {/* <p>Photoshop</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  );
}


