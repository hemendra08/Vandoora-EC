import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000; //if env PORT is not find then it will use 3000.

app.use('/api/v1/user', userRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`app is listening on ${PORT}`);
})

