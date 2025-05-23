const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Getcash M-PESA Backend is running');
});

app.post('/confirmation', (req, res) => {
  console.log('Confirmation Received:', req.body);
  res.sendStatus(200);
});

app.post('/validation', (req, res) => {
  console.log('Validation Received:', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});