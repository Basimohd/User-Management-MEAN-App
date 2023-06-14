const express = require('express')
const mongoose = require('mongoose')

const app = express()
const userRouter = require('./routes/userRoute')
const adminRouter = require('./routes/adminRoute')
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use(express.json());
app.use('/', userRouter)
app.use('/admin', adminRouter)

const path = require('path');
app.use(express.static(path.join(__dirname,"uploads")));

mongoose.connect('mongodb://127.0.0.1:27017/Mean-CRUD', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

app.listen(3000, () => {
    console.log(`Server is running`);
});