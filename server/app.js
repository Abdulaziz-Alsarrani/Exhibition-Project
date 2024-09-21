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
app.use(cors({
    origin: 'https://exhibition2app-1142ac9a25c2.herokuapp.com', 
    credentials: true
  }));
  
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', imagesRouter);

app.use('/uploads', express.static('uploads'));

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