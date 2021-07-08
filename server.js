const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// init app and Port
const app = express();
const PORT = process.env.PORT || 5000;

// Parsing Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Mongodb Connected...')
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch(err => console.log(err));



// Setting routes
app.use('/submit', require('./routes/addEntry'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}