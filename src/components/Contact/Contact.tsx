import './Contact.scss';
import { IAppProps } from '../../App'; // Update the import path
import useDarkMode from '../../hooks/useDarkMode';

interface ContactProps extends IAppProps {
  // Add any other specific props for the Contact component if needed
}

export default function Contact (props: ContactProps) {
    const { className } = props;
    const isDarkMode = useDarkMode();
    const compClassName = isDarkMode ? 'dark' : 'light'
  return (
    <div className={`contact_container ${compClassName} ${className}`}>
      <h3>Contact</h3>
    </div>
  );
}
