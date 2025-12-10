import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000; //if env PORT is not find then it will use 3000.

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoute)
//https://localhost:8000/api/v1/user/register




app.listen(PORT, () => {
    connectDB()
    console.log(`app is listening on ${PORT}`);
})

