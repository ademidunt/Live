import express from 'express';
import { getClubbers, getClubber, createClubber, updateClubber } from '../controllers/clubberOps.js';

const app = express();
const port = 3000;

app.use(express.json());

//Get all clubbers
app.get('/', async (req, res) => {
    res.send(await getClubbers());
});

//Get a clubber by clubberId
app.get('/:clubberId', async (req, res) => {
    console.log(req.params);
    res.send(await getClubber(req.params.clubberId));
});

//Create a new clubber
app.post('/', async (req, res) => {
    const clubber = req.body;

    res.send(await createClubber(clubber));
});

//Update a clubber
app.post('/:clubberId', async (req, res) => {
    const clubber = {
        ...req.body,
        ...{clubberId: req.params.clubberId}
    }

    res.send(await updateClubber(clubber));
});

export default app;