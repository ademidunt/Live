import express from 'express';
import { getUsers , getUser, createUser, updateUser } from './controllers/userOps.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to LIVE backend.')
})

app.listen(port, ()=>{
    console.log(`Example app listeing on port ${port}`)
})
//Get all users
app.get('/user/', async (req, res) => {
    res.send(await getUsers());
})
//Get a user by userId
app.get('/user/:userId', async (req, res) => {
    console.log(req.params);
    res.send(await getUser(req.params.userId));
});
//Create a new user
app.post('/user/', async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;

    const user = {"email": email, "name": name}

    res.send(await createUser(user));
});
//Update a user
app.post('/user/:userId', async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;

    const user = {userId: req.params.userId, "email": email, "name": name}

    res.send(await updateUser(user));
});