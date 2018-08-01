const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`);
});
