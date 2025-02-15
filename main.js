// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const providersList = document.getElementById('providersList');

// Sample providers data (in a real app, this would come from the backend)
const providers = [
  {
    id: 1,
    name: 'John Smith',
    service: 'Plumbing',
    rating: 4.8,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    service: 'Cleaning',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    service: 'Electrical',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

// Modal functionality
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

// Login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      loginModal.style.display = 'none';
      updateUIForLoggedInUser();
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login');
  }
});

// Book provider function
function bookProvider(providerId) {
  if (!localStorage.getItem('token')) {
    loginModal.style.display = 'block';
    return;
  }
  window.location.href = `/booking.html?id=${providerId}`;
}

// Render providers
function renderProviders() {
  if (!providersList) return; // Only run on pages with provider list
  
  providersList.innerHTML = providers.map(provider => `
    <div class="provider-card">
      <img src="${provider.image}" alt="${provider.name}">
      <div class="provider-info">
        <h3>${provider.name}</h3>
        <div class="rating">
          ${'★'.repeat(Math.floor(provider.rating))}${'☆'.repeat(5 - Math.floor(provider.rating))}
          <span>(${provider.reviews} reviews)</span>
        </div>
        <p>${provider.service}</p>
        <a href="javascript:void(0)" onclick="bookProvider(${provider.id})" class="btn-primary">Book Now</a>
      </div>
    </div>
  `).join('');
}

// Initialize the app
function init() {
  renderProviders();
}

// Make bookProvider available globally
window.bookProvider = bookProvider;

init();