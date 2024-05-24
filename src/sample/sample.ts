import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as csv from 'csv-parser';



interface Item {
    items: string;
}

async function parseCSV(filePath: string): Promise<Item[]> {
    return new Promise((resolve, reject) => {
        const results: Item[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

async function main() {
    const browser: Browser = await chromium.launch({ headless: false });
    const page: Page = await browser.newPage();

    const items = await parseCSV('src/sample/test-data.csv'); 
    console.log('CSV Data:', items);

    try {
        // 1. Open the website
        await page.goto('https://www.saucedemo.com/');
        await page.waitForTimeout(6000);

        // 2. Login
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        //await page.waitForTimeout(6000);

         // 3. Add items to cart
         const itemSelectors = {
            "Sauce Labs Backpack": '#add-to-cart-sauce-labs-backpack',
            "Sauce Labs Bike Light": '#add-to-cart-sauce-labs-bike-light',
            "Sauce Labs Bolt T-Shirt": '#add-to-cart-sauce-labs-bolt-t-shirt'
        };
      
        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('#add-to-cart-sauce-labs-bike-light');
        await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
      /*  for (const item of items) {
            const selector = itemSelectors[item.items];
            console.log(selector);
            if (selector) {
                await page.click(selector);
                console.log(`Item added to cart: ${item.items}`);
            } else {
                throw new Error(`Item not found on landing page: ${item.items}`);
            }
        }*/
        await page.waitForTimeout(6000);

        // 6. Go to cart
        await page.click('.shopping_cart_link');
        await page.waitForTimeout(6000);

        // 7. Remove “Sauce Labs Bike Light”
        await page.click('#remove-sauce-labs-bike-light');
        await page.waitForTimeout(6000);

        // 8. Click “Checkout”
        await page.click('#checkout');
        await page.waitForTimeout(6000);

        // 9. Provide First Name, Last Name, Zip Code
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.waitForTimeout(6000);

        // 10. Click “Continue”
        await page.click('#continue');
        await page.waitForTimeout(6000);

        // 11. Click Shopping cart link
         await page.click('.shopping_cart_link');
        await page.waitForTimeout(6000);

         // 12. Remove “Sauce Labs Bolt T-Shirt”
       await page.click('#remove-sauce-labs-bolt-t-shirt');
        await page.waitForTimeout(6000);

        // 13. Click “Checkout”
        await page.click('#checkout');
        await page.waitForTimeout(6000);

        // 14. Provide First Name, Last Name, Zip Code
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.waitForTimeout(6000);

        await page.click('#continue');
        await page.waitForTimeout(6000);

        // 15. On Checkout: Overview screen, check the total price
        const totalPriceElement = await page.$('.summary_total_label');
        if (totalPriceElement) {
            const totalPriceText = await totalPriceElement.textContent();
            if (totalPriceText) {
                const totalPrice = parseFloat(totalPriceText.replace('Total: $', ''));

                if (totalPrice < 40.00) {
                    // 16. Click “Finish”
                    await page.click('#finish');
                    await page.waitForTimeout(6000);
                    // Verify thank you message
                    const thankYouMessage = await page.textContent('.complete-header');
                    if (thankYouMessage !== 'Thank you for your order!') {
                        throw new Error('Order confirmation message not as expected');
                    }
                } else {
                    // Click cancel button
                    await page.click('#cancel');
                }
            } else {
                throw new Error('Total price text is null');
            }
        } else {
            throw new Error('Total price element not found');
        }

        // 17. Click “Back Home”
        await page.click('#back-to-products');
        await page.waitForTimeout(6000);

        // 18. Log Out from the webapp
        await page.click('#react-burger-menu-btn');
        await page.waitForTimeout(6000);
        await page.click('#logout_sidebar_link');
        await page.waitForTimeout(6000);

    } catch (error) {
        console.error(error);
    } finally {
        await browser.close();
    } 
}
     
main();
