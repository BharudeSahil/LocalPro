const bookingForm = document.getElementById('bookingForm');
const providerDetails = document.querySelector('.provider-details');

// Get provider ID from URL
const urlParams = new URLSearchParams(window.location.search);
const providerId = urlParams.get('id');

async function fetchProviderDetails() {
  try {
    const response = await fetch(`/api/providers/${providerId}`);
    if (response.ok) {
      const provider = await response.json();
      renderProviderDetails(provider);
      populateServiceOptions(provider.services);
    } else {
      throw new Error('Provider not found');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to load provider details');
  }
}

function renderProviderDetails(provider) {
  providerDetails.innerHTML = `
    <img src="${provider.image}" alt="${provider.name}">
    <h2>${provider.name}</h2>
    <div class="rating">
      ${'★'.repeat(Math.floor(provider.rating))}${'☆'.repeat(5 - Math.floor(provider.rating))}
      <span>(${provider.reviews} reviews)</span>
    </div>
    <p class="service-type">${provider.service_type}</p>
    <p class="price">Rate: $${provider.hourly_rate}/hr</p>
  `;
}

function populateServiceOptions(services) {
  const serviceSelect = document.getElementById('service');
  serviceSelect.innerHTML = services.map(service => 
    `<option value="${service.id}">${service.name} - $${service.price}</option>`
  ).join('');
}

function populateTimeSlots() {
  const timeSelect = document.getElementById('time');
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  timeSelect.innerHTML = slots.map(time => 
    `<option value="${time}">${time}</option>`
  ).join('');
}

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!localStorage.getItem('token')) {
    alert('Please login to book a service');
    return;
  }

  const bookingData = {
    provider_id: providerId,
    service_id: document.getElementById('service').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    notes: document.getElementById('notes').value
  };

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(bookingData)
    });

    if (response.ok) {
      alert('Booking successful!');
      window.location.href = '/';
    } else {
      const data = await response.json();
      alert(data.error || 'Booking failed');
    }
  } catch (error) {
    console.error('Booking error:', error);
    alert('An error occurred while booking');
  }
});

// Initialize page
fetchProviderDetails();
populateTimeSlots();

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;