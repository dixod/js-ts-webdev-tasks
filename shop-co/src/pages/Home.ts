import { createHeader } from '../components/Header';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { createFooter } from '../components/Footer';
import { router } from '../router';

export function renderHomePage(appElement: HTMLElement): void {
  appElement.innerHTML = '';
  appElement.appendChild(createHeader());

  const main = document.createElement('main');
  main.className = 'flex flex-col relative';

  const fashion = document.createElement('section');
  fashion.className = 'bg-gray-100 pb-0 ';

  fashion.innerHTML = `
  <div class="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center lg:justify-between gap-12">

    <div class="w-full lg:w-1/2 text-center lg:text-left">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 font-poppins">
        FIND <span class="underline">ANYTHING</span> THAT MATCHES <span class="block">YOUR STYLE</span>
      </h1>
      <p class="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0 font-poppins">
        Browse through our extensive collection of trendy outfits and accessories designed to bring out your individuality and cater to your sense of style.
      </p>
      <button id="shop-now-button" class="bg-black text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-800 transition duration-300 font-poppins">
        Shop Now
      </button>
      <div class="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-8 mt-16">
        <div class="text-center">
          <span class="block text-4xl font-extrabold text-gray-900 font-poppins">200+</span>
          <span class="block text-gray-600 text-sm font-poppins text-left">International Brands</span>
        </div>
        <div class="text-center">
          <span class="block text-4xl font-extrabold text-gray-900 font-poppins">2,000+</span>
          <span class="block text-gray-600 text-sm font-poppins text-left">High-Quality Products</span>
        </div>
        <div class="text-center">
          <span class="block text-4xl font-extrabold text-gray-900 font-poppins">30,000+</span>
          <span class="block text-gray-600 text-sm font-poppins text-left">Happy Customers</span>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex justify-center">
      <img src="/fashion.jpg" alt="Fashion" class="w-full max-w-[600px] h-auto object-contain">
    </div>
  </div>
  <img src="/star2.png" alt="Star 2" class=" ml-10 absolute hidden lg:block left-1/2 transform" style="top: 170px;">
  <img src="/star1.png" alt="Star 1" class="absolute hidden lg:block right-16 transform" style="top: 50px;">
`;

  main.appendChild(fashion);

  const brands = document.createElement('section');
  brands.className = 'bg-black py-8 lg:py-12';
  brands.innerHTML = `
    <div class="container mx-auto px-17px lg:px-100px flex flex-col sm:flex-row justify-around items-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
      <img src="/versace.svg" alt="Versace" class="h-6">
      <img src="/zara.svg" alt="Zara" class="h-6">
      <img src="/gucci.svg" alt="Gucci" class="h-6">
      <img src="/prada.svg" alt="Prada" class="h-6">
      <img src="/calvin-klein.svg" alt="Calvin Klein" class="h-6">
    </div>
  `;
  main.appendChild(brands);

  const categoriesSection = document.createElement('section');
  categoriesSection.id = 'categories-section';
  categoriesSection.className = 'container mx-auto px-4 lg:px-24 py-16';

  const categoriesTitle = document.createElement('h2');
  categoriesTitle.className = 'text-4xl md:text-5xl font-bold text-center mb-12 font-poppins';
  categoriesTitle.textContent = 'Categories';
  categoriesSection.appendChild(categoriesTitle);

  const categoriesGrid = document.createElement('div');
  categoriesGrid.id = 'categories-grid';
  categoriesGrid.className = 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8';

  const categoriesList = [
    'Smartphones', 'Laptops', 'Fragrances', 'Skincare',
    'Groceries', 'Home Decoration', 'Furniture', 'Tops',
    'Womens Dresses', 'Womens Shoes', 'Mens Shirts', 'Mens Shoes'
  ];

  categoriesList.forEach(categoryName => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'bg-gray-100 p-6 cursor-pointer flex items-center justify-center text-center min-h-[160px]';

    const categoryText = document.createElement('h3');
    categoryText.className = 'text-xl md:text-2xl font-semibold text-gray-800 font-poppins break-words';
    categoryText.textContent = categoryName;

    categoryElement.appendChild(categoryText);

    categoryElement.addEventListener('click', () => {
      const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
      router.navigate(`/category/${categorySlug}`);
    });
    categoriesGrid.appendChild(categoryElement);
  });

  categoriesSection.appendChild(categoriesGrid);
  main.appendChild(categoriesSection);

  appElement.appendChild(main);
  appElement.appendChild(createSubscribeBanner());
  appElement.appendChild(createFooter());
}