import { createHeader } from '../components/Header';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { createFooter } from '../components/Footer';
import { router } from '../router';

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  brand?: string;
}

let products: Product[] = [];
let sortOrder: 'asc' | 'desc' = 'desc';
let brands: string[] = [];
let minPrice = 10;
let maxPrice = 2000;

export async function renderCategoryPage(app: HTMLElement, category: string) {
  app.innerHTML = '';
  app.append(createHeader());

  const title = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  const data = await res.json();
  products = data.products;
  brands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean) as string[];
  const prices = products.map(p => p.price);
  minPrice = Math.min(...prices, 10);
  maxPrice = Math.max(...prices, 2000);

  app.innerHTML += `
    <main class="flex flex-col">
      <div class="container mx-auto px-4 lg:px-24 py-8">
        <p class="text-gray-600 mb-4 font-poppins">Home > <span class="font-semibold text-black">${title}</span></p>
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold font-poppins">${title}</h2>
          <button id="toggle" class="lg:hidden p-2 text-gray-700">&#9776;</button>
        </div>
        <div class="flex flex-col lg:flex-row gap-8">
          <aside id="panel" class="fixed inset-x-0 bottom-0 h-1/2 bg-white z-40 transform translate-y-full lg:translate-y-0 lg:static lg:w-1/4 lg:max-w-xs lg:border-r overflow-y-auto transition-transform">
            <div class="p-4 border-b lg:hidden flex justify-between">
              <h3 class="text-2xl font-poppins">Filters</h3>
              <button id="close">&times;</button>
            </div>
            <div class="p-4 space-y-4">
              <div>
                <h4 class="text-lg font-semibold font-poppins mb-2">Brand</h4>
                <select id="brand-filter" class="border rounded px-2 py-1 w-full">
                  <option value="">All</option>
                  ${brands.map(b => `<option value="${b}">${b}</option>`).join('')}
                </select>
              </div>
              <div>
                <h4 class="text-lg font-semibold font-poppins mb-2">Price</h4>
                <input id="min-price" type="number" min="10" max="2000" value="${minPrice}" class="border rounded px-2 py-1 w-20" />
                <span>-</span>
                <input id="max-price" type="number" min="10" max="2000" value="${maxPrice}" class="border rounded px-2 py-1 w-20" />
              </div>
              <div>
                <h4 class="text-lg font-semibold font-poppins mb-2">Sort</h4>
                <button data-order="asc" class="sort-btn text-left w-full py-1">Ascending</button>
                <button data-order="desc" class="sort-btn text-left w-full py-1">Descending</button>
              </div>
              <button id="apply" class="w-full py-3 bg-black text-white rounded-full">Apply</button>
              <button id="reset" class="w-full py-3 bg-gray-200 text-gray-800 rounded-full">Reset</button>
            </div>
          </aside>
          <section class="flex-1">
            <div id="grid" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
            <p id="empty" class="hidden text-center py-12 text-gray-600 text-lg">No products found.</p>
          </section>
        </div>
      </div>
      ${createSubscribeBanner().outerHTML}
    </main>
  `;
  app.append(createFooter());

  const panel = app.querySelector('#panel') as HTMLElement;
  const grid = app.querySelector('#grid') as HTMLElement;
  const emptyMsg = app.querySelector('#empty') as HTMLElement;
  const brandFilter = app.querySelector('#brand-filter') as HTMLSelectElement;
  const minPriceInput = app.querySelector('#min-price') as HTMLInputElement;
  const maxPriceInput = app.querySelector('#max-price') as HTMLInputElement;
  const toggleBtn = app.querySelector('#toggle');
  const closeBtn = app.querySelector('#close');
  const applyBtn = app.querySelector('#apply');
  const resetBtn = app.querySelector('#reset');
  const sortButtons = app.querySelectorAll('.sort-btn');

  function removeBackdrop() {
    const backdrop = document.getElementById('backdrop');
    if (backdrop) backdrop.remove();
  }

  function renderGrid() {
    const brand = brandFilter?.value || '';
    const min = +(minPriceInput?.value || minPrice);
    const max = +(maxPriceInput?.value || maxPrice);

    let filtered = products.filter(p =>
      (!brand || p.brand === brand) &&
      p.price >= min &&
      p.price <= max
    );

    filtered.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

    grid.innerHTML = filtered.map(p => {
      const stars = Array(Math.floor(p.rating)).fill(0).map(() => `
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
        </svg>`).join('');

      return `
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer product-card" data-id="${p.id}">
          <img src="${p.thumbnail}" alt="" class="w-full h-48 object-cover"/>
          <div class="p-4">
            <h3 class="text-lg font-semibold truncate font-poppins">${p.title}</h3>
            <div class="flex items-center text-yellow-500 mt-1">${stars}<span class="ml-1 text-sm text-gray-700">${p.rating.toFixed(1)}</span></div>
            <div class="flex justify-between items-baseline mt-2">
              <span class="text-xl font-bold font-poppins">$${p.price.toFixed(2)}</span>
              ${p.discountPercentage ? `<span class="text-sm text-red-500">-${p.discountPercentage.toFixed(0)}%</span>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');

    emptyMsg.classList.toggle('hidden', filtered.length > 0);

    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        if (id) router.navigate(`/product/${id}`);
      });
    });
  }

  function updateUI() {
    sortButtons.forEach(btn => {
      const order = btn.getAttribute('data-order');
      if (order === sortOrder) {
        btn.classList.add('font-bold');
        btn.classList.remove('text-gray-500');
      } else {
        btn.classList.remove('font-bold');
        btn.classList.add('text-gray-500');
      }
    });
    renderGrid();
  }

  toggleBtn?.addEventListener('click', () => {
    panel.classList.toggle('translate-y-full');

    const backdrop = document.createElement('div');
    backdrop.id = 'backdrop';
    backdrop.className = 'fixed inset-0 bg-black bg-opacity-50';
    document.body.appendChild(backdrop);
  });

  closeBtn?.addEventListener('click', () => {
    panel.classList.add('translate-y-full');
    removeBackdrop();
  });

  sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const order = btn.getAttribute('data-order');
      if (order === 'asc' || order === 'desc') {
        sortOrder = order;
        updateUI();
      }
    });
  });

  brandFilter?.addEventListener('change', updateUI);
  minPriceInput?.addEventListener('input', updateUI);
  maxPriceInput?.addEventListener('input', updateUI);

  applyBtn?.addEventListener('click', () => {
    updateUI();
    panel.classList.add('translate-y-full');
    removeBackdrop();
  });

  resetBtn?.addEventListener('click', () => {
    sortOrder = 'desc';
    brandFilter.value = '';
    minPriceInput.value = String(minPrice);
    maxPriceInput.value = String(maxPrice);
    updateUI();
    panel.classList.add('translate-y-full');
    removeBackdrop();
  });

  updateUI();
}
