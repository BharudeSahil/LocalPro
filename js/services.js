const serviceGrid = document.querySelector('.service-grid');

const services = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'fa-wrench',
    description: 'Expert plumbing services for all your needs',
    details: [
      'Pipe repair and replacement',
      'Drain cleaning',
      'Water heater installation',
      'Leak detection and repair'
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: 'fa-broom',
    description: 'Professional cleaning services',
    details: [
      'Deep cleaning',
      'Regular maintenance',
      'Window cleaning',
      'Carpet cleaning'
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'fa-bolt',
    description: 'Certified electrical services',
    details: [
      'Wiring installation',
      'Electrical repairs',
      'Light fixture installation',
      'Safety inspections'
    ]
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: 'fa-hammer',
    description: 'Skilled woodworking services',
    details: [
      'Custom furniture',
      'Cabinet installation',
      'Wood repairs',
      'Deck construction'
    ]
  }
];

function renderServices() {
  serviceGrid.innerHTML = services.map(service => `
    <a href="/services/${service.id}.html" class="service-card">
      <i class="fas ${service.icon}"></i>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <ul class="service-details">
        ${service.details.map(detail => `<li>${detail}</li>`).join('')}
      </ul>
    </a>
  `).join('');
}

renderServices();