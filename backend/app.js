import express from 'express';
import users from './routes/Users.js';
import clubber from './routes/Clubber.js';
import venue from './routes/Venue.js';
import subscription from './routes/Subscription.js';
import review from './routes/Review.js';
import promotion from './routes/Promotion.js';
import promoter from './routes/Promoter.js';
import connection from './routes/Connection.js';
import clubberVenue from './routes/ClubberVenue.js';
import booking from './routes/Booking.js';

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
//Routes linked
app.use('/clubber', clubber);
app.use('/venue', venue);
app.use('/subscription', subscription);
app.use('/review', review);
app.use('/promotion', promotion);
app.use('/promoter', promoter);
app.use('/connection', connection);
app.use('/clubberVenue', clubberVenue);
app.use('/booking', booking);