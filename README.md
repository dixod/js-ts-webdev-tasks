# SDC JavaScript/TypeScript Shop.co Website

Your team task is to implement Frontend and Backend for E-Commerce Website

[[_TOC_]]

## Frontend

### Technical Requirements

- Vite 5 https://vitejs.dev/
- TypeScript 5 https://www.typescriptlang.org/
- ESLint (with TS rules)
- Prettier
- HTML5 https://www.w3.org/TR/2011/WD-html5-20110405/
- CCS3/SCSS/SASS/Less or any other approach
  - if you are not using any CCS library, then it's a must to choose one CCS approach and follow it https://www.ianholden.co.uk/blog/css-architecture-bem-oocss-smacss-acss-and-why-we-need-it
- CSS libraries (with required JS/TS for some components like Modals, Tabs, Pagination, etc), possible choise:
  - Tailwind CSS https://tailwindcss.com/
  - Bulma https://bulma.io/
  - Bootstrap https://getbootstrap.com/
  - See more at https://github.com/troxler/awesome-css-frameworks
- Responsive design support. If you chose CSS library, then follow already defined screen widths there, if not then:
  - Mobile up to 600px
  - Desktop from 1024px
- Fonts
  - Rubik https://fonts.google.com/specimen/Rubik
  - Poppins https://fonts.google.com/specimen/Poppins
- Router, possible choise:
  - https://www.npmjs.com/package/navigo
  - https://npmjs.com/package/yourrouter
  - custom implementation
- Redux store if it's needed to share data between pages or different components (NOT REACT!!!) for example `userId`, `cartId`
- localStorage/sessionStorage to save data to prevent it lost after page refresh https://learn.javascript.ru/localstorage
- Fetch API https://learn.javascript.ru/fetch-api or Axios https://axios-http.com/ for communication with Backend

### Design

Figma Design Link https://www.figma.com/file/Q0zYyVhjvTQMKg8tqtUPLB/E-commerce-Website-Template-(Freebie)-(Community)?type=design&node-id=0%3A1&mode=design&t=XmMnUq455lfxiTnI-1

Alternativly all screens could be found in `frontend/design` folder

### Pages

- Homepage
- Category Page
- Product Detail Page
- Cart
- Order confirmation

#### Homepage

- URL `/`
- Shop now button scrolls to the Categories section
- Categories sections display all available categories
  - Backend call `GET /products/categories`
  - Each category is displayed in rectangle with a title inside (words should be breaking as it is shown on the design)
- Click on any category opens "Category page" for the selected category: `/category/:categoryName`

#### Category Page

- URL: `category/:categoryName` where `categoryName` is the dynamic name of the selected category i.e. `category/skincare`, `category/laptops`
- All products related to the selected category should be displayed
  - Backend call to get products in the category `GET /products/category/:categoryName`
- Click on any product opens "Product Detail Page" for the selected product: `/product/:productId`
- Filters panel
  - Brand filters should contain all brands from the products inside category
  - Each brand is selectable
  - Selected brand is shown in bold font, unselected - in regular font
  - Price filter minimum value is 10$, maximum value is 2000$
  - Apply filter button should filter products on the right side and show only those which are satisfied filter params (brand and price)
  - Reset filter button should reload products in the selected category from Backend
  - On Mobile screen filters panel could be opened by clicking filter icons on the right side of the Category Name title
  - On Mobile screen filters panel could be closed by clicking on the cross icon on the right side on overflow or by clicking buttons Apply filter or Reset Filter

#### Product Detail Page

- URL: `/product/:productId` where `productId` is the dynamic id of the product i.e. `product/17`, `product/5`
- Image gallery displays the first image as the main image and the rest as the alternatives
- Add to cart should add selected amount of a product to the cart
  - if cart is not existed (no any items in the cart yet), then there is a need to create a new cart with selected amount of products: Backend call `POST /carts` and save cart id and products list in the cart on the Frontend
  - if cart is already existed (there are few items already),
    then there is a need to update a cart: Backend call `POST /carts` and update saved cart id and products list in the cart on the Frontend

#### Cart Page

- URL: `/carts/:cartId` where `cartId` is the dynamic id of the cart i.e. `carts/5`, `carts/1`
- `Go to checkout` button must have text `Place an order` and opens a new page `Order Confirmation`

#### Order Confirmation

- URL: `/confirmation`
- When a user appears on the page, set up a timer for 5 seconds. When the timer is finished, redirect a user to the `Homepage`

### Components

#### Header

- Click on logo opens `Homepage`
- Click on `cart` icon opens `Cart` page
  - If the cart is empty or not exists, display a message `Cart is empty` on `Cart` page (the same UI as on `Order Confirmation` page but different text inside)
  - otherwise display current cart

#### Subscribe banner

- Field to enter a email address
- Support validation for email input
- Click on `Subscribe to Newsletter` send mock Backend request with (setTimeout wrapped in Promise) and rerender component with a text `Success! You've subscribed to our newslatter.`

## Backend

### Technical Requirements

- REST API Node.js server
    - Allowed to use Express.js, Koa.js
- TypeScript 5 https://www.typescriptlang.org/
- ESLint (with TS rules)
- Prettier

### Routes

#### Get all products 

- GET `/products`
- 

## Evaluation criteria - max 10 points

### Render of pages (HTML, CSS, TS) - maximum 5 points

- Homepage <b>1 points</b>
- Category Page <b>1 points</b>
- Product Detail Page <b>1 points</b>
- Cart <b>1 points</b>
- Order confirmation <b>1 points</b>

### Backend - 4 points

### Completed scenarious - maximum 1 points (1 point for each)

#### Scenario 1 - order several items

- Open homepage
- Open some category
- Open some item
- Add to cart
- Navigate homepage
- Select another category
- Open another item
- Add to cart
- Open cart
- Place an order
- Reach order confirmation page
