const auth = require('./Routes/auth');
const profile = require('./Routes/profile');
const events = require('./Routes/events');
const admin = require('./Routes/admin');
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

    path:'/',
    api:admin,
  }

];

module.exports = routes;