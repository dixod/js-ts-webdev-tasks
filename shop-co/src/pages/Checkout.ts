import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { router } from '../router';

const validators = {
  firstName: (v: string) => v.length >= 3 && v.length <= 32,
  lastName: (v: string) => v.length >= 3 && v.length <= 32,
  maidenName: (v: string) => v.length >= 3 && v.length <= 32,
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  phone: (v: string) => /^\+\d{1,3}( \d{3,4}){2,4}$/.test(v),
  address: (v: string) => v.length > 0,
  city: (v: string) => v.length > 0,
  postalCode: (v: string) => v.length > 0,
};

function setFieldValidation(input: HTMLInputElement, valid: boolean) {
  input.classList.toggle('border-red-500', !valid);
  input.classList.toggle('border-gray-200', valid);
}

function getUserFromStorage(): { id: number } | null {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
}

async function fetchUserData(userId: number) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!res.ok) return null;
    const user = await res.json();
    return {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      maidenName: user.maidenName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address?.address || '',
      city: user.address?.city || '',
      postalCode: user.address?.postalCode || '',
    };
  } catch {
    return null;
  }
}

export async function renderCheckoutPage(app: HTMLElement) {
  let cartId = localStorage.getItem('cartId');
  if (!cartId) {
    cartId = String(Math.floor(Math.random() * 10000));
    localStorage.setItem('cartId', cartId);
  }

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    app.innerHTML = '<div class="text-center py-20 text-xl font-semibold">Your cart is empty.</div>';
    return;
  }

  const products = await Promise.all(
    cart.map((item: any) =>
      fetch(`https://dummyjson.com/products/${item.id}`).then(res => res.json())
    )
  );

  let subtotal = 0;
  let discount = 0;
  products.forEach((product, i) => {
    const qty = cart[i].quantity;
    subtotal += product.price * qty;
    discount += Math.round(product.price * (product.discountPercentage / 100)) * qty;
  });
  const total = subtotal - discount;

  let userData: any = {};
  const user = getUserFromStorage();
  if (user?.id) {
    const fetched = await fetchUserData(user.id);
    if (fetched) userData = fetched;
  }

  app.innerHTML = '';
  app.appendChild(createHeader());

  const main = document.createElement('main');
  main.className = 'container px-4 py-8 mx-auto lg:px-24';

  main.innerHTML = `
    <nav class="text-gray-500 text-sm mb-8 font-rubik">
      <a href="/" class="hover:underline">Home</a>
      <span class="mx-2">></span>
      <span class="text-black">Checkout</span>
    </nav>
    <h1 class="text-3xl md:text-4xl font-bold font-poppins mb-6">Checkout</h1>
    <div class="flex flex-col lg:flex-row gap-8">
      <form id="checkout-form" class="flex-1 bg-white rounded-2xl border border-gray-200 p-6 mb-6 flex flex-col gap-4 max-w-xl" autocomplete="off" novalidate>
        <input type="text" name="firstName" placeholder="First name" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.firstName || ''}" required>
        <input type="text" name="lastName" placeholder="Last name" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.lastName || ''}" required>
        <input type="text" name="maidenName" placeholder="Maiden name" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.maidenName || ''}" required>
        <input type="email" name="email" placeholder="Email" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.email || ''}" required>
        <input type="tel" name="phone" placeholder="Phone" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.phone || ''}" required>
        <input type="text" name="address" placeholder="Address" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.address || ''}" required>
        <input type="text" name="city" placeholder="City" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.city || ''}" required>
        <input type="text" name="postalCode" placeholder="Postal code" class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${userData.postalCode || ''}" required>
      </form>
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
          <div class="flex justify-between items-center mt-4 mb-4 text-black text-xl font-bold">
            <span>Total</span>
            <span>$${total}</span>
          </div>
          <button id="go-to-payment" class="bg-black text-white w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 text-lg">
            Go to Payment <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(main);
  app.appendChild(createSubscribeBanner());
  app.appendChild(createFooter());

  const form = main.querySelector<HTMLFormElement>('#checkout-form')!;
  const inputs = Array.from(form.querySelectorAll<HTMLInputElement>('input'));

  function validateField(name: string, value: string): boolean {
    const validator = validators[name as keyof typeof validators];
    return validator ? validator(value) : true;
  }

  function validateAllFields(): boolean {
    let valid = true;
    for (const input of inputs) {
      const isValid = validateField(input.name, input.value.trim());
      setFieldValidation(input, isValid);
      if (!isValid) valid = false;
    }
    return valid;
  }

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const isValid = validateField(input.name, input.value.trim());
      setFieldValidation(input, isValid);
    });
  });

  const goToPaymentBtn = main.querySelector<HTMLButtonElement>('#go-to-payment')!;
  goToPaymentBtn.addEventListener('click', () => {
    if (validateAllFields()) {
      router.navigate(`/payment/${cartId}`);
    }
  });
}
