const express = require('express');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => { console.log('Server is running on port: 8000') });
const io = socket(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const testimonialRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

app.use('/api', testimonialRoute);
app.use('/api', concertsRoute);
app.use('/api', seatsRoute);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', (socket) => { 
  console.log('New socket!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

