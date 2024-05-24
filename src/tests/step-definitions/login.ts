import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import csvParser from 'csv-parser';
import * as fs from 'fs';

let browser: Browser;
let page: Page;
let credentials: { username: string, password: string }[] = [];

fs.createReadStream('data/test-data.csv')
  .pipe(csvParser())
  .on('data', (data) => credentials.push(data))
  .on('end', () => {
    console.log(credentials);
  });

/*Given('I navigate to the login page', async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  await page.goto('https://example.com/login');
});

When('I enter valid credentials', async () => {
  const { username, password } = credentials[0]; // Use first set of credentials
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
});

Then('I should see the dashboard', async () => {
  await page.waitForSelector('#dashboard');
  await browser.close();
});*/

Given('I navigate to the login page', function () {
  console.log("test");
});

When('I enter valid credentials', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('I should see the dashboard', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});