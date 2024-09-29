const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const app = express();
app.use(cors());

const docsDir = path.join(__dirname, 'docs');

app.get('/api/docs/:language/:file', (req, res) => {
  console.log("simple called");

  const { language, file } = req.params;
  const filePath = path.join(docsDir, language, file);

  console.log('Attempting to read file at:', filePath); // Debugging log

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      console.error('Error reading file:', err); 
      return res.status(500).json({ error: 'Failed to load file' });
    }
    const { data, content: markdownContent } = matter(content);
    const htmlContent = markdownContent;
    res.json({ data, content: htmlContent });
  });
});

app.get('/api/docs/:language', (req, res) => {
  const { language } = req.params;
  const languageDir = path.join(docsDir,language);

  console.log('Attempting to read directory:', docsDir); 

  fs.readdir(languageDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err); 
      return res.status(500).json({ error: 'Failed to read directory' });
    }
console.log(files)
    const markdownFiles = files.filter(file => path.extname(file) === '.md');
console.log(markdownFiles)
    res.json({ files: markdownFiles });
  });
});

app.listen(5000, () => {
  console.log('Backend is running on port 5000');
});
