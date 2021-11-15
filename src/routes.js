const auth = require('./Routes/auth');
const profile = require('./Routes/profile');
const events = require('./Routes/events');

const routes = [
  {
    path: '/',
    api: auth,
  },
  {
    path: '/',
    api: profile,
  },
  {
    path: '/',
    api: events,
  },
];

module.exports = routes;