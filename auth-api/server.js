const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

let users = [];

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: 'User registered' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => console.log(`Auth Service running on port ${port}`));
