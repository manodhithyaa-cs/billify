const express = require('express');
const path = require('path');
const hbs = require('hbs');
const http = require('http');
const { Server } = require('socket.io');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const db = require('./utils/db');
const billing = require('./utils/billingSystem');
const { generateToken, comparePassword } = require('./utils/encryption');
const { authenticate } = require('./utils/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000 || process.env.port;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
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

app.get('/dashboard', authenticate, (req, res) => {
  res.render('layouts', { title: 'Dashboard', currentPage: 'dashboard', user: req.user });
});

app.get('/sales', authenticate, (req, res) => {
  res.render('layouts', { title: 'Sales', currentPage: 'sales' });
});

app.get('/reports', authenticate, (req, res) => {
  res.render('layouts', { title: 'Reports', currentPage: 'reports' });
});

app.get('/customers', authenticate, (req, res) => {
  res.render('layouts', { title: 'Customers', currentPage: 'customers' });
});

app.get('/appointments', authenticate, (req, res) => {
  res.render('layouts', { title: 'Appointments', currentPage: 'appointments' });
});

app.get('/team', authenticate, (req, res) => {
  res.render('layouts', { title: 'Team', currentPage: 'team' });
});

app.get('/team/newmember', authenticate, (req, res) => {
  res.render('layouts', { title: 'New Member', currentPage: 'team_new' });
});

app.get('/products', authenticate, (req, res) => {
  res.render('layouts', { title: 'Products', currentPage: 'products' });
});

app.get('/profile', authenticate, (req, res) => {
  res.render('layouts', { title: 'Profile', currentPage: 'profile' });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// Socket.io Authentication
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('login', async ({ email, password }) => {
    db.query("SELECT * FROM login_details WHERE email = ?", [email], async (err, results) => {
      if (err || results.length === 0) {
        return socket.emit('loginResponse', { success: false, message: 'Invalid email or password' });
      }

      const user = results[0];
      const isValid = await comparePassword(password, user.password);

      if (!isValid) {
        return socket.emit('loginResponse', { success: false, message: 'Invalid email or password' });
      }

      const token = generateToken({ id: user.id, email: user.email });

      socket.request.res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 3600,
        path: '/'
      }));

      socket.emit('loginResponse', { success: true });
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
