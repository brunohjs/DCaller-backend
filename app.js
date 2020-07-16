require('dotenv').config()
const express = require('express');
const routes = require('./routes'); 
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://dcaller-frontend.herokuapp.com'
}

app.use(process.env.ENV == "PRD" ? cors(corsOptions) : cors());
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log('Server listening on port', port)
});