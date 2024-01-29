import express from 'express';
import { getEvent, getEvents, createEvent, updateEvent, getEventByVenueId} from '../controllers/EventOps.js';

const app = express();

app.use(express.json());

//Get all events
app.get('/', async (req, res) => {
    res.send(await getEvents());
});

//Get a event by eventId
app.get('/:eventId', async (req, res) => {
    console.log(req.params);
    res.send(await getEvent(req.params.eventId));
});

//Create a new event
app.post('/', async (req, res) => {
    const review = req.body;

    res.send(await createEvent(review));
});

//Update a event
app.post('/:eventId', async (req, res) => {
    const event = {
        ...req.body,
        ...{eventId: req.params.eventId}
    }

    res.send(await updateEvent(event));
});

//Get events with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getEventByVenueId(req.params.venueId));
});

export default app;