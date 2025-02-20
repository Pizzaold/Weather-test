import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/firefox';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Weather App Selenium Tests', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    const options = new Options()
      .addArguments('--headless')
      .addArguments('--no-sandbox')
      .addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should search for a city and display weather information', async () => {
    await driver.manage().setTimeouts({ implicit: 10000 });

    try {
      await driver.get('http://localhost:5173');

      // Wait for the search input and enter the city Tartu
      const searchInput = await driver.wait(
        until.elementLocated(By.className('search-input')),
        10000,
        'Search input not found'
      );
      await driver.wait(
        until.elementIsVisible(searchInput),
        10000,
        'Search input not visible'
      );
      await searchInput.sendKeys('Tartu');

      // Wait for the search button and click on it
      const searchButton = await driver.wait(
        until.elementLocated(By.className('search-button')),
        10000,
        'Search button not found'
      );
      await searchButton.click();

      // Wait for the first search result and click on it
      const firstResult = await driver.wait(
        until.elementLocated(By.className('city-item')),
        10000,
        'Search results not found'
      );
      await firstResult.click();

      // Wait for the weather card
      const weatherCard = await driver.wait(
        until.elementLocated(By.className('weather-card')),
        10000,
        'Weather card not found'
      );

      // Wait for the city name
      const cityName = await weatherCard.findElement(By.css('h2'));
      const cityText = await cityName.getText();
      expect(cityText).toBe('Tartu');

      // Wait for the temperature
      const temperature = await weatherCard.findElement(By.className('temperature'));
      expect(await temperature.isDisplayed()).toBe(true);
      console.log(await temperature.getText());
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  }, 15000);
});
