// sets the logic for dev or prod keys
if (process.env.NODE_ENV === 'production') { module.exports = require('./prod') } // return prod keys
else { module.exports = require('./dev') } // return dev keys