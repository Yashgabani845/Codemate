import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
  import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

  import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
  import remarkGfm from 'remark-gfm';
import "../Mainview/docspage.css";

// Interface for metadata
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
          return response.json();
        })
        .then(data => {
          setContent(data.content);
          setMetadata(data.data);
        })
        .catch(err => {
          console.error('Error fetching file content:', err);
        });
    }
  }, [language, file]);

  // Render the markdown content with syntax highlighting for code blocks
  return (
    <div className="docs-content">
      {metadata && (
        <div className="metadata">
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
          <p>Hashtags: {metadata.hashtags.join(', ')}</p>
        </div>
      )}

      {/* Render markdown with syntax highlighting for code blocks */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({  className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');

            return match ? (
              <div className="code-block">
    <SyntaxHighlighter language={language} style={dark}>
    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText(String(children))}
                >
                  Copy
                </button>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default DocsPage;
