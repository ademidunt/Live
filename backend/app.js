import express from 'express';
import users from './routes/Users.js'

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, ()=>{
    console.log(`Example app listeing on port ${port}`)
});

//Get all users
app.get('/', async (req, res) => {
    res.send('Welcome to Live API');
});

app.use('/user', users);