import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { router } from '../router';

export function renderOrderConfirmationPage(app: HTMLElement) {
  app.innerHTML = '';
  app.appendChild(createHeader());

  const main = document.createElement('main');
  main.className = 'container px-4 py-12 mx-auto lg:px-24';

  main.innerHTML = `
    <nav class="text-gray-500 text-sm mb-8 font-rubik">
      <a href="/" class="hover:underline">Home</a>
      <span class="mx-2">></span>
      <span class="text-black">Order Confirmation</span>
    </nav>
    <h1 class="text-3xl md:text-4xl font-bold font-poppins mb-6">Order Confirmation</h1>
    <div class="bg-white border border-gray-200 rounded-xl p-6 mb-8 text-lg font-poppins">
      <strong class="text-gray-500">Success! Your order has been confirmed. Please check out your email address to track delivery progress</strong>
    </div>
  `;

  app.appendChild(main);
  app.appendChild(createSubscribeBanner());
  app.appendChild(createFooter());

  setTimeout(() => {
    router.navigate('/');
  }, 5000);
}