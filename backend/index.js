//express and port
import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 4000;

//import routes


//middleware
app.use(cors());


//DB Connection


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
