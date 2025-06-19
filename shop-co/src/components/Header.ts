import { router } from '../router';

export function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'bg-white sticky top-0 z-50 border-b border-gray-200';

  header.innerHTML = `
    <div class="bg-black text-white text-center py-2 text-sm font-light hidden md:block">
      Sign up and get 20% off your first order. <a href="#" class="underline font-semibold ml-2">Sign Up Now</a>
    </div>
    <div class="container mx-auto px-4 lg:px-24 flex justify-between items-center py-4">
      <a href="/" class="text-3xl font-bold">SHOP.CO</a>
      <div class="flex items-center ">
        <button id="cart-icon" class="relative p-2">
          <img src="/cart-icon.svg" alt="Cart" class="h-6">
        </button>
        <button id="profile" class="relative p-2">
          <img src="/profile.svg" alt="Profile" class="h-6">
        </button>
      </div>
    </div>
  `;

  header.querySelector('#cart-icon')?.addEventListener('click', () =>
    router.navigate('/cart/card-id')
  );

  return header;
}
