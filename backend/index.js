//import 
import express from 'express';
import cors from 'cors';
import ClubberProfiles from './routes/ClubberProfiles.js'

//express and port 
const app = express();
const port = process.env.PORT || 4000;


//middleware
app.use(cors());
app.use('/ClubberProfiles', ClubberProfiles);

//DB Connection


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
