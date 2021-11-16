const auth = require('./Routes/auth');
const profile = require('./Routes/profile');
const events = require('./Routes/events');
const ormawa = require('./Routes/routers-ormawa');

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
  {
    path: '/',
    api: ormawa,
  },
];

module.exports = routes;