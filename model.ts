import { Selector, t } from 'testcafe';

//login function
export default class LoginPage {
  private usernameInput: Selector;
  private passwordInput: Selector;
  private loginButton: Selector;

  constructor() {
    this.usernameInput = Selector('#user-name');
    this.passwordInput = Selector('#password');
    this.loginButton = Selector('#login-button');
  }

  async login(username: string, password: string) {
    await t
      .typeText(this.usernameInput, username)
      .typeText(this.passwordInput, password)
      .click(this.loginButton);
  }
}

//products
export class ProductsPage {
  private cartIcon: Selector;
  private addToCartButtons: Selector;
  private cartBadge: Selector;

  constructor() {
    this.cartIcon = Selector('.shopping_cart_link');
    this.addToCartButtons = Selector('.btn_primary');
    this.cartBadge = Selector('.shopping_cart_badge');
  }

  async addItemToCart() {
    await t.click(this.addToCartButtons.nth(0)).click(this.addToCartButtons.nth(1));
  }

  async goToCart() {
    await t.click(this.cartIcon);
  }

  async verifyCartItems(expectedItems: string[]) {
    const cartItems = await this.cartBadge.innerText;
    expectedItems.forEach(async item => {
      await t.expect(cartItems).contains(item);
    });
  }
}

//cart 
export class CartPage {
  private checkoutButton: Selector;

  constructor() {
    this.checkoutButton = Selector('.btn_action');
  }

  async goToCheckout() {
    await t.click(this.checkoutButton);
  }
}

//checkout

export class CheckoutPage {
  private firstNameInput: Selector;
  private lastNameInput: Selector;
  private zipInput: Selector;
  private continueButton: Selector;
  private finishButton: Selector;

  constructor() {
    this.firstNameInput = Selector('#first-name');
    this.lastNameInput = Selector('#last-name');
    this.zipInput = Selector('#postal-code');
    this.continueButton = Selector('.btn_primary');
    this.finishButton = Selector('.btn_action');
  }

  async fillOutInfo(firstName: string, lastName: string, zipCode: string) {
    await t
      .typeText(this.firstNameInput, firstName)
      .typeText(this.lastNameInput, lastName)
      .typeText(this.zipInput, zipCode)
      .click(this.continueButton);
  }

  async completePurchase() {
    await t.click(this.finishButton);
  }
}