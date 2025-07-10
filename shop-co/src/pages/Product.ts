import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { router } from '../router';

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  brand: string;
  stock: number;
  description: string;
  category?: string;
}

function getLocalCart(): { id: number; quantity: number }[] {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setLocalCart(cart: { id: number; quantity: number }[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export async function renderProductPage(app: HTMLElement, productId: string) {
  app.innerHTML = '';
  app.appendChild(createHeader());

  let product: Product | null = null;
  try {
    product = await fetch(`https://dummyjson.com/products/${productId}`).then(r => r.json());
  } catch {
    app.innerHTML = '<h1 class="text-2xl text-center py-12">Product not found</h1>';
    return;
  }
  if (!product) {
    app.innerHTML = '<h1 class="text-2xl text-center py-12">Product not found</h1>';
    return;
  }

  const main = document.createElement('main');
  main.className = 'container px-4 py-8 mx-auto lg:px-24';

  const capitalizedCategory = product.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : '';

  main.innerHTML = `
    <nav class="text-gray-500 text-sm mb-8 font-rubik">
      <a href="/" class="hover:underline">Home</a>
      <span class="mx-2">></span>
      <a href="/category/${product.category || ''}" class="hover:underline">${capitalizedCategory}</a>
      <span class="mx-2">></span>
      <span class="text-black">${product.title}</span>
    </nav>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="block md:hidden w-full">
        <div class="bg-gray-100 rounded-2xl flex items-center justify-center w-full h-[320px]">
          <img src="${product.images[0]}" alt="${product.title}" id="main-image" class="max-h-[300px] object-contain rounded-xl transition-all duration-200 mx-auto">
        </div>
        <div class="flex flex-row gap-4 mt-4 justify-center">
          ${product.images.slice(0, 4).map((img, i) => `
            <img src="${img}" alt="${product.title}" class="w-16 h-16 object-cover rounded-lg border-2 ${i === 0 ? 'border-black' : 'border-transparent'} cursor-pointer thumb-img" data-idx="${i}">
          `).join('')}
        </div>
      </div>
      <div class="hidden md:flex flex-row gap-8">
        <div class="flex flex-col gap-4">
          ${product.images.slice(0, 4).map((img, i) => `
            <img src="${img}" alt="${product.title}" class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border-2 ${i === 0 ? 'border-black' : 'border-transparent'} cursor-pointer thumb-img" data-idx="${i}">
          `).join('')}
        </div>
        <div class="flex-1 flex justify-center items-center">
          <div class="bg-gray-100 rounded-2xl flex items-center justify-center w-[420px] h-[420px]">
            <img src="${product.images[0]}" alt="${product.title}" id="main-image" class="max-h-[380px] object-contain rounded-xl transition-all duration-200">
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-start md:pl-8 mt-8 md:mt-0">
        <h1 class="text-3xl md:text-4xl font-bold font-poppins mb-2">${product.title}</h1>
        <div class="flex items-center gap-2 mb-4">
          <div class="flex text-yellow-400">
            ${'<svg class="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>'.repeat(Math.round(product.rating))}
          </div>
          <span class="text-black font-semibold ml-2">${product.rating.toFixed(1)}/5</span>
        </div>
        <div class="flex items-center gap-4 mb-4">
          <span class="text-2xl font-bold font-poppins">$${(product.price * (1 - product.discountPercentage / 100)).toFixed(0)}</span>
          <span class="text-xl font-semibold text-gray-400 line-through">$${product.price.toFixed(0)}</span>
          <span class="text-sm font-bold text-red-500 bg-red-100 px-2 py-1 rounded">-${product.discountPercentage.toFixed(0)}%</span>
        </div>
        <p class="mb-6 text-gray-700 font-rubik">${product.description || ''}</p>
        <div class="border-t border-gray-200 py-4">
          <div class="mb-2 text-gray-500 font-rubik">Brand</div>
          <div class="font-bold text-lg font-poppins mb-4">${product.brand}</div>
          <div class="mb-2 text-gray-500 font-rubik">In Stock</div>
          <div class="font-bold text-lg font-poppins mb-4">${product.stock} items</div>
        </div>
        <div class="flex items-center gap-4 mt-2 mb-6">
          <div class="flex items-center border border-gray-300 rounded-full px-2 py-1">
            <button class="text-2xl px-2 font-bold focus:outline-none" id="decrease">-</button>
            <input type="number" value="1" min="1" max="${product.stock}" class="w-10 text-center bg-transparent font-bold focus:outline-none" id="quantity">
            <button class="text-2xl px-2 font-bold focus:outline-none" id="increase">+</button>
          </div>
          <button class="flex-1 bg-black text-white py-3 rounded-full font-bold font-poppins text-lg hover:bg-gray-900 transition" id="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(main);
  app.appendChild(createSubscribeBanner());
  app.appendChild(createFooter());

  const mainImages = main.querySelectorAll('#main-image') as NodeListOf<HTMLImageElement>;
  const thumbs = main.querySelectorAll('.thumb-img');

  thumbs.forEach((img, idx) => {
    img.addEventListener('click', () => {
      const src = (img as HTMLImageElement).src;
      mainImages.forEach(mainImg => (mainImg.src = src));
      thumbs.forEach((im, i) => {
        im.classList.toggle('border-black', i === idx);
        im.classList.toggle('border-transparent', i !== idx);
      });
    });
  });

  const decreaseBtn = main.querySelector('#decrease') as HTMLButtonElement;
  const increaseBtn = main.querySelector('#increase') as HTMLButtonElement;
  const quantityInput = main.querySelector('#quantity') as HTMLInputElement;

  decreaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) quantityInput.value = (value - 1).toString();
  });

  increaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value < product.stock) quantityInput.value = (value + 1).toString();
  });

  const addToCartBtn = main.querySelector('#add-to-cart') as HTMLButtonElement;

  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    const cart = getLocalCart();
    const idx = cart.findIndex(item => item.id === product.id);

    if (idx !== -1) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({ id: product.id, quantity });
    }

    setLocalCart(cart);
    router.navigate('/cart/local');
  });
}
