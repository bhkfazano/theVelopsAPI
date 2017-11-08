// Import mongoose module
const mongoose = require('mongoose');

// Start connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api', {
  useMongoCLient: true
});

module.exports = {mongoose};
