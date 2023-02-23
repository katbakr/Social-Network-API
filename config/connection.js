const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/social-network-apiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;