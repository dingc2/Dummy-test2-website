const { Builder, By, until, WebDriver } = require('selenium-webdriver');

async function runTest() {
    // Initialize the WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open the HTML page
        await driver.get('http://localhost:3000'); // Replace with the correct path to your HTML file

        // Verify the presence of the header
        let header = await driver.findElement(By.css('header h1'));
        let headerText = await header.getText();
        console.log(`Header text is: ${headerText}`);
        if (headerText !== 'My Dummy Website') {
            throw new Error('Header text does not match');
        }

        // Verify the presence of the paragraph and its initial text
        let paragraph = await driver.findElement(By.id('testParagraph'));
        let paragraphText = await paragraph.getText();
        console.log(`Paragraph text is: ${paragraphText}`);
        if (paragraphText !== 'This is a test paragraph.') {
            throw new Error('Paragraph text does not match');
        }

        // Click the button to change the text
        let changeTextButton = await driver.findElement(By.css('button.btn-primary'));
        await changeTextButton.click();

        // Wait for the paragraph text to change
        await driver.wait(until.elementTextIs(paragraph, 'THIS IS CHANGED'), 5000);

        // Verify the paragraph text has changed
        let newParagraphText = await paragraph.getText();
        console.log(`New paragraph text is: ${newParagraphText}`);
        if (newParagraphText !== 'THIS IS CHANGED') {
            throw new Error('Paragraph text did not change as expected');
        }

        // Click the button to make the page go poof
        let poofButton = await driver.findElement(By.xpath("//button[text()='MAKE PAGE GO POOF']"));
        await poofButton.click();

        // Wait for the page to change
        await driver.sleep(2000); // Give some time for the document.write to execute

        // Verify the page content has changed
        let bodyContent = await driver.findElement(By.tagName('body')).getText();
        console.log(`Body content after poof button: ${bodyContent}`);
        if (bodyContent !== 'HEHE') {
            throw new Error('Page content did not change as expected');
        }
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

runTest().catch(error => console.error(error));
