import { createHeader } from '../components/Header';
import { createFooter } from '../components/Footer';
import { createSubscribeBanner } from '../components/SubscribeBanner';
import { router } from '../router';

function validateCardNumber(value: string): boolean {
  const digits = value.replace(/\s+/g, '');
  return /^\d{15,19}$/.test(digits) && digits.length >= 15 && digits.length <= 19;
}
function validateCardExpire(value: string): boolean {
  return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
}
function validateIban(value: string): boolean {
  return /^[A-Z]{2}\d{2}(?: ?\d{4}){3,}$/.test(value);
}
function formatCardNumber(value: string, cartId: string): string {
  const digits = value.replace(/\D/g, '');
  let groups: string[] = [];
  let i = 0;
  while (i < digits.length) {
    if (i + 4 >= digits.length - 5 && cartId === '5') {
      groups.push(digits.slice(i, i + 5));
      i += 5;
    } else {
      groups.push(digits.slice(i, i + 4));
      i += 4;
    }
  }
  return groups.join(' ').trim();
}

function setFieldValidation(input: HTMLInputElement, valid: boolean) {
  input.classList.remove('border-gray-200', 'border-red-500');
  input.classList.add(valid ? 'border-gray-200' : 'border-red-500');
  input.classList.remove(valid ? 'border-red-500' : 'border-gray-200');
}

async function fetchUserBank(userId: number) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!res.ok) return null;
    const user = await res.json();
    return user.bank || {};
  } catch {
    return {};
  }
}

function getUserFromStorage(): { id: number } | null {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
}

export async function renderPaymentPage(app: HTMLElement, cartId: string) {
  app.innerHTML = '';
  app.appendChild(createHeader());

  let bank: any = {};
  const user = getUserFromStorage();
  if (user?.id) {
    const fetched = await fetchUserBank(user.id);
    if (fetched) bank = fetched;
  }

  let cardNumberUI = '';
  if (bank.cardNumber) {
    cardNumberUI = formatCardNumber(bank.cardNumber, cartId);
  }

  const main = document.createElement('main');
  main.className = 'container px-4 py-8 mx-auto lg:px-24';

  main.innerHTML = `
    <nav class="text-gray-500 text-sm mb-8 font-rubik">
      <a href="/" class="hover:underline">Home</a>
      <span class="mx-2">></span>
      <a href="/cart/${cartId}" class="hover:underline">Cart</a>
      <span class="mx-2">></span>
      <span class="text-black">Payment</span>
    </nav>
    <h1 class="text-3xl md:text-4xl font-bold font-poppins mb-6">Payment</h1>
    <form id="payment-form" class="max-w-xl bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4" autocomplete="off" novalidate>
      <input type="text" name="cardNumber" placeholder="Card Number" maxlength="23"
        class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${cardNumberUI || ''}" required>
      <input type="text" name="cardExpire" placeholder="MM/YY"
        class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${bank.cardExpire || ''}" required>
      <input type="text" name="iban" placeholder="IBAN"
        class="bg-gray-100 rounded-full px-5 py-4 text-lg border border-gray-200" value="${bank.iban || ''}" required>
      <button id="place-order" class="bg-black text-white w-full py-3 rounded-full font-bold mt-4 flex items-center justify-center gap-2 text-lg" type="submit">
        Place an order <span aria-hidden="true">→</span>
      </button>
    </form>
  `;

  app.appendChild(main);
  app.appendChild(createSubscribeBanner());
  app.appendChild(createFooter());

  const form = main.querySelector<HTMLFormElement>('#payment-form')!;
  const cardInput = form.querySelector<HTMLInputElement>('input[name="cardNumber"]')!;
  const expireInput = form.querySelector<HTMLInputElement>('input[name="cardExpire"]')!;
  const ibanInput = form.querySelector<HTMLInputElement>('input[name="iban"]')!;

  cardInput.addEventListener('input', () => {
    let formatted = formatCardNumber(cardInput.value, cartId);
    cardInput.value = formatted;
    setFieldValidation(cardInput, validateCardNumber(formatted));
  });
  expireInput.addEventListener('input', () => {
    let v = expireInput.value.replace(/[^\d]/g, '');
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
    expireInput.value = v.slice(0, 5);
    setFieldValidation(expireInput, validateCardExpire(expireInput.value));
  });
  ibanInput.addEventListener('input', () => {
    setFieldValidation(ibanInput, validateIban(ibanInput.value));
  });

  function validateAll(): boolean {
    const validCard = validateCardNumber(cardInput.value);
    const validExpire = validateCardExpire(expireInput.value);
    const validIban = validateIban(ibanInput.value);
    setFieldValidation(cardInput, validCard);
    setFieldValidation(expireInput, validExpire);
    setFieldValidation(ibanInput, validIban);
    return validCard && validExpire && validIban;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    await fetch(`https://dummyjson.com/carts/${cartId}`, { method: 'DELETE' });

    router.navigate(`/confirmation`);
  });
}