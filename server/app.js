const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const imagesRouter = require('./routes/images');

const port = process.env.PORT || 5000;
const app = express();

// app.use(cors({
//     origin: 'https://exhibition2app-1142ac9a25c2.herokuapp.com', 
//     credentials: true
//   }));

const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://exhibition2app-1142ac9a25c2.herokuapp.com' // Heroku production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

  
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', imagesRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use('/', routes); // index routes

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.listen(port, ()=> {
    console.log('express is running on port '+port)
})