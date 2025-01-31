/* 
                       TEST CASE 
          Test Case ID = TC001
          Test Case Name = Selecting car brand and model on Turbo.az website
          Module = carOptions
          Description = To verify that the selection of a car brand (BMW) and model (e.g., 5 Series) works correctly on the Turbo.az website.
          Preconditions: 1.Internet connection is available.
                         2.Chrome browser is installed and operational.
                         3.selenium-webdriver and chromedriver are installed.
                        

          Test Steps : 1.Launch Chrome browser and navigate to https://turbo.az.
                       2.Locate and click the "Brand" dropdown element.
                       3.Locate and click the "BMW" option in the brand selection menu.
                       4.Locate and click the "Model" dropdown element.
                       5.Locate and click the "320" option in the model selection menu.

          Expected results : 1.The "BMW" brand and "320" model are successfully selected.
                             2.The selections are applied correctly.

          Postcondition : 1.The browser is closed.             

*/

const { Builder, By, until, Key } = require('selenium-webdriver');
const { titleContains } = require('selenium-webdriver/lib/until');

async function carSearch() {
    let driver = await new Builder().forBrowser('chrome').build();
    

    try {
        // Sayta getmək
        await driver.get('https://turbo.az');

        // Car brand dropdown elementini tapmaq və klikləmək
        let carBrandDropdown = await driver.findElement(By.xpath('//*[@id="new_q"]/div/div[2]/div[1]/div/div[1]')); 
        await carBrandDropdown.click();

        // Elementin görünməsini gözləmək
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//*[@id="new_q"]/div/div[2]/div[1]/div/div[2]'))), 5000);

        // Seçimi tapıb klikləmək
        let carBrand = await driver.findElement(By.xpath('//*[@id="new_q"]/div/div[2]/div[1]/div/div[2]/div/div[18]/div'));
        await driver.wait(until.elementIsVisible(carBrand),5000).click()

         let carModelDropdown = await driver.findElement(By.xpath('//*[@id="new_q"]/div/div[2]/div[2]/div/div[1]'))
         await carModelDropdown.click()

         await driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//*[@id="new_q"]/div/div[2]/div[2]/div/div[2]'))),5000)
         let carModel = await driver.findElement(By.xpath('//*[@id="new_q"]/div/div[2]/div[2]/div/div[2]/div/div[12]/label/span[1]')).click()
        
         let searchButton = await driver.findElement(By.xpath('//*[@id="new_q"]/div/div[5]/div[2]/button'))
         await searchButton.click()

        let siteTitleContains = await driver.wait(until.titleContains('BMW'),5000)


        
    } catch (err) { 
        console.log('Error: ', err); // Səhv mesajını konsola çap et
    } finally {

        if(siteTitleContains = true){
            console.log('Test case passed correctly.') ;     
        } 
        else{
            console.log ('Test failed.')
        }
       // Test bitdikdən sonra browserı bağla
       driver.quit()
    }
}

carSearch();



//GITHUB 









