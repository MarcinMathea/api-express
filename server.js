const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const testimonialRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

app.use( '/', testimonialRoute);
app.use('/', concertsRoute);
app.use('/', seatsRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});