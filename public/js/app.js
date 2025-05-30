const loginBtn = document.getElementById('btn-login');
const signupBtn = document.getElementById('btn-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const formContainer = document.querySelector('div[style*="min-width"]');

loginBtn.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  formContainer.style.minWidth = '400px';

  loginBtn.classList.add('bg-[#e72e6c]', 'text-white');
  loginBtn.classList.remove('bg-white', 'text-black');
  signupBtn.classList.add('bg-white', 'text-black');
  signupBtn.classList.remove('bg-[#e72e6c]', 'text-white');
});

signupBtn.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  formContainer.style.minWidth = '600px';

  signupBtn.classList.add('bg-[#e72e6c]', 'text-white');
  signupBtn.classList.remove('bg-white', 'text-black');
  loginBtn.classList.add('bg-white', 'text-black');
  loginBtn.classList.remove('bg-[#e72e6c]', 'text-white');
});
