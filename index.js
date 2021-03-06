const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');

// Init App
const app = express();

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/notes', notesRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);