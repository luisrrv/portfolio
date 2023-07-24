import './Contact.scss';
import { IAppProps } from '../../App'; // Update the import path

interface ContactProps extends IAppProps {
  // Add any other specific props for the Contact component if needed
}


export default function Contact (props: ContactProps) {
    const { className } = props;
  return (
    <div className={`contact_container ${className}`}>
      <h1>Contact</h1>
    </div>
  );
}
