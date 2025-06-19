import './style.css';
import { createHeader } from './components/Header';
import { createSubscribeBanner } from './components/SubscribeBanner';
import { createFooter } from './components/Footer';
import { router } from '../src/router';
import { renderHomePage } from './pages/Home';
import { renderCategoryPage } from './pages/Category';

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
    app.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 class="text-4xl font-bold mb-4">Product Detail Page</h1>
        <p class="text-lg mb-8">Details for product ID: ${productId}</p>
        <button onclick="window.history.back()" class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300">Go Back</button>
      </div>
    `;
    console.log(`Navigating to product detail for ID: ${productId}`);
  } else {
    router.navigate('/');
  }
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