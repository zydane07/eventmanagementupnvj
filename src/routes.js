const auth = require('./Routes/auth');
const profile = require('./Routes/profile');
const events = require('./Routes/events');

const routes = [
  {
    path: '/api/auth',
    api: auth,
  },
  {
    path: '/api/profile',
    api: profile,
  },
  {
    path: '/api/events',
    api: events,
  },
];

module.exports = routes;