import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { router } from '../router';

type CartItem = { id: number; quantity: number };

function getLocalCart(): CartItem[] {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function setLocalCart(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromLocalCart(productId: number) {
  setLocalCart(getLocalCart().filter(item => item.id !== productId));
}

function clearLocalCart() {
  localStorage.removeItem('cart');
}

export async function renderCartPage(app: HTMLElement, cartId: string) {
  const cart = getLocalCart();

  if (cart.length === 0) {
    app.innerHTML = `
      ${createHeader().outerHTML}
      <main class="container mx-auto px-4 lg:px-24 py-8 text-center">
        <h1 class="text-3xl font-bold mb-12">Cart is Empty</h1>
        <a href="/" class="bg-black text-white py-3 px-6 rounded-full">To Home</a>
      </main>
      ${createFooter().outerHTML}
    `;
    return;
  }

  const productsData = await Promise.all(
    cart.map(item =>
      fetch(`https://dummyjson.com/products/${item.id}`).then(res => res.json())
    )
  );

  const subtotal = productsData.reduce((sum, p, i) => sum + p.price * cart[i].quantity, 0);
  const discount = productsData.reduce(
    (sum, p, i) => sum + Math.round(p.price * (p.discountPercentage / 100)) * cart[i].quantity,
    0
  );
  const total = subtotal - discount;

  app.innerHTML = '';
  app.appendChild(createHeader());

  const main = document.createElement('main');
  main.className = 'container px-4 py-8 mx-auto lg:px-24';

  const productsHtml = productsData.map((product, i) => {
    const quantity = cart[i].quantity;
    return `
      <div class="flex items-center gap-4 py-4 px-4 md:px-0 border-b last:border-b-0">
        <img src="${product.thumbnail}" alt="${product.title}" class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0">
        <div class="flex-1 min-w-0">
          <div class="font-bold text-lg md:text-xl font-poppins truncate">${product.title}</div>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-xl font-bold font-poppins">$${product.price}</span>
            ${product.discountPercentage ? `<span class="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">-${product.discountPercentage}%</span>` : ''}
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <span class="text-gray-500 text-sm">x${quantity}</span>
          <button class="text-red-500 hover:underline text-sm font-semibold" data-product-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  main.innerHTML = `
    <nav class="text-gray-500 text-sm mb-8 font-rubik">
      <a href="/" class="hover:underline">Home</a>
      <span class="mx-2">></span>
      <span class="text-black">Cart</span>
    </nav>
    <h1 class="text-3xl md:text-4xl font-bold font-poppins mb-6">Your cart</h1>
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="flex-1">
        <div class="bg-white rounded-2xl border border-gray-200 p-0 md:p-4">
          ${productsHtml}
        </div>
      </div>
      <div class="w-full lg:w-[340px]">
        <div class="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h3 class="text-lg font-bold mb-4">Order Summary</h3>
          <div class="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span class="font-semibold">$${subtotal}</span>
          </div>
          <div class="flex justify-between mb-2 text-gray-700">
            <span>Discount (-20%)</span>
            <span class="font-semibold text-red-500">-$${discount}</span>
          </div>
          <div class="flex justify-between items-center mt-4 mb-2 text-black text-xl font-bold">
            <span>Total</span>
            <span>$${total}</span>
          </div>
          <button id="go-to-checkout" class="bg-black text-white w-full py-3 rounded-full font-bold mt-4 flex items-center justify-center gap-2 text-lg">
            Go to Checkout <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(main);
  app.appendChild(createSubscribeBanner());
  app.appendChild(createFooter());

  main.querySelectorAll('button[data-product-id]').forEach(button => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-product-id'));
      const currentCart = getLocalCart();
      if (currentCart.length === 1) {
        clearLocalCart();
        router.navigate('/');
      } else {
        removeFromLocalCart(id);
        renderCartPage(app, cartId);
      }
    });
  });

  main.querySelector('#go-to-checkout')?.addEventListener('click', () => {
    router.navigate('/checkout');
  });
}
