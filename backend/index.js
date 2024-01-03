//import 
import express from 'express';
import cors from 'cors';
import ClubberProfiles from './routes/ClubberProfiles.js'
import { Search } from './helpers/SearchBarHelper.js';

//express and port 
const app = express();
const port = process.env.PORT || 4000;


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
