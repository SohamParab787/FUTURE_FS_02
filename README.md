# MyStore React E-Commerce

Welcome to **MyStore** — a simple, modern React-based e-commerce web application where you can browse products, search by categories, add items to your cart, and manage your orders. It also includes a basic login/logout system (no admin panel).


## Features

* Browse products by category or search keywords
* View detailed product pages
* Add products to a persistent shopping cart
* Checkout flow with order success confirmation
* User authentication with login/logout functionality (demo auth, no real password validation)
* Responsive UI with a sticky navbar for smooth navigation
* Clean and modular React code with context API for state management


## Getting Started

### Prerequisites

* Node.js (v14 or higher recommended)
* npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mystore-react.git
   cd mystore-react
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`


## How to Use

* Browse products on the home page or via the “Products” menu.
* Use the search bar or category dropdown to filter products.
* Click a product to see its details.
* Add products to your cart, then proceed to checkout.
* Log in with any username (password ignored) to simulate authentication.
* Use the **Login** button on the navbar to log in; once logged in, you can logout anytime.


## Project Structure

* `/src/components` — Reusable UI components like Navbar and Footer
* `/src/context` — React context providers for Products, Cart, and Auth
* `/src/pages` — Page components (Home, ProductList, ProductDetail, Cart, Login, etc.)
* `/src/App.js` — Main app with route definitions and protected routes


## Notes

* This app uses demo authentication — **any username/password combination works**.
* No admin panel or role-based access control is implemented.
* Cart and user login state persist in browser localStorage.
* Styling is based on Bootstrap 5 for quick responsiveness.


## Future Improvements

* Implement real authentication with backend API
* Add admin panel for product management
* Enhance UI/UX with animations and better feedback
* Improve error handling and form validations
* Add payment gateway integration for checkout


