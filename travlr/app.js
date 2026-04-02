require('dotenv').config();

var createError    = require('http-errors');
var express        = require('express');
var path           = require('path');
var cookieParser   = require('cookie-parser');
var logger         = require('morgan');
var passport       = require('passport');
var connectDB      = require('./app_api/config/db');

require('./app_api/config/passport');

// ── All route imports ─────────────────────────────────────
var indexRouter        = require('./app_server/routes/index');
var travelRouter       = require('./app_server/routes/travel');
var newsRouter         = require('./app_server/routes/news');
var reservationsRouter = require('./app_server/routes/reservations');
var authRouter         = require('./app_server/routes/auth');
var apiRouter          = require('./app_api/routes/index');
var apiAuthRouter      = require('./app_api/routes/auth');
var apiReservationsRouter = require('./app_api/routes/reservations');

connectDB();

var app = express();

// ─── View Engine ──────────────────────────────────────────
var hbs = require('express-handlebars');
app.engine('hbs', hbs.engine({
  extname:       'hbs',
  defaultLayout: 'layout',
  layoutsDir:    path.join(__dirname, 'app_server', 'views', 'layouts'),
  partialsDir:   path.join(__dirname, 'app_server', 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// ─── Middleware ───────────────────────────────────────────
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// ─── CORS ─────────────────────────────────────────────────
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin',  'http://localhost:4200');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).json({});
  next();
});

// ─── Routes ──────────────────────────────────────────────
app.use('/',             indexRouter);
app.use('/travel',       travelRouter);
app.use('/news',         newsRouter);
app.use('/reservations', reservationsRouter);
app.use('/',             authRouter);
app.use('/api',          apiRouter);
app.use('/api/auth',     apiAuthRouter);
app.use('/api/reservations', apiReservationsRouter);

// ─── Error Handling ──────────────────────────────────────
app.use(function(req, res, next) { next(createError(404)); });

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;