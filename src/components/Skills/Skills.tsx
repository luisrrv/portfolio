import './Skills.scss';

// import { TailwindcssOriginalWordmark, } from 'devicons-react';
import { TiHtml5 } from 'react-icons/ti';
import { BiLogoPostgresql, BiSolidBrain } from 'react-icons/bi';

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
// import { 
//     SiHtml5,
//     SiCss3,
//     SiSass,
//     SiBootstrap,
//     SiPhp,
//     SiRubyonrails, 
//     SiMysql,
//     SiRedis,
//     SiPostgresql, 
//     SiHeroku, 
//     SiReact,
//     SiTypescript,
//     SiFirebase,
//     SiPython,
//     SiAmazonaws,
//     SiDocker,
//     SiVuedotjs,
//     SiJavascript,
//     SiFigma,
//     SiAdobephotoshop,
//     SiRuby,
// } from 'react-icons/si';

interface SkillsProps {
    isDark: boolean;
}

export default function Header({ isDark }: SkillsProps) {

  const compClassName = isDark ? 'dark' : 'light';


  return (
    <div id='skills' className={`skills-container ${compClassName}`}>
        <h3 className='title'><BiSolidBrain />Skills</h3>
        <div className="skills">
            <div className="frontend">
                {/* <p className="type">Frontend</p> */}
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
                {/* <p className="type">Backend</p> */}
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
                {/* <p className="type">Other</p> */}
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


