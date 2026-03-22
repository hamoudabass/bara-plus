// ═══════════════════════════════════════════
// BARA+ — restaurants.js
// ═══════════════════════════════════════════

// ─── ÉTAT DU PANIER ───
let cart        = [];
let currentResto = null;
let deliveryFee  = 150;
let paymentMode  = 'Cash';
let currentCat   = 'all';

// ─── DONNÉES RESTAURANTS ───
const RESTAURANTS = {
  'lados': {
    name:'Lados', emoji:'🍴', color:'c1',
    note:'4.8', temps:'20-25 min', zone:'Centre ville',
    desc:"Restaurant familial spécialisé dans le shawarma et les grillades. Ingrédients frais, cuisine maison.",
    menu:[
      {cat:'🥙 Shawarma', items:[
        {id:'ea1',emoji:'🥙',name:'Shawarma Poulet',desc:'Pain pita, poulet grillé, légumes',price:500},
        {id:'ea2',emoji:'🥩',name:'Shawarma Viande',desc:'Pain pita, viande marinée',price:600},
        {id:'ea3',emoji:'🌯',name:'Shawarma Mixte',desc:'Poulet + viande, double portion',price:700},
        {id:'ea4',emoji:'🫓',name:'Shawarma Assiette',desc:'Avec frites et salade',price:800},
      ]},
      {cat:'🔥 Grillades', items:[
        {id:'ea5',emoji:'🍗',name:'Poulet Grillé ½',desc:'Avec pain et sauce',price:900},
      ]},
      {cat:'🥤 Boissons', items:[
        {id:'ea7',emoji:'🥭',name:'Jus Mangue',desc:'Frais, pressé minute',price:150},
        {id:'ea8',emoji:'🍋',name:'Jus Citron',desc:'Pressé minute',price:150},
        {id:'ea9',emoji:'🧃',name:'Soda',desc:'Coca, Fanta, Sprite',price:150},
      ]}
    ]
  },
  'soho': {
    name:'SOHO CAFÉ', emoji:'🍗', color:'c2',
    note:'4.6', temps:'25-30 min', zone:'Soubane',
    desc:"Cuisine maison traditionnelle. Fatima cuisine avec passion depuis 15 ans. Plats généreux et saveurs authentiques.",
    menu:[
      {cat:'🍗 Plats Principaux', items:[
        {id:'fa1',emoji:'🍗',name:'Poulet Rôti',desc:'½ poulet avec riz et salade',price:1000},
        {id:'fa2',emoji:'🍚',name:'Riz au Poulet',desc:'Riz basmati, poulet mijoté',price:700},
        {id:'fa3',emoji:'🥘',name:'Riz à la Viande',desc:'Riz basmati, bœuf épicé',price:800},
        {id:'fa4',emoji:'🫕',name:'Ragoût Légumes',desc:'Avec riz blanc',price:600},
      ]},
      {cat:'🥗 Accompagnements', items:[
        {id:'fa5',emoji:'🥗',name:'Salade Fraîche',desc:'Tomates, concombre, herbes',price:200},
        {id:'fa6',emoji:'🍞',name:'Pain Maison',desc:'Pain artisanal frais',price:100},
      ]}
    ]
  },
  'kulmiye': {
    name:'Restaurant Kulmiye', emoji:'🍴', color:'c3',
    note:'4.7', temps:'20-28 min', zone:'Centre',
    desc:"Spécialiste du riz et des plats mijotés. Recettes transmises de génération en génération.",
    menu:[
      {cat:'🍚 Plats de Riz', items:[
        {id:'ba1',emoji:'🍚',name:'Riz Viande',desc:'Grand bol, viande tendre',price:800},
        {id:'ba2',emoji:'🥘',name:'Riz Poisson',desc:'Poisson grillé sur riz épicé',price:900},
        {id:'ba3',emoji:'🍛',name:'Riz Mixte',desc:'Viande + légumes + épices',price:1000},
        {id:'ba4',emoji:'🫕',name:'Soupe de Viande',desc:'Soupe épaisse traditionnelle',price:500},
      ]}
    ]
  },
  'iftin': {
    name:'Restaurant Iftin', emoji:'🍴', color:'c4',
    note:'4.5', temps:'25-35 min', zone:'Hayableh',
    desc:"Le temple des grillades à Ali Sabieh. Viandes sélectionnées, marinades maison, cuisson au feu de bois.",
    menu:[
      {cat:'🔥 Grillades', items:[
        {id:'gr1',emoji:'🥩',name:'Côtelettes Grillées',desc:'3 pièces + pain + salade',price:1200},
        {id:'gr2',emoji:'🍗',name:'Poulet Entier BBQ',desc:'Mariné aux herbes, frites',price:1500},
        {id:'gr3',emoji:'🫙',name:'Brochettes Mix',desc:'5 brochettes viande + poulet',price:900},
        {id:'gr4',emoji:'🥓',name:'Assiette BBQ',desc:'Assortiment, riz ou frites',price:1300},
      ]}
    ]
  },
  'royale': {
    name:'Royale Café', emoji:'🍔', color:'c5',
    note:'4.4', temps:'15-20 min', zone:'Soubane',
    desc:"Le snack du quartier Soubane. Rapide, savoureux, accessible. Idéal pour un repas express.",
    menu:[
      {cat:'🍔 Sandwichs & Burgers', items:[
        {id:'sn1',emoji:'🍔',name:'Burger Poulet',desc:'Pain brioche, poulet croustillant',price:450},
        {id:'sn2',emoji:'🌭',name:'Hot-Dog',desc:'Pain, saucisse, moutarde',price:350},
        {id:'sn3',emoji:'🥪',name:'Sandwich Thon',desc:'Pain toast, thon, légumes',price:300},
      ]},
      {cat:'🍟 Accompagnements', items:[
        {id:'sn4',emoji:'🍟',name:'Frites Maison',desc:'Croustillantes, sel',price:200},
        {id:'sn5',emoji:'🥤',name:'Soda',desc:'Coca, Fanta, Sprite',price:150},
      ]}
    ]
  },
  'aska-tacos': {
    name:'Aska Tacos', emoji:'🍴', color:'c6',
    note:'4.9', temps:'15-20 min', zone:'Centre',
    desc:"Spécialiste des jus frais pressés. Fruits de saison, sans conservateurs, 100% naturel.",
    menu:[
      {cat:'🥭 Jus Frais', items:[
        {id:'ju1',emoji:'🥭',name:'Jus Mangue',desc:'Mangue fraîche pressée',price:200},
        {id:'ju2',emoji:'🍋',name:'Citronnade',desc:'Citron, menthe, sucre canne',price:200},
        {id:'ju3',emoji:'🍊',name:'Jus Orange',desc:'Oranges fraîches pressées',price:200},
        {id:'ju4',emoji:'🍉',name:'Jus Pastèque',desc:'Pastèque fraîche, menthe',price:200},
      ]},
      {cat:'🥤 Smoothies', items:[
        {id:'ju5',emoji:'🫧',name:'Smoothie Tropical',desc:'Mangue + banane + lait coco',price:350},
        {id:'ju6',emoji:'🥛',name:'Lait de Coco',desc:'Noix de coco fraîche',price:250},
        {id:'ju7',emoji:'☕',name:'Café Djiboutien',desc:'Café épicé traditionnel',price:150},
      ]}
    ]
  }
};

// ─── FILTRES ───
function filter(el, cat) {
  document.querySelectorAll('.fp').forEach(p => p.classList.remove('on'));
  el.classList.add('on');
  currentCat = cat;
  applyFilters();
}

function applyFilters() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  let v = 0;
  document.querySelectorAll('.rc').forEach(card => {
    const ok = (currentCat === 'all' || card.dataset.cat === currentCat) &&
               (card.dataset.name.includes(q) ||
                card.querySelector('.rc-tags').textContent.toLowerCase().includes(q));
    card.style.display = ok ? 'block' : 'none';
    if (ok) v++;
  });
  document.getElementById('restoCount').textContent = v;
  document.getElementById('emptyState').classList.toggle('show', v === 0);
}

// ─── MODAL ───
function openModal(id) {
  const r = RESTAURANTS[id];
  if (!r) return;
  currentResto = id;

  const hero = document.getElementById('modalHero');
  hero.className = 'modal-hero ' + r.color;
  hero.innerHTML = r.emoji + '<button class="modal-close" onclick="closeModal()">✕</button>';

  let html = `
    <div class="modal-name">${r.name}</div>
    <div class="modal-meta">
      <span>⭐ ${r.note}</span>
      <span>⏱️ ${r.temps}</span>
      <span>📍 ${r.zone}</span>
      <span>🛵 150 FDJ livraison</span>
    </div>
    <p class="modal-desc">${r.desc}</p>`;

  r.menu.forEach(section => {
    html += `<div class="menu-section">
               <div class="menu-section-title">${section.cat}</div>
               <div class="menu-items">`;
    section.items.forEach(item => {
      const inCart = cart.find(c => c.id === item.id);
      const qty    = inCart ? inCart.qty : 0;
      html += `
        <div class="mi" id="mi-${item.id}">
          <div class="mi-emoji">${item.emoji}</div>
          <div class="mi-info">
            <div class="mi-name">${item.name}</div>
            <div class="mi-desc">${item.desc}</div>
          </div>
          <div class="mi-right">
            <div class="mi-price">${item.price} FDJ</div>
            ${qty > 0
              ? `<div class="mi-qty-ctrl">
                   <button class="qty-btn" onclick="changeQtyModal('${item.id}','${r.name}','${item.emoji}','${item.name}',${item.price},-1)">−</button>
                   <span class="qty-num" id="mqty-${item.id}">${qty}</span>
                   <button class="qty-btn" onclick="changeQtyModal('${item.id}','${r.name}','${item.emoji}','${item.name}',${item.price},1)">+</button>
                 </div>`
              : `<button class="add-btn" id="add-${item.id}"
                   onclick="addToCartFromModal('${item.id}','${r.name}','${item.emoji}','${item.name}',${item.price})">+</button>`
            }
          </div>
        </div>`;
    });
    html += '</div></div>';
  });

  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ─── PANIER — AJOUTER ───
function addToCartFromModal(id, restoName, emoji, name, price) {
  if (cart.length > 0 && currentResto !== cart[0].restoId) {
    showToast('⚠️ Videz le panier avant de commander dans un autre restaurant');
    return;
  }
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, restoId: currentResto, restoName, emoji, name, price, qty: 1 });
  }
  const mi  = document.getElementById('mi-' + id);
  const qty = cart.find(c => c.id === id).qty;
  if (mi) {
    mi.querySelector('.mi-right').innerHTML = `
      <div class="mi-price">${price} FDJ</div>
      <div class="mi-qty-ctrl">
        <button class="qty-btn" onclick="changeQtyModal('${id}','${restoName}','${emoji}','${name}',${price},-1)">−</button>
        <span class="qty-num" id="mqty-${id}">${qty}</span>
        <button class="qty-btn" onclick="changeQtyModal('${id}','${restoName}','${emoji}','${name}',${price},1)">+</button>
      </div>`;
  }
  updateCart();
  showToast('✅ ' + name + ' ajouté au panier', 'green');
}

function changeQtyModal(id, restoName, emoji, name, price, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) {
    if (delta > 0) addToCartFromModal(id, restoName, emoji, name, price);
    return;
  }
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
    const mi = document.getElementById('mi-' + id);
    if (mi) mi.querySelector('.mi-right').innerHTML =
      `<div class="mi-price">${price} FDJ</div>
       <button class="add-btn" id="add-${id}"
         onclick="addToCartFromModal('${id}','${restoName}','${emoji}','${name}',${price})">+</button>`;
  } else {
    const qtyEl = document.getElementById('mqty-' + id);
    if (qtyEl) qtyEl.textContent = item.qty;
  }
  updateCart();
}

function changeCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  const mQty = document.getElementById('mqty-' + id);
  if (mQty && cart.find(c => c.id === id)) mQty.textContent = item.qty;
  updateCart();
}

function clearCart() {
  cart = [];
  currentResto = null;
  updateCart();
  showToast('🗑️ Panier vidé');
}

// ─── PANIER — AFFICHAGE ───
function updateCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const grand = total + deliveryFee;

  // Badge nav
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;
  badge.classList.toggle('show', count > 0);
  document.getElementById('cartNavBtn').classList.toggle('has-items', count > 0);

  // Bouton mobile
  const mob = document.getElementById('cartMobileToggle');
  if (count > 0) {
    mob.style.display = 'flex';
    document.getElementById('cartMobileBadge').textContent =
      count + ' article' + (count > 1 ? 's' : '');
  } else {
    mob.style.display = 'none';
    document.getElementById('cartSidebar').classList.remove('mobile-open');
  }

  // Compteur
  document.getElementById('cartCount').textContent = count > 0 ? '(' + count + ')' : '';

  // États panier
  const isEmpty = cart.length === 0;
  document.getElementById('cartEmptyState').style.display = isEmpty ? 'flex' : 'none';
  document.getElementById('cartItems').style.display     = isEmpty ? 'none' : 'block';
  document.getElementById('cartFooter').style.display    = isEmpty ? 'none' : 'block';

  // Info restaurant
  const restoInfo = document.getElementById('cartRestoInfo');
  if (!isEmpty && cart[0]) {
    restoInfo.classList.add('show');
    document.getElementById('cartRestoEmoji').textContent = cart[0].emoji;
    document.getElementById('cartRestoName').textContent  = cart[0].restoName;
  } else {
    restoInfo.classList.remove('show');
  }

  // Liste des items
  document.getElementById('cartItems').innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">${(item.price * item.qty).toLocaleString()} FDJ</div>
      </div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="changeCartQty('${item.id}',-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeCartQty('${item.id}',1)">+</button>
      </div>
    </div>`).join('');

  // Totaux
  document.getElementById('cartSubtotal').textContent = total.toLocaleString() + ' FDJ';
  document.getElementById('cartTotal').textContent    = grand.toLocaleString() + ' FDJ';
}

function updateDelivery() {
  deliveryFee = parseInt(document.getElementById('zoneSelect').value);
  updateCart();
}

function selectPay(el, mode) {
  document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('on'));
  el.classList.add('on');
  paymentMode = mode;
}

// ─── ENVOYER COMMANDE ───
function sendOrder() {
  if (cart.length === 0) return;

  const zoneEl  = document.getElementById('zoneSelect');
  const zone    = zoneEl.options[zoneEl.selectedIndex].text;
  const address = document.getElementById('addressNote').value;
  const total   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const grand   = total + deliveryFee;

  let msg = `🛵 *NOUVELLE COMMANDE BARA+*\n\n`;
  msg += `🏪 *Restaurant :* ${cart[0].restoName}\n\n`;
  msg += `📋 *Ma commande :*\n`;
  cart.forEach(i => {
    msg += `• ${i.qty}x ${i.name} — ${(i.price * i.qty).toLocaleString()} FDJ\n`;
  });
  msg += `\n💰 Sous-total : ${total.toLocaleString()} FDJ`;
  msg += `\n🛵 Livraison : ${deliveryFee} FDJ`;
  msg += `\n✅ *TOTAL : ${grand.toLocaleString()} FDJ*`;
  msg += `\n\n📍 *Zone :* ${zone}`;
  if (address) msg += `\n📌 *Adresse :* ${address}`;
  msg += `\n💳 *Paiement :* ${paymentMode}`;

  window.open('https://wa.me/25377784312?text=' + encodeURIComponent(msg), '_blank');
}

// ─── GÉOLOCALISATION ───
function getLocation() {
  const btn = document.getElementById('locBtn');
  if (!navigator.geolocation) {
    showToast('❌ GPS non disponible sur cet appareil');
    return;
  }
  btn.innerHTML = '⏳ Localisation en cours...';
  btn.disabled  = true;

  navigator.geolocation.getCurrentPosition(
    async function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      try {
        const url  = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=fr`;
        const data = await (await fetch(url)).json();

        const quartier = data.address.quarter
                      || data.address.suburb
                      || data.address.neighbourhood
                      || data.address.hamlet
                      || data.address.village
                      || data.address.town
                      || data.address.city
                      || 'Ali Sabieh';

        const zone = determinerZone(quartier);

        document.getElementById('locQuartier').textContent  = '📍 ' + quartier;
        document.getElementById('locZoneLabel').textContent = zone.nom + ' — Livraison ' + zone.prix + ' FDJ';
        document.getElementById('locResult').style.display  = 'block';

        if (zone.confirmed) {
          document.getElementById('manualZone').style.display = 'none';
        } else {
          document.getElementById('manualZone').style.display = 'block';
          document.getElementById('locZoneLabel').innerHTML =
            '⚠️ Zone non reconnue — <b>Choisissez ci-dessous :</b>';
        }

        document.getElementById('cartRestoSub').textContent  = 'Livraison ' + zone.prix + ' FDJ';
        document.getElementById('cartRestoSub').style.color  =
          zone.prix > 150 ? 'var(--orange)' : 'var(--green)';
        document.getElementById('cartDeliveryAmount').textContent = zone.prix + ' FDJ';
        document.getElementById('addressNote').value = quartier + ', Ali Sabieh';

        deliveryFee = zone.prix;
        updateCart();
        btn.style.display = 'none';
        showToast('✅ Position trouvée : ' + quartier, 'green');

      } catch(e) {
        afficherErreurGPS('Erreur réseau — Sélectionnez manuellement.');
      }
    },
    function(error) {
      const msgs = {
        1: '🚫 Permission refusée',
        2: '📡 GPS indisponible',
        3: '⏱️ Délai dépassé'
      };
      afficherErreurGPS((msgs[error.code] || '❌ Erreur GPS') + ' — Sélectionnez votre zone manuellement');
    },
    { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
  );
}

function afficherErreurGPS(message) {
  const btn = document.getElementById('locBtn');
  btn.innerHTML = '📍 Trouver ma position automatiquement';
  btn.disabled  = false;
  document.getElementById('manualZone').style.display = 'block';
  showToast(message);
}

function resetLocation() {
  document.getElementById('locResult').style.display   = 'none';
  document.getElementById('manualZone').style.display  = 'block';
  document.getElementById('locBtn').style.display      = 'flex';
  document.getElementById('locBtn').innerHTML          = '📍 Trouver ma position automatiquement';
  document.getElementById('locBtn').disabled           = false;
  document.getElementById('cartRestoSub').textContent  = 'Livraison 150 FDJ';
  document.getElementById('cartRestoSub').style.color  = '';
  deliveryFee = 150;
  updateCart();
}

// ─── DÉTERMINER LA ZONE ───
function determinerZone(quartier) {
  const q = quartier.toLowerCase()
             .normalize("NFD")
             .replace(/[\u0300-\u036f]/g, "");

  const normale = [
    'chateau','eau','shell','arabta',
    'q.ali','qali','quartier ali',
    'place','feraad','ferad',
    'sept frere','plateau','garanoucou','garanouco',
    'centre','ali sabieh','mairie','hopital',
  ];

  const eloignee = [
    'gohara','arta','cite','barwaqo',
    'main de lion','main lion','iljano','jena',
    'industrielle','piste','route nationale',
    'peripherie','extension','aeroport',
    'holhol','ali adde',
  ];

  if (eloignee.some(z => q.includes(z)))
    return { nom: '🟡 Zone Éloignée', prix: 250, confirmed: true };
  if (normale.some(z => q.includes(z)))
    return { nom: '🟢 Zone Normale',  prix: 150, confirmed: true };
  if (/quartier\s*\d/.test(q))
    return { nom: '🟢 Zone Normale',  prix: 150, confirmed: true };

  return { nom: '⚪ Zone à confirmer', prix: 150, confirmed: false };
}

// ─── TOAST ───
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'toast' + (type ? ' ' + type : '') + ' show';
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── MOBILE CART TOGGLE ───
function toggleCartMobile() {
  document.getElementById('cartSidebar').classList.toggle('mobile-open');
}

// ─── INITIALISATION ───
document.addEventListener('DOMContentLoaded', function() {

  // Recherche
  document.getElementById('searchInput').addEventListener('input', applyFilters);

  // Favoris
  document.querySelectorAll('.rc-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.textContent = btn.textContent === '🤍' ? '❤️' : '🤍';
    });
  });

  // Animations scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add('vis'), i * 80);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fi').forEach(el => obs.observe(el));

  // Init panier
  updateCart();
});