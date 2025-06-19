export function createSubscribeBanner(): HTMLElement {
  const banner = document.createElement('section');
  banner.className = 'py-5';

  banner.innerHTML = `
    <div class="container mx-auto px-4 lg:px-24">
      <div class="bg-black text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center text-center md:text-left my-1">
        <h2 class="text-4xl font-bold mb-6 md:mb-0">
          STAY UPTO DATE ABOUT <br> OUR LATEST OFFERS
        </h2>
        <div class="w-full md:w-auto">
          <form class="flex flex-col gap-3">
            <input type="email" placeholder="Enter your email address" class="p-3 rounded-full w-full max-w-sm text-black border border-gray-500 placeholder-gray-500" id="subscribe-email">
            <button type="submit" class="bg-white text-black font-medium py-3 px-6 rounded-full" id="subscribe-button">
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  return banner;
}