const express = require('express');
require('dotenv').config();
const app = express();
const mainRouter = require('./routes/mainRouter');
require('./_dbConnect');

const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//Middlewares
app.use('/api/v1/', mainRouter);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

