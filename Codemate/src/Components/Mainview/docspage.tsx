import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "../Mainview/docspage.css"
interface Metadata {
  title: string;
  description: string;
  hashtags: string[];
}

const DocsPage: React.FC = () => {
  const { language, file } = useParams<Record<string, string>>();
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<Metadata | null>(null);  

  useEffect(() => {
    if (file && language) {
      fetch(`http://localhost:5000/api/docs/${language}/${file}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
           console.log('data has been fetched')
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
      <div className="docs-content">
        {metadata && (
          <div className="metadata">
            <h1>{metadata.title}</h1>
            <p>{metadata.description}</p>
            <p>Hashtags: {metadata.hashtags.join(', ')}</p>
          </div>
        )}
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
};

export default DocsPage;
