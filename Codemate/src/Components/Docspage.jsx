import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Sidebar from './Sidebar';

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
            <p>{metadata.description}</p>
            <p>Hashtags:{metadata.hashtags}</p>
          </div>
        )}
        <Markdown  remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
};

export default DocsPage;
