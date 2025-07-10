import './style.css';
import { createHeader } from './components/Header';
import { createSubscribeBanner } from './components/SubscribeBanner';
import { createFooter } from './components/Footer';
import { router } from './router';
import { renderHomePage } from './pages/Home';
import { renderCategoryPage } from './pages/Category';
import { renderProductPage } from './pages/Product';
import { renderCartPage } from './pages/Cart';
import { renderCheckoutPage } from './pages/Checkout';
import { renderPaymentPage } from './pages/Payment';
import { renderOrderConfirmationPage } from './pages/OrderConfirmation';


const app = document.querySelector<HTMLDivElement>('#app')!;

router.on('/', () => {
  renderHomePage(app);
}).resolve();

router.on('/category/:categoryName', (match) => {
  const categoryName = match?.data?.categoryName as string;
  if (categoryName) {
    renderCategoryPage(app, categoryName);
  } else {
    router.navigate('/');
  }
}).resolve();

router.on('/product/:productId', (match) => {
  const productId = match?.data?.productId as string;
  if (productId) {
    renderProductPage(app, productId);
  } else {
    router.navigate('/');
  }
}).resolve();

router.on('/cart/:cartId', (match) => {
  const cartId = match?.data?.cartId as string;
  if (cartId) {
    renderCartPage(app, cartId);
  } else {
    router.navigate('/');
  }
}).resolve();

router.on('/cart/empty', () => {
  app.innerHTML = `
    ${createHeader().outerHTML}
    <main class="container mx-auto px-4 lg:px-24 py-8 text-center">
      <h1 class="text-3xl font-bold mb-4">Корзина пуста</h1>
      <a href="/" class="bg-black text-white py-3 px-6 rounded-full">На главную</a>
    </main>
    ${createFooter().outerHTML}
  `;
});

router.on('/checkout', () => {
  renderCheckoutPage(app);
}).resolve();

router.on('/payment/:cartId', (match) => {
  const cartId = match?.data?.cartId as string;
  if (cartId) {
    renderPaymentPage(app, cartId);
  } else {
    router.navigate('/');
  }
}).resolve();

router.on('/confirmation', () => {
  renderOrderConfirmationPage(app);
}).resolve();

router.notFound(() => {
  app.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 class="text-5xl font-bold mb-4 font-poppins">404 - Not Found</h1>
      <p class="text-lg mb-8 font-poppins">The page you are looking for does not exist.</p>
      <a href="/" class="bg-blue-600 text-white font-bold py-3 px-6 rounded-md">Go to Homepage</a>
    </div>
  `;
});