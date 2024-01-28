// Imports
const express = require('express');
const handlebarsConfig = require('./config/handlebarsConfig');
const expressConfig = require('./config/expressConfig');
const { PORT } = require('./constants');
const routes = require('./router');

// Local variables
const app = express();

// Configs
handlebarsConfig(app);
expressConfig(app);

// Routing
app.use(routes);

// Listenings on port
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));