const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();// بارگذاری متغیرهای محیطی از فایل .env

const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/kaka', userRoutes);
app.use('/kaka', bookRoutes);
app.use('/kaka', reviewRoutes);

app.get('/', (req, res) => {
    res.send("hello world!!");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log('Server is running on port', PORT);
        });
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.log(err);
    });
