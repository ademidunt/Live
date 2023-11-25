import express from 'express';
import { getVenue, getVenues, createVenue, updateVenue } from '../controllers/VenueOps.js';

const app = express();

app.use(express.json());

//Get all venues
app.get('/', async (req, res) => {
    res.send(await getVenues());
});

//Get a venue by venueId
app.get('/:venueId', async (req, res) => {
    console.log(req.params);
    res.send(await getVenue(req.params.venueId));
});

//Create a new venue
app.post('/', async (req, res) => {
    const venue = req.body;

    res.send(await createVenue(venue));
});

//Update a venue
app.post('/:venueId', async (req, res) => {
    const venue = {
        ...req.body,
        ...{venueId: req.params.venueId}
    }

    res.send(await updateVenue(venue));
});

export default app;