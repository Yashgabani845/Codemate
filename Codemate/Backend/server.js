const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const app = express();
app.use(cors());

const docsDir = path.join(__dirname, '..', 'docs');

app.get('/api/docs/languages', (req, res) => {
  fs.readdir(docsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to load languages' });
    res.json(files);
  });
});

app.get('/api/docs/:language', (req, res) => {
  const { language } = req.params;
  const languageDir = path.join(docsDir, language);
  fs.readdir(languageDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to load files' });

    const fileMetadata = files.map(file => {
      const filePath = path.join(languageDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      return { file, ...data };
    });

    res.json(fileMetadata);
  });
});

app.get('/api/docs/:language/:file', (req, res) => {
  const { language, file } = req.params;
  const filePath = path.join(docsDir, language, file);
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) return res.status(500).json({ error: 'Failed to load file' });
    const { data, content: markdownContent } = matter(content);
    const htmlContent = markdownContent
    res.json({ data, content: htmlContent });
  });
});

app.listen(5000, () => {
  console.log('Backend is running on port 5000');
});
