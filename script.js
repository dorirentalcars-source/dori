const cars = [
  {
    name: 'Mercedes-Benz E Class 2010',
    image: 'assets/cars/mercedes-e-class-2010.jpg',
    alt: 'Mercedes-Benz E Class 2010 me ngjyrë të bardhë',
    price: '50€ / ditë',
    badge: 'Benzinë + Gaz • Automat',
    specs: ['2010', '5.5', 'Automat', 'Sedan premium'],
    details: 'E Class luksoze, e pastër dhe e gatshme për udhëtime komode.',
    search: 'mercedes benz e class 2010 5.5 benzin gaz automat sedan premium 50 euro'
  },
  {
    name: 'Jeep Cherokee 2015',
    image: 'assets/cars/jeep-cherokee-2015.jpg',
    alt: 'Jeep Cherokee 2015 me ngjyrë të zezë',
    price: '40€ / ditë',
    badge: 'Naftë • Automatike',
    specs: ['2015', '2.0', 'Automatike', 'SUV'],
    details: 'SUV praktik për rrugë të gjata, udhëtime familjare dhe komfort maksimal.',
    search: 'jeep cherokee 2015 2.0 nafte automatike suv 40 euro'
  },
  {
    name: 'BMW Seria 5 2010',
    image: 'assets/cars/bmw-seria-5-2010.jpg',
    alt: 'BMW Seria 5 2010 me ngjyrë të errët',
    price: 'Me kërkesë',
    badge: 'Naftë • Automat',
    specs: ['2010', '3.0', 'Automat', 'Business class'],
    details: 'Sedan business me linja elegante dhe ndjesi premium në timon.',
    search: 'bmw seria 5 2010 3.0 nafte automat business class'
  },
  {
    name: 'Volkswagen Golf 7',
    image: 'assets/cars/vw-golf-7.jpg',
    alt: 'Volkswagen Golf 7 me ngjyrë të bardhë',
    price: '30–40€ / ditë',
    badge: 'Naftë • Manuale',
    specs: ['Golf 7', '2.0', 'Manuale', 'Hatchback'],
    details: 'Model i balancuar për përdorim urban dhe rrugë të shkurtra apo të gjata.',
    search: 'volkswagen golf 7 2.0 nafte manuale 30 40 euro hatchback'
  },
  {
    name: 'Volkswagen Golf 6 2009',
    image: 'assets/cars/vw-golf-6-2009.jpg',
    alt: 'Volkswagen Golf 6 me ngjyrë të zezë',
    price: '25–30€ / ditë',
    badge: 'Naftë • Manuale',
    specs: ['2009', '2.0', 'Manuale', 'Ekonomik'],
    details: 'Zgjedhje ekonomike dhe e besueshme për përdorim ditor.',
    search: 'volkswagen golf 6 2009 2.0 nafte manuale 25 30 euro'
  },
  {
    name: 'Mercedes-Benz C Class 2005',
    image: 'assets/cars/mercedes-c-class-2005.jpg',
    alt: 'Mercedes-Benz C Class 2005 me ngjyrë të zezë',
    price: '20€ / ditë',
    badge: 'Naftë • Automat',
    specs: ['2005', '2.2', 'Automat', 'Sedan'],
    details: 'Alternativë e mirë për ata që kërkojnë komoditet me buxhet të ulët.',
    search: 'mercedes c class 2005 2.2 nafte automat 20 euro sedan'
  },
  {
    name: 'Mercedes-Benz E Class 2005',
    image: 'assets/cars/mercedes-e-class-2005.jpg',
    alt: 'Mercedes-Benz E Class 2005 me ngjyrë të zezë',
    price: '30€ / ditë',
    badge: 'Naftë • Automat',
    specs: ['2005', '2.2', 'Automat', 'Comfort'],
    details: 'Sedan klasik me linja të pastra dhe prezencë elegante në rrugë.',
    search: 'mercedes e class 2005 2.2 nafte automat 30 euro comfort sedan'
  },
  {
    name: 'Mini Cooper 2004',
    image: 'assets/cars/mini-cooper-2004.jpg',
    alt: 'Mini Cooper 2004 me ngjyrë të kuqe',
    price: '20€ / ditë',
    badge: 'Benzinë • Manuale',
    specs: ['2004', '1.6', 'Manuale', 'City car'],
    details: 'Makina ideale për qytet, parkim të lehtë dhe lëvizje praktike.',
    search: 'mini cooper 2004 1.6 benzin manuale 20 euro city car'
  }
];

const fleetGrid = document.getElementById('fleetGrid');
const searchCars = document.getElementById('searchCars');
const resultsMeta = document.getElementById('resultsMeta');
const noResults = document.getElementById('noResults');
const carSelect = document.getElementById('carSelect');
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const yearEl = document.getElementById('year');
const reserveLinks = [];

function renderCars(list) {
  fleetGrid.innerHTML = list.map((car, index) => `
    <article class="fleet-card reveal" data-search="${car.search}">
      <div class="fleet-image">
        <img src="${car.image}" alt="${car.alt}" loading="lazy" />
      </div>
      <div class="fleet-body">
        <div class="fleet-top">
          <div>
            <span class="badge">${car.badge}</span>
            <h3>${car.name}</h3>
          </div>
          <span class="price-pill">${car.price}</span>
        </div>
        <p>${car.details}</p>
        <div class="specs">
          ${car.specs.map((spec) => `<span>${spec}</span>`).join('')}
        </div>
        <div class="card-actions">
          <a href="#contact" class="reserve-link" data-reserve="${car.name}">Rezervo</a>
          <a href="tel:+355688808888">Na telefono</a>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-reserve]').forEach((button) => {
    button.addEventListener('click', () => {
      const carName = button.getAttribute('data-reserve');
      if (carSelect) carSelect.value = carName;
    });
  });

  observeReveals();
}

function filterCars() {
  const query = searchCars.value.trim().toLowerCase();
  const cards = [...fleetGrid.querySelectorAll('.fleet-card')];
  let visible = 0;

  cards.forEach((card) => {
    const match = card.dataset.search.includes(query);
    card.classList.toggle('hidden', !match);
    if (match) visible += 1;
  });

  resultsMeta.textContent = `${visible} makinë${visible === 1 ? '' : 'a'} të disponueshme`;
  noResults.classList.toggle('hidden', visible !== 0);
}

function observeReveals() {
  const revealItems = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((el) => observer.observe(el));
}

function initNav() {
  navToggle?.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 780) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

if (yearEl) yearEl.textContent = new Date().getFullYear();
renderCars(cars);
initNav();
searchCars?.addEventListener('input', filterCars);
filterCars();
observeReveals();
