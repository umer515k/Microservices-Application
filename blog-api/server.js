const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());

let posts = [];

app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  const post = { id: posts.length + 1, title, content, author, views: 0 };
  posts.push(post);
  res.status(201).json(post);
});

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.views++;
    // Notify analytics service
    await axios.post('http://localhost:6000/track', { postId: post.id });
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.listen(port, () => console.log(`Blog Service running on port ${port}`));
