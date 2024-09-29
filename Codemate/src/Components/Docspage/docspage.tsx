import DocsPage from '../Mainview/docspage';
import Sidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import './docs.css'; 
import Navbar from '../Navbar/Navbar';
import Summary from '../Summery/summery';

export const Docs = () => {
  const { language, file } = useParams<Record<string, string>>();

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar language={language || ''} />
        <div className="main-content">
          <DocsPage />
        </div>
        <Summary language={language || ''} file={file || ''} />
      </div>
    </>
  );
};
