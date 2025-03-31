# Hometask JavaScript Events

Your task is to develop a webpage according to the provided Figma design.

On the provided page you will find two sections: the list of items (Jackets & Coats, Hoodies, etc) on the left and the products on the right.

For the left section there is a need to handle click evens on each item (Jackets & Coats, Hoodies, etc). If a user clicks on any item, it must be colored with a color (like it's now in Figma on T-shirts & Vests item). The previous clicked item must be colored as the rest items in grey color.

Advice: create a JavaScript array of objects or strings for storing data for rendering and then pass it JavaScript DOM API functions to create and attach DOM elements.

Example (for the left section)

```js
const NAVIGATION_LIST_ITEMS = [
  "Jackets & Coats",
  "Hoodies",
  "T-shirts & Vests",
];

const fragment = document.createDocumentFragment();
NAVIGATION_LIST_ITEMS.forEach((item) => {
  const element = document.createElement("li");
  element.textContent = item;
  fragment.append(li);
});

const ul = document.createElement("ul");
ul.append(fragment);
document.body.append(ul);
```

## Figma design

In Figma navigate to `Pages -> Ecommerce [NEW] -> ecommerce_5`

Figma design link: https://www.figma.com/design/AJqg3a4WEZ2MHKzZZcl5FY/Free-Figma-Website-Landing-Pages---Startup-App-(Community)-(Copy)?node-id=0-3825&node-type=canvas&t=kZ1GJwCxy7ZAQKWl-0

## Requirements

- Only one `index.html` file is allowded for all HTML code
- Only one `style.css` file is allowded for all CSS code
- Only one `main.js` file is allowded for all JS code
- Create a folder named `assets` to store images and fonts downloaded from Figma (hint: fonts could be imported from google fonts in CSS file)
- For CSS you could create your own code or choose one of the following CSS Frameworks/libriares:
  - Bulma http://bulma.io/
  - Bootstrap https://getbootstrap.com/
  - TailwindCSS https://github.com/tailwindcss/tailwindcss

## Evaluation criterias - max 10 points

- Usage of three files (index.html, style.css, main.js) - 1 points
- Usage of downloaded assets (images, fonts) - 1 point
- Usage of DOM API functions to create HTML tags and attach to DOM - 4 points
- Create a page according to the provided Figma design - max 2 points including:
  - Left section - 1 point
  - Right section - 1 point
- Handle click events on the left section and do required action - 2 points
