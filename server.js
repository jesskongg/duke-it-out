const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const cors = require('cors');

const port = process.env.PORT || 5000;

const routes = require('./api/routes/routes');

// var corsOptions = {
//     allRoutes: true,
//     origin: 'http://localhost:3000',
//     credentials: true,
//     headers: 'content-type'
// }
//
// app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
// Set static folder
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

io.on('connection', socket => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));