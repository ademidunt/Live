// import { db } from '../firebase/firebase.js';
import express from 'express';
import bodyParser from 'body-parser';
import { createUser } from '../controllers/userOps.js';

const Router = express.Router();

Router.use(express.json())

Router
    .post('/CreateProfile', async(req, res) => { 
        const userData = req.body
        // console.log(`the user Data is  ${JSON.stringify(userData)}`);

        try {
            await createUser(userData);
            res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } )
    export default Router;