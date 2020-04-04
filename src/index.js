require('dotenv-safe').config();

const { createQueues, UI } = require('bull-board');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const { QUEUE } = require('./constants');
const cleanQueueRoute = require('./clean-queue-route');
const emptyQueueRoute = require('./empty-queue-route');
const publishJobRoute = require('./publish-job-route');
const wrapperRoute = require('./wrapper-route');

/* 
  Configure Bull Board
*/
const queues = createQueues({
  redis: {
    host: process.env.REDIS_HOST,
  },
});

Object.values(QUEUE).forEach(queueName => {
  queues.add(queueName);
});

/*
  Configure Passport
*/
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH_ZERO_DOMAIN,
    clientID: process.env.AUTH_ZERO_CLIENT_ID,
    clientSecret: process.env.AUTH_ZERO_CLIENT_SECRET,
    callbackURL: '/callback',
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  },
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/* 
  Configure Express
*/
const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  (req, res) => {
    if (!req.user) {
      throw new Error('user null');
    }

    res.redirect('/');
  },
);

app.get('/login', passport.authenticate('auth0'), (req, res) => {
  res.redirect('/');
});

const requireAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.use('/queues', requireAuthentication, UI);
app.get('/publish-job', requireAuthentication, publishJobRoute.get);
app.post('/publish-job', requireAuthentication, publishJobRoute.post);
app.get('/empty-queue', requireAuthentication, emptyQueueRoute.get);
app.post('/empty-queue', requireAuthentication, emptyQueueRoute.post);
app.get('/clean-queue', requireAuthentication, cleanQueueRoute.get);
app.post('/clean-queue', requireAuthentication, cleanQueueRoute.post);
app.use('/', requireAuthentication, wrapperRoute);

app.listen(process.env.PORT || 3002);

console.log(`Application started: http://localhost:3002`);
