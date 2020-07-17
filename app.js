require('dotenv').config()
const express = require('express');
const routes = require('./routes'); 
const cors = require('cors');
const { logs } = require('./helpers/utils')

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://dcaller-frontend.herokuapp.com'
}

console.log('>>', process.env, process.env.PRD == true)

logs(process.env.PRD+ ' ' + process.env.PRD == true, 'LISTEN', 'info')

app.use(process.env.ENV == "PRD" ? cors(corsOptions) : cors());
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    logs('Server listening on port '+port, 'LISTEN', 'info')
});