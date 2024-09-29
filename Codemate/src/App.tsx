import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DocsPage from './Components/Mainview/docspage';
import { Docs } from './Components/Docspage/docspage';
import Navbar from './Components/Navbar/Navbar';
function App() {
  return (
    <div className="App">
      
     <Router>
      <Routes>
        <Route path="/:language/:file" element={<Docs/>} />
     
      </Routes>
    </Router>
    </div>
  );
}

export default App;
