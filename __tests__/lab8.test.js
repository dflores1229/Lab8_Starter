describe("Basic user flow for Website", () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto("https://cse110-f2021.github.io/Lab8_Website");
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it("Initial Home Page - Check for 20 product items", async () => {
    console.log("Checking for 20 product items...");
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval("product-item", (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it("Make sure <product-item> elements are populated", async () => {
    console.log(
      "Checking to make sure <product-item> elements are populated..."
    );
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$("product-item");
    console.log(`Checking product item 1/${prodItems.length}`);
    for (let i = 0; i < prodItems.length; i++) {
      const prodItem = prodItems[i];
      // Grab the .data property of each <product-item> to grab all of the json data stored inside
      const data = await prodItem.getProperty("data");
      // Convert that property to JSON
      const plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (
        plainValue.title.length === 0 ||
        plainValue.price.length === 0 ||
        plainValue.image.length === 0
      ) {
        allArePopulated = false;
        break; // If any <product-item> is not populated, exit the loop
      }
      console.log(`Checking product item ${i + 1}/${prodItems.length}`);
    }

    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    const prodItem = await page.$("product-item");
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    const shadowRootHandle = await prodItem.getProperty("shadowRoot");
    // Query the button from the shadowRoot using page.evaluateHandle
    const buttonHandle = await page.evaluateHandle(
      (shadowRoot) => shadowRoot.querySelector("button"),
      shadowRootHandle
    );
    // Click the button
    await buttonHandle.click();
    // Once you have the button, you can click it and check the innerText property of the button.
    await page.waitForTimeout(500);
    // Get the innerText property of the button
    const buttonT = await page.evaluate(
      (button) => button.innerText,
      buttonHandle
    );
    // Expect the button text to be "Remove from Cart"
    expect(buttonT).toBe("Remove from Cart");
    await buttonHandle.click();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it("Checking number of items in cart on screen", async () => {
    console.log("Checking number of items in cart on screen...");
    // Query select all of the <product-item> elements, then for every single product element
    const prodItems = await page.$$("product-item");
    // get the shadowRoot and query select the button inside, and click on it.
    // Loop through each <product-item> element
    for (let i = 0; i < prodItems.length; i++) {
      // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
      const shadowRootHandle = await prodItems[i].getProperty("shadowRoot");
      // Query the button from the shadowRoot using page.evaluateHandle
      const button = await page.evaluateHandle(
        (shadowRoot) => shadowRoot.querySelector("button"),
        shadowRootHandle
      );
      // Click the button
      await button.click();
    }
    // Get the innerText property of the #cart-count element
    const cartCount = await page.$eval(
      "#cart-count",
      (element) => element.innerText
    );
    // Expect the cart count to be "20"
    expect(cartCount).toBe("20");
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it("Checking number of items in cart on screen after reload", async () => {
    console.log("Checking number of items in cart on screen after reload...");
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20
    // Reload the page
    await page.reload();
    // await page.waitForSelector("product-item");

    // Select all of the <product-item> elements
    const prodItems = await page.$$("product-item");

    // Check every element to make sure their buttons say "Remove from Cart"
    for (let i = 0; i < prodItems.length; i++) {
      const shadowRootHandle = await prodItems[i].getProperty("shadowRoot");
      const button = await page.evaluateHandle(
        (shadowRoot) => shadowRoot.querySelector("button"),
        shadowRootHandle
      );
      // Get the updated innerText property of the button
      const buttonText = await page.evaluate(
        (button) => button.innerText,
        button
      );
      // Expect the button text to be "Remove from Cart"
      expect(buttonText).toBe("Remove from Cart");
    }
    // Check that #cart-count is still 20
    const cartCount = await page.$eval(
      "#cart-count",
      (element) => element.innerText
    );
    expect(cartCount).toBe("20");
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it("Checking the localStorage to make sure cart is correct", async () => {
    const cartValue = await page.evaluate(() => {
      // Retrieve the value of 'cart' from localStorage
      return localStorage.getItem("cart");
    });

    const expectedCartValue =
      "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]";

    // Use the `expect` function to assert that the cartValue matches the expected value
    expect(cartValue).toBe(expectedCartValue);
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it("Checking number of items in cart on screen after removing from cart", async () => {
    console.log("Checking number of items in cart on screen...");
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval("product-item", (prodItems) => {
      return prodItems.length;
    });

    expect(numProducts).tobe(0);
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it("Checking number of items in cart on screen after reload", async () => {
    console.log("Checking number of items in cart on screen after reload...");
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval("product-item", (prodItems) => {
      return prodItems.length;
    });

    expect(numProducts).tobe(0);
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it("Checking the localStorage to make sure cart is correct", async () => {
    console.log("Checking the localStorage...");
    // TODO - Step 8
    // At this point the item 'cart' in localStorage should be '[]', check to make sure it is

    let cart = localStorage.getItem("cart");
    console.log(cart);
    if (cart === "[]") {
      correctOutput = true;
    }

    // Expect correctOutput to still be true
    expect(correctOutput).toBe(true);
  });
});
