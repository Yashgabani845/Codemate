import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Sidebar from './Sidebar';
import "../CSS/docspage.css"
const DocsPage = () => {
  const { language, file } = useParams();
  const [content, setContent] = useState('');
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    if (file) {
      fetch(`http://localhost:5000/api/docs/${language}/${file}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setContent(data.content);
          setMetadata(data.data);
          console.log(data);
        })
        .catch(err => {
          console.error('Error fetching file content:', err);
        });
    }
  }, [language, file]);

  return (
    <div className="docs-page">
      <Sidebar language={language} />
      <div className="docs-content">
        {metadata && (
          <div className="metadata">
            <h1>{metadata.title}</h1>
            <p>{  metadata.description}</p>
            <p>Hashtags: </p>
          </div>
        )}
  <ReactMarkdown >{content}</ReactMarkdown>      </div>
    </div>
  );
};

export default DocsPage;
