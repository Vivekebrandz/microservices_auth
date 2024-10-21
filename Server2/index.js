require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT;
const SECREATE_KEY = process.env.SECREATE_KEY;

app.use(express.json());

// middleware function
const verifyToke = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(400).json({'error': 'Token not provided'});
  }

  jwt.verify(token, SECREATE_KEY, (err, user) => {
    if(err) {
      return res.status(400).json({'error': 'Invalid or expired token!'});
    }

    req.user = user;
    next();
  });

};

app.get('/blogs', verifyToke, (req, res) => {
  const {id, name, email} = req.user;
  return res.json({status: 'success', data: {id: id, name: name, email: email}});
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
})