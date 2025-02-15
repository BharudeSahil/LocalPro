const providersList = document.getElementById('providersList');
const serviceFilter = document.getElementById('serviceFilter');
const ratingFilter = document.getElementById('ratingFilter');

async function fetchProviders() {
  try {
    const response = await fetch('/api/providers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const providers = await response.json();
    return providers;
  } catch (error) {
    console.error('Error fetching providers:', error);
    // Return empty array but show error message to user
    alert('Failed to load providers. Please try again later.');
    return [];
  }
}

function filterProviders(providers) {
  if (!providers || !Array.isArray(providers)) return [];
  
  const serviceValue = serviceFilter?.value || '';
  const ratingValue = parseFloat(ratingFilter?.value) || 0;

  return providers.filter(provider => {
    const serviceMatch = !serviceValue || provider.service_type === serviceValue;
    const ratingMatch = !ratingValue || provider.rating >= ratingValue;
    return serviceMatch && ratingMatch;
  });
}

function renderProviders(providers) {
  if (!providersList) return;

  if (!providers || !Array.isArray(providers)) {
    providersList.innerHTML = '<p>No providers available</p>';
    return;
  }

  providersList.innerHTML = providers.map(provider => `
    <div class="provider-card">
      <img src="${provider.image || 'https://via.placeholder.com/300'}" alt="${provider.name}">
      <div class="provider-info">
        <h3>${provider.name}</h3>
        <div class="rating">
          ${'★'.repeat(Math.floor(provider.rating || 0))}${'☆'.repeat(5 - Math.floor(provider.rating || 0))}
          <span>(${provider.reviews || 0} reviews)</span>
        </div>
        <p>${provider.service_type || 'General Service'}</p>
        <p class="price">Starting from $${provider.hourly_rate || 0}/hr</p>
        <a href="/booking.html?id=${provider.id}" class="btn-primary">Book Now</a>
      </div>
    </div>
  `).join('');
}

async function init() {
  try {
    const providers = await fetchProviders();
    renderProviders(providers);

    if (serviceFilter) {
      serviceFilter.addEventListener('change', () => {
        const filteredProviders = filterProviders(providers);
        renderProviders(filteredProviders);
      });
    }

    if (ratingFilter) {
      ratingFilter.addEventListener('change', () => {
        const filteredProviders = filterProviders(providers);
        renderProviders(filteredProviders);
      });
    }
  } catch (error) {
    console.error('Initialization error:', error);
    alert('Failed to initialize the page. Please refresh and try again.');
  }
}

init();