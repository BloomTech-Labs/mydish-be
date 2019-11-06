require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT || 4444;
server.listen(port, () => console.log(`API running on port: ${port}`));
