import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ language }) => {
  const [languages, setLanguages] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/docs/languages')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setLanguages(data);
      })
      .catch(err => {
        console.error('Error fetching languages:', err);
      });
  }, []);

  useEffect(() => {
    if (language) {
      fetch(`http://localhost:5000/api/docs/${language}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setFiles(data);
        })
        .catch(err => {
          console.error('Error fetching files:', err);
        });
    }
  }, [language]);

  return (
    <div className="sidebar">
      <ul>
        {languages.map(lang => (
          <li key={lang}>
            <Link to={`/docs/${lang}`}>{lang}</Link>
          </li>
        ))}
      </ul>
      {language && (
        <ul>
          {files.sort((a, b) => a.index - b.index).map(file => (
            <li key={file.file}>
              <Link to={`/docs/${language}/${file.file}`}>{file.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
