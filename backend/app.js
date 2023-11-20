import express from 'express';
import { getUsers } from './controllers/userOps.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to LIVE backend.')
})

app.listen(port, ()=>{
    console.log(`Example app listeing on port ${port}`)
})

app.get('/user/', async (req, res) => {
    res.send(await getUsers());
})