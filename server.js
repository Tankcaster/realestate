const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const apiRouter = './api/apiRouter';

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`);
});
