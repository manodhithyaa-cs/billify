const express = require('express');
const path = require('path');
const hbs = require('hbs');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

// Set view engine and paths
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register helper for equality check
hbs.registerHelper('eq', (a, b) => a === b);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Login Page' });
});

app.get('/dashboard', (req, res) => {
  res.render('layouts', { title: 'Dashboard', currentPage: 'dashboard' });
});

app.get('/sales', (req, res) => {
  res.render('layouts', { title: 'Sales', currentPage: 'sales' });
});

app.get('/reports', (req, res) => {
  res.render('layouts', { title: 'Reports', currentPage: 'reports' });
});

app.get('/customers', (req, res) => {
  res.render('layouts', { title: 'Customers', currentPage: 'customers' });
});

app.get('/appointments', (req, res) => {
  res.render('layouts', { title: 'Appointments', currentPage: 'appointments' });
});

app.get('/team', (req, res) => {
  res.render('layouts', { title: 'Team', currentPage: 'team' });
});

app.get('/team/newmember', (req, res) => {
  res.render('layouts', { title: 'New Member', currentPage: 'team_new' });
});

app.get('/products', (req, res) => {
  res.render('layouts', { title: 'Products', currentPage: 'products' });
})

app.get('/profile', (req, res) => {
  res.render('layouts', { title: 'Profile', currentPage: 'profile' });
})

// Socket.io connection handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('toggle-view', (viewType) => {
    console.log(`Switching to ${viewType} view`);
    // You can implement broadcasting or backend logic here if needed
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
