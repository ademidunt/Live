//express and port
const express = require('express');
const app = express();
const cors = require ('cors');
const port = process.env.PORT || 4000;

//import routes
const admin = require('./routes/admin');


//middleware
app.use(cors());
app.use('/api/admin/:adminUser', admin);


//DB Connection


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
