export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'py-8 text-gray-800 bg-gray-100';

  const socialIcons = ['twitter', 'facebook', 'instagram', 'github'];
  const companyLinks = ['About', 'Features', 'Works', 'Career'];
  const helpLinks = ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'];
  const faqLinks = ['Account', 'Manage Deliveries', 'Orders', 'Payments'];
  const resourceLinks = ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'YouTube Playlist'];
  const paymentIcons = ['visa', 'mastercard', 'paypal', 'apple-pay', 'google-pay'];

  footer.innerHTML = `
    <div class="container mx-auto px-4 lg:px-24">
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div class="lg:col-span-2 mb-8 lg:mb-0">
          <h3 class="text-3xl font-bold text-black mb-4">SHOP.CO</h3>
          <p class="mb-6 pr-10 text-md text-gray-600">
            We have clothes that suit your style and which you’re proud to wear. From women to men.
          </p>
          <div class="flex gap-4">
            ${socialIcons.map(name => `
              <a href="#" class="hover:underline">
                <img src="/${name}.svg" alt="${name}" class="w-6 h-6">
              </a>
            `).join('')}
          </div>
        </div>

        ${createLinkBlock('COMPANY', companyLinks)}
        ${createLinkBlock('HELP', helpLinks)}
        ${createLinkBlock('FAQ', faqLinks)}
        ${createLinkBlock('RESOURCES', resourceLinks)}
      </div>

      <div class="mt-12 pt-8 border-t border-gray-300 flex flex-col-reverse md:flex-row justify-between items-center">
        <p class="text-gray-600 mt-4">Shop.co © 2000-2023, All Rights Reserved</p>
        <div class="flex gap-4 items-center">
          ${paymentIcons.map(name => `
            <img src="/${name}.svg" alt="${name}" class="h-10">
          `).join('')}
        </div>
      </div>
    </div>
  `;

  return footer;
}

function createLinkBlock(title: string, items: string[]): string {
  return `
    <div class="text-gray-600">
      <h4 class="font-semibold text-black tracking-wider mb-4">${title}</h4>
      <ul class="space-y-3">
        ${items.map(text => `<li><a href="#" class="hover:underline">${text}</a></li>`).join('')}
      </ul>
    </div>
  `;
}
