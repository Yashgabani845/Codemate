const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');

const app = express();
app.use(cors());

const docsDir = path.join(__dirname, 'docs');

app.get('/api/docs/:language/:file', (req, res) => {
  const { language, file } = req.params;
  const filePath = path.join(docsDir, language, file);
  
  fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) return res.status(500).json({ error: 'Failed to load file' });
      
      const { data, content: markdownContent } = matter(content);

      const md = new MarkdownIt();
      const tokens = md.parse(markdownContent, {});

     
const summary = markdownContent.split('\n')
.filter(line => line.trim().startsWith('#'))  
.map(line => {
    const headingLevel = line.match(/^#+/)[0].length; 
    const title = line.replace(/^#+\s*/, ''); 
    return {
        level: `h${headingLevel}`, 
        title: title.trim() 
    };
});


res.json({ data, content: markdownContent, summary });
  });
});

app.get('/api/docs/:language', (req, res) => {
  const { language } = req.params;
  const languageDir = path.join(docsDir, language);

  console.log('Attempting to read directory:', docsDir); 

  fs.readdir(languageDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err); 
      return res.status(500).json({ error: 'Failed to read directory' });
    }
    
    const markdownFiles = files.filter(file => path.extname(file) === '.md');
    console.log(markdownFiles);
    res.json({ files: markdownFiles });
  });
});

app.listen(5000, () => {
  console.log('Backend is running on port 5000');
});
