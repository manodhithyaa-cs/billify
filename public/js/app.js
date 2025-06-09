const loginBtn = document.getElementById('btn-login');
const signupBtn = document.getElementById('btn-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const socket = io();

// Toggle forms and active button styling
function showLogin() {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginBtn.classList.add('bg-[#e72e6c]', 'text-white');
  loginBtn.classList.remove('bg-white', 'text-black');
  signupBtn.classList.remove('bg-[#e72e6c]', 'text-white');
  signupBtn.classList.add('bg-white', 'text-black');
}

function showSignup() {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  signupBtn.classList.add('bg-[#e72e6c]', 'text-white');
  signupBtn.classList.remove('bg-white', 'text-black');
  loginBtn.classList.remove('bg-[#e72e6c]', 'text-white');
  loginBtn.classList.add('bg-white', 'text-black');
}

// Initial state: show login form
showLogin();

loginBtn.addEventListener('click', showLogin);
signupBtn.addEventListener('click', showSignup);

// Login form submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[name="email"]').value;
  const password = loginForm.querySelector('input[name="password"]').value;

  // socket.emit('login', { email, password });
});

// Listen for login response
socket.on('loginResponse', (data) => {
  if (data.success) {
    window.location.href = '/dashboard';
  } else {
    alert(data.message);
  }
});

// Signup form submit
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    firstname: signupForm.querySelector('input[name="firstname"]').value,
    lastname: signupForm.querySelector('input[name="lastname"]').value,
    business_name: signupForm.querySelector('input[name="business_name"]').value,
    business_location: signupForm.querySelector('input[name="business_location"]').value,
    email: signupForm.querySelector('input[name="email"]').value,
    password: signupForm.querySelector('input[name="password"]').value
  };

  // socket.emit('signup', data);
});

// Listen for signup response
socket.on('signupResponse', (data) => {
  if (data.success) {
    window.location.href = '/dashboard';
  } else {
    alert(data.message);
  }
});

// Show alert if error query param is present in URL
const params = new URLSearchParams(window.location.search);
const error = params.get("error");

if (error) {
  alert(decodeURIComponent(error));
  // Optional: remove error param without reload or redirect to clean URL
  // window.history.replaceState({}, document.title, window.location.pathname);
}
