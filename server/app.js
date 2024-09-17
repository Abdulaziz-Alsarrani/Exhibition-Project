const express = require('express');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const imagesRouter = require('./routes/images');

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/', routes); // index routes
app.use('/api/auth', authRouter);
app.use('/api/auth', imagesRouter);

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.listen(port, ()=> {
    console.log('express is running on port '+port)
})