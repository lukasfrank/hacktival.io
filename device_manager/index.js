const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const devicesRoute = require('./routes/devices.route');


app.use(bodyParser.json());


app.use(devicesRoute);


app.listen(port, () => console.log(`App listening on port ${port}!`));
