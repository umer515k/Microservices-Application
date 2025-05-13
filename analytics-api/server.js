const express = require('express');
const app = express();
const port = 6000;

app.use(express.json());

let analytics = {};

app.post('/track', (req, res) => {
  const { postId } = req.body;
  analytics[postId] = (analytics[postId] || 0) + 1;
  res.json({ message: `View counted for post ${postId}` });
});

app.get('/analytics', (req, res) => {
  res.json(analytics);
});

app.listen(port, () => console.log(`Analytics Service running on port ${port}`));
