import React, { useState, useEffect } from 'react';

interface SummaryItem {
  level: string;
  title: string;
}

interface SummaryProps {
  language: string;
  file: string;
}

const Summary: React.FC<SummaryProps> = ({ language, file }) => {
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/docs/${language}/${file}`);
        if (!response.ok) {
          throw new Error('Failed to fetch summary');
        }
        const data = await response.json();
        setSummary(data.summary);
      } catch (err : any) {
        setError(err.message);
      }
    };

    fetchSummary();
  }, [language, file]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="summary">
      <h2>Summary</h2>
      <ul>
        {summary.map((item, index) => (
          <li key={index} style={{ paddingLeft: `${(parseInt(item.level[1]) - 1) * 10}px` }}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
