const express = require('express');
const path = require('path');
const hbs = require('hbs');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./utils/db');
const billing = require('./utils/billingSystem');
const { generateToken, comparePassword, hashPassword } = require('./utils/encryption');
const { authenticate } = require('./utils/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000 || process.env.PORT;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('eq', (a, b) => a === b);

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Login Page' });
});

app.post('/signup', async (req, res) => {
  const data = req.body;
  try {
    billing.createLogin(data, async (err) => {
      if (err) return res.status(500).send('Signup failed');
      res.redirect('/');
    });
  } catch {
    res.status(500).send('Signup failed');
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM login_details WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.redirect('/?error=Invalid credentials');

    const user = results[0];
    const valid = await comparePassword(password, user.password);

    if (!valid) return res.redirect('/?error=Invalid credentials');

    const token = generateToken({ id: user.id, email: user.email });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.redirect('/dashboard');
  });
});

app.get('/dashboard', authenticate, (req, res) => {
  console.log(req.user);
  res.render('layouts', { title: 'Dashboard', currentPage: 'dashboard', user: req.user });
});

app.get('/sales', authenticate, (req, res) => {
  res.render('layouts', { title: 'Sales', currentPage: 'sales', user: req.user });
});

app.get('/reports', authenticate, (req, res) => {
  res.render('layouts', { title: 'Reports', currentPage: 'reports', user: req.user });
});

app.get('/customers', authenticate, (req, res) => {
  res.render('layouts', { title: 'Customers', currentPage: 'customers', user: req.user });
});

app.get('/appointments', authenticate, (req, res) => {
  res.render('layouts', { title: 'Appointments', currentPage: 'appointments', user: req.user });
});

app.get('/team', authenticate, (req, res) => {
  res.render('layouts', { title: 'Team', currentPage: 'team', user: req.user });
});

app.get('/team/newmember', authenticate, (req, res) => {
  res.render('layouts', { title: 'New Member', currentPage: 'team_new', user: req.user });
});

app.get('/products', authenticate, (req, res) => {
  res.render('layouts', { title: 'Products', currentPage: 'products', user: req.user });
});

app.get('/profile', authenticate, (req, res) => {
  res.render('layouts', { title: 'Profile', currentPage: 'profile' });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// Start
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
