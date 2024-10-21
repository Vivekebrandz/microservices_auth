require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT;
const SECREATE_KEY = process.env.SECREATE_KEY;

//check json request
app.use(express.json());

app.post('/login', (req, res) => {
  const token = jwt.sign({id: 102, name: 'Vivek Mandal', email: 'vivek.m@ebrandz.com'}, SECREATE_KEY, {expiresIn: '30s'});
  return res.json({accessToken: token});
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

