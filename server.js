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
const { generateToken, comparePassword } = require('./utils/encryption');
const { authenticate } = require('./utils/auth');

const app = express();
const server = http.createServer(app);
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

// Signup route (directly active)
app.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    data.status = 1; // directly activate account
    console.log(`signup data: ${data.email}, ${data.password}`);
    await billing.createLogin(data);
    res.redirect('/');
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send('Signup failed. Please try again.');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM login_details WHERE email = ?", [email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    if (!results || results.length === 0) {
      console.log(`Login failed: no user with email ${email}`);
      return res.redirect('/?error=Invalid credentials');
    }

    const user = results[0];
    console.log("Password entered:", password);
    console.log("Stored hash:", user.password);

    const valid = await comparePassword(password, user.password);
    console.log("Password valid:", valid);

    if (!valid) {
      return res.redirect('/?error=Invalid credentials');
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Login error:", error);
    res.redirect('/?error=Something went wrong');
  }
});

// Protected pages
const pages = ['dashboard', 'sales', 'reports', 'customers', 'appointments', 'team', 'products'];
pages.forEach(page => {
  app.get(`/${page}`, authenticate, (req, res) => {
    res.render('layouts', { title: page[0].toUpperCase() + page.slice(1), currentPage: page, user: req.user });
  });
});

app.get('/team/newmember', authenticate, (req, res) => {
  res.render('layouts', { title: 'New Member', currentPage: 'team_new', user: req.user });
});

app.get('/profile', authenticate, (req, res) => {
  billing.getAllLogins((err, users) => {
    if (err) return res.status(500).send("Server error");

    const user_data = users.find(u => u.id === req.user.id);
    res.render('layouts', {
      title: 'Profile',
      currentPage: 'profile',
      user: req.user,
      data: user_data
    });
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
