import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./sidebar.css";
interface SidebarProps {
  language: string;
}

const Sidebar: React.FC<SidebarProps> = ({ language }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/docs/${language}/`);
        if (!response.ok) {
          throw new Error('Failed to load files');
        }

        const data = await response.json();
        setFiles(data.files);
      } catch (err) {
        setError('Failed to load files');
      }
    };

    fetchFiles();
  }, [language]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="sidebar">
      <h2>{language} Docs</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <Link to={`/${language}/${file}`}>
              {file.replace('.md', '')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
