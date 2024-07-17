import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocsPage from './Components/Docspage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/docs/:language/:file" element={<DocsPage />} />
        <Route path="/docs/:language" element={<DocsPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
