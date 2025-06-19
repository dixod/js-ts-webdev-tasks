export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'bg-white py-8 text-#F0F0F0';
  footer.innerHTML = `
    <div class="container mx-auto px-4 lg:px-24">
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div class="lg:col-span-2 mb-8 lg:mb-0">
          <h3 class="text-3xl font-bold text-black mb-4">SHOP.CO</h3>
          <p class="mb-6 pr-10 text-md text-gray-600">
            We have clothes that suit your style and which you’re proud to wear. From women to men.
          </p>
          <div class="flex gap-4">
            <a href="#" class="hover:underline"><img src="/twitter.svg" alt="Twitter" class="w-6 h-6"></a>
            <a href="#" class="hover:underline"><img src="/facebook.svg" alt="Facebook" class="w-6 h-6"></a>
            <a href="#" class="hover:underline"><img src="/instagram.svg" alt="Instagram" class="w-6 h-6"></a>
            <a href="#" class="hover:underline"><img src="/github.svg" alt="Github" class="w-6 h-6"></a>
          </div>
        </div>

        <div class="text-gray-600">
          <h4 class="font-semibold text-black tracking-wider mb-4">COMPANY</h4>
          <ul class="space-y-3">
            <li><a href="#" class="hover:underline">About</a></li>
            <li><a href="#" class="hover:underline">Features</a></li>
            <li><a href="#" class="hover:underline">Works</a></li>
            <li><a href="#" class="hover:underline">Career</a></li>
          </ul>
        </div>

        <div class="text-gray-600">
          <h4 class=" font-semibold text-black tracking-wider mb-4">HELP</h4>
          <ul class="space-y-3">
            <li><a href="#" class="hover:underline">Customer Support</a></li>
            <li><a href="#" class="hover:underline">Delivery Details</a></li>
            <li><a href="#" class="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" class="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="text-gray-600">
          <h4 class="font-semibold text-black tracking-wider mb-4">FAQ</h4>
          <ul class="space-y-3">
            <li><a href="#" class="hover:underline">Account</a></li>
            <li><a href="#" class="hover:underline">Manage Deliveries</a></li>
            <li><a href="#" class="hover:underline">Orders</a></li>
            <li><a href="#" class="hover:underline">Payments</a></li>
          </ul>
        </div>

        <div class="text-gray-600">
          <h4 class="font-semibold text-black tracking-wider mb-4">RESOURCES</h4>
          <ul class="space-y-3">
            <li><a href="#" class="hover:underline">Free eBooks</a></li>
            <li><a href="#" class="hover:underline">Development Tutorial</a></li>
            <li><a href="#" class="hover:underline">How to - Blog</a></li>
            <li><a href="#" class="hover:underline">YouTube Playlist</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-300 flex flex-col-reverse md:flex-row justify-between items-center">
        <p class="text-gray-600 mt-4 ">Shop.co © 2000-2023, All Rights Reserved</p>
        <div class="flex gap-4 items-center">
          <img src="/visa.svg" alt="Visa" class="h-6">
          <img src="/mastercard.svg" alt="Mastercard" class="h-10">
          <img src="/paypal.svg" alt="PayPal" class="h-10">
          <img src="/apple-pay.svg" alt="Apple Pay" class="h-10">
          <img src="/google-pay.svg" alt="Google Pay" class="h-10">
        </div>
      </div>
    </div>
  `;
  return footer;
}