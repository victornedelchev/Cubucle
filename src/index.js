// Imports
const express = require('express');

const handlebarsConfig = require('./config/handlebarsConfig');
const expressConfig = require('./config/expressConfig');
const dbConnect = require('./config/dbConfig');

const {
    PORT
} = require('./constants');
const routes = require('./router');

// Connecting to the database
dbConnect()
    .then(() => {
        console.log('Successfully connected to DB');
    })
    .catch((err) => console.log(`Error while connecting with DB: ${err}`));

// Local variables
const app = express();

// Configs
handlebarsConfig(app);
expressConfig(app);

// Routing
app.use(routes);

// Listenings on port
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));