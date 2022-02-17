const selector = require('../selector');
const helpers = require('../helpers');
const methods = require('./methods');

module.exports = {

    follow: async function (page, entryMethod) {
        if ((await page.$(selector.emExpanded)) == null) {
            await entryMethod.click();
        }
        helpers.passVerification(page);
        try {
            await page.waitForSelector(selector.em_twitterButton, {
                timeout: 3000
            })

            let [popup] = await Promise.all([
                new Promise(resolve => page.once('popup', resolve)),
                await page.click(selector.em_twitterButton)
            ]);

            
            await popup.waitFor('body');
            await popup.waitFor(500);
            await popup.waitForSelector("div[data-testid*=confirmationSheetConfirm]");
            await popup.click("div[data-testid*=confirmationSheetConfirm]");
            await page.bringToFront();
            await page.waitForSelector(' input[class*=twitter-username__field]',{
                timeout: 3000
            });
            let productsList= await page.evaluate((element) => {
                console.log("element",element);
                const productsInnerList = element.querySelectorAll(".twitter-username__field]");
                const productsList=[];
                for (const el of productsInnerList) {
                    productsList.push(el.innerText.trim());
                    console.log("Pushed product " + el.innerText.trim() + " into the product list");
                }
                return productsList;
            });
            await page.$eval(selector.emExpanded + ' input[class*=twitter-username__field]', el => el.value = '@gobizSol');
            await page.click(selector.emExpanded + ' input[class*=twitter-username__field]');
            // let text = await popup.evaluate("document.querySelector('button:not([disabled]) strong').innerText");
            // if (text != 'Following') {
            //     await popup.click("button:not([disabled])");
            //     await popup.waitForFunction("document.querySelector('button:not([disabled]) strong').innerText.includes('Following')");
            // }

            // text = await popup.evaluate("document.querySelector('button:not([disabled]) strong').innerText");
            // if (text != 'Following') {
            //     await popup.click("button:not([disabled])");
            //     await popup.waitForFunction("document.querySelector('button:not([disabled]) strong').innerText.includes('Following')");
            // }

            // await page.waitForSelector(selector.em_continueEnabledButton);
            // await page.click(selector.em_continueEnabledButton);

            // await page.waitForSelector(selector.emExpanded, {
            //     hidden: true
            // });
            // await page.waitForSelector(selector.em_fa_check);
        } catch (error) {}
    },

    tweet: async function (page, entryMethod, entryCurrentIndex, action) {
        try {
            if ((await page.$(selector.emExpanded)) == null) {
                await entryMethod.click();
            }
            helpers.passVerification(page);
            await page.waitForSelector(selector.em_twitterButton, {
                timeout: 3000
            })

            let [popup] = await Promise.all([
                new Promise(resolve => page.once('popup', resolve)),
                await page.click(selector.em_twitterButton)
            ]);
         
            await popup.waitFor('body');
            await popup.waitFor(500);
            await popup.waitForSelector("div[data-testid*=confirmationSheetConfirm]");
            await popup.click("div[data-testid*=confirmationSheetConfirm]");
            await page.bringToFront();
            
                  
            
            // await page.setDefaultNavigationTimeout(0);
            // if ((await page.$(".antigate_solver"))) {
            //     console.log("vào đây")
            //     await page.setDefaultNavigationTimeout(0);
            //     await page.waitForSelector('.antigate_solver.solved', {timeout : 90000}).catch(error => console.log('failed to wait for the selector'));
            // }
            // // con
            // await page.waitForSelector(selector.emExpanded, {
            //     hidden: true
            // });
            // await page.waitForSelector(selector.em_fa_check);
        } catch (error) {
            console.log("error",error);
        }
        try {
            await page.waitForSelector('.expanded  .expandable .twitter-username__field',{
                timeout: 3000
            });
            await page.$eval(selector.emExpanded + ' .twitter-username__field', el => el.value = '@gobizSol');
            await page.click(selector.emExpanded + ".twitter-username__field");      
        }catch (error) {
            console.log("không sét được username");
        }

        try {
            await page.waitForSelector(selector.emExpanded + " a[class*=btn-primary]",{
                timeout: 3000
            });
            await page.click(selector.emExpanded  + " a[class*=btn-primary]");
        } catch (error) {
            console.log("Không thể click next");
        }
        await page.waitFor(2000)

    try {
        await page.waitForSelector('.expanded  .expandable .contestant-form-group input[name=name]',{
            timeout: 3000
        });
        await page.$eval(selector.emExpanded + ' .contestant-form-group input[name*=name]', el => el.value = 'Đặng Thanh Sơn');
        await page.click(selector.emExpanded + ".contestant-form-group input[name*=name]");   
        await page.waitFor(500)
        await page.$eval(selector.emExpanded + ' .contestant-form-group input[name*=email]', el => el.value = 'sondtxx.gvn@gmail.com');
        await page.click(selector.emExpanded + ".contestant-form-group input[name*=email]");
        await page.waitFor(500)
        await page.click(selector.emExpanded  + " button[class*=btn-primary]");
    } catch (error) {
        console.log("Không phải nhập username");
        
    }
    console.log("Solving recapcha ...")
        await page.solveRecaptchas()
        console.log("Capcha Solver");
        // if ((await page.$(".antigate_solver"))) {
        //         console.log("vào đây")
        //         await page.setDefaultNavigationTimeout(0);
        //         await page.waitForSelector('.antigate_solver.solved', {timeout : 90000}).catch(error => console.log('failed to wait for the selector'));
        //     }
        await page.waitFor(2000)
        try {
                await page.waitForSelector(selector.emExpanded + " a[class*=btn-primary]",{
                    timeout: 3000
                });
                await page.click(selector.emExpanded  + " a[class*=btn-primary]");
        } catch (error) {
                console.log("Không thể click next");
        }
    }


}