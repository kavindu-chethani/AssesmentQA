import { Selector } from 'testcafe';
import faker from 'faker';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// fixture function to define a test fixture that loads the website's URL before each test run

fixture`Sauce Demo`.page`https://www.saucedemo.com`;


//Purchase Products logs into the system using the provided credentials, 
//verifies the price of the Fleece Jacket product, adds two products to the cart, 
//navigates to the cart page, verifies that the selected products are present in the cart,
// proceeds to checkout, fills in checkout information using Faker, and completes the purchase. 
//Finally, it verifies that the purchase was successful by checking the confirmation message.


test('Purchase Products', async (t) => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();



  // Login
  await loginPage.login('performance_glitch_user', 'secret_sauce');



  // Verify price of Fleece Jacket
  const fleeceJacketPrice = await productsPage.getProductPrice('Sauce Labs Fleece Jacket');
  await t.expect(fleeceJacketPrice).eql('$49.99');



  // Add two products to cart
  await productsPage.addProductToCart('Sauce Labs Fleece Jacket');
  await productsPage.addProductToCart('Sauce Labs Backpack');



  // Navigate to cart and verify selected products are present
  await productsPage.navigateToCart();
  await t.expect(cartPage.isProductInCart('Sauce Labs Fleece Jacket')).ok();
  await t.expect(cartPage.isProductInCart('Sauce Labs Backpack')).ok();



  // Proceed to checkout
  await cartPage.checkout();


  // Fill checkout information
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const zipCode = faker.address.zipCode();
  await checkoutPage.fillCheckoutInformation(firstName, lastName, zipCode);


  // Proceed to finish purchase
  await checkoutPage.continue();
  await checkoutPage.finish();



  // Verify purchase was successful
  await t.expect(checkoutPage.getConfirmationMessage()).eql('THANK YOU FOR YOUR ORDER');

  
});