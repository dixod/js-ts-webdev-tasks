import { createHeader } from '../components/Header';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { createFooter } from '../components/Footer';
import { router } from '../router';

interface Product    { id: number; title: string; price: number; discountPercentage: number; rating: number; thumbnail: string; }
let products: Product[] = [];
let sortOrder: 'asc'|'desc' = 'desc';

export async function renderCategoryPage(app: HTMLElement, category: string) {
  app.innerHTML = '';
  app.append(createHeader());

  const title = category.replace(/-/g,' ').replace(/\b\w/g,c => c.toUpperCase());
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
            <div class="p-4 border-b lg:hidden flex justify-between"><h3 class="text-2xl font-poppins">Filters</h3><button id="close">&times;</button></div>
            <div class="p-4 space-y-4">
              <div><h4 class="text-lg font-semibold font-poppins mb-2">Sort</h4>
                ${['asc','desc'].map(o => `<button data-order="${o}" class="sort-btn text-left w-full py-1">${o==='asc'?'Ascending':'Descending'}</button>`).join('')}
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
    </main>`;
  app.append(createFooter());

  const panel = app.querySelector('#panel') as HTMLElement;
  const grid = app.querySelector('#grid') as HTMLElement;
  const emptyMsg = app.querySelector('#empty') as HTMLElement;

  const updateUI = () => {
    app.querySelectorAll('.sort-btn').forEach(btn => {
      const active = btn.getAttribute('data-order') === sortOrder;
      btn.classList.toggle('font-bold', active);
      btn.classList.toggle('text-gray-500', !active);
    });
    renderGrid();
  };

  const renderGrid = () => {
    const list = [...products].sort((a,b) => sortOrder==='asc'? a.price-b.price : b.price-a.price);
    grid.innerHTML = list.map(p => `
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer" onclick="router.navigate('/product/${p.id}')">
        <img src="${p.thumbnail}" alt="" class="w-full h-48 object-cover"/>
        <div class="p-4">
          <h3 class="text-lg font-semibold truncate font-poppins">${p.title}</h3>
          <div class="flex items-center text-yellow-500 mt-1">${'<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>'.repeat(Math.floor(p.rating))}<span class="ml-1 text-sm text-gray-700">${p.rating.toFixed(1)}</span></div>
          <div class="flex justify-between items-baseline mt-2">
            <span class="text-xl font-bold font-poppins">$${p.price.toFixed(2)}</span>${p.discountPercentage?`<span class="text-sm text-red-500">-${p.discountPercentage.toFixed(0)}%</span>`:''}
          </div>
        </div>
      </div>`).join('');
    emptyMsg.classList.toggle('hidden', list.length>0);
  };

  ['toggle','close'].forEach(id => {
    app.querySelector('#'+id)!.addEventListener('click', () => {
      panel.classList.toggle('translate-y-full');
      if(id==='toggle') document.body.insertAdjacentHTML('beforeend','<div id="backdrop" class="fixed inset-0 bg-black bg-opacity-50"></div>');
      else document.querySelector('#backdrop')?.remove();
    });
  });

  app.querySelectorAll('.sort-btn').forEach(btn => btn.addEventListener('click', ()=>{
    sortOrder = btn.getAttribute('data-order') as 'asc'|'desc'; updateUI();
  }));
  app.querySelector('#apply')!.addEventListener('click', ()=> { updateUI(); panel.classList.add('translate-y-full'); document.querySelector('#backdrop')?.remove(); });
  app.querySelector('#reset')!.addEventListener('click', async ()=>{ sortOrder='desc'; products = (await fetch(`https://dummyjson.com/products/category/${category}`).then(r=>r.json()).catch(()=>({products:[]}))).products; updateUI(); panel.classList.add('translate-y-full'); document.querySelector('#backdrop')?.remove(); });

  products = (await fetch(`https://dummyjson.com/products/category/${category}`).then(r=>r.json()).catch(()=>({products:[]}))).products;
  updateUI();
}
