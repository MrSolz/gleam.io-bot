import { getMethodName } from './libs/helpers';
import { checkIfAvailable } from './libs/helpers';
import { passVerification } from './libs/helpers';
import { emVisible } from './libs/selector';
import methods from './libs/methods/methods';
import facebook from './libs/methods/facebook';
import instagram from './libs/methods/instagram';
import youtube from './libs/methods/youtube';
import { tweet } from './libs/methods/twitter';
import twitch from './libs/methods/twitch';
import { custom as _custom } from './libs/methods/custom';
const action = async (page, entryMethods, entryCurrentIndex) => {
    let entryMethod = entryMethods[entryCurrentIndex];
    let methodName = await getMethodName(page, entryMethod);
    switch (methodName) {
        // case '###APP_NAME### Click|facebook|visit': {
        //     console.log('✔️  ' + methodName);
        //     await facebook.visit(page, entryMethod);
        //     break;
        // }
        // case '###APP_NAME### Click|instagram|visit_profile': {
        //     console.log('✔️  ' + methodName);
        //     await instagram.visit(page, entryMethod);
        //     break;
        // }
        // case '###APP_NAME### Click|youtube|visit_channel': {
        //     console.log('✔️  ' + methodName);
        //     await instagram.visit(page, entryMethod);
        //     break;
        // }

        // case '###APP_NAME### Click|facebook|enter': {
        //     console.log('✔️  ' + methodName);
        //     await facebook.enter(page, entryMethod);
        //     break;
        // }
        // case '###APP_NAME### Click|youtube|enter': {
        //     console.log('✔️  ' + methodName);
        //     await youtube.enter(page, entryMethod);
        //     break;
        // }
        // case '###APP_NAME### Click|instagram|enter': {
        //     console.log('✔️  ' + methodName);
        //     await instagram.enter(page, entryMethod);
        //     break;
        // }
        // case '###APP_NAME### Click|email|subscribe': {
        //     console.log('✔️  ' + methodName);
        //     await methods.enter(page, entryMethod);
        //     break;
        // }

        case '###APP_NAME### Click|twitter|follow': {
            console.log('✔️  ' + methodName);
            await tweet(page, entryMethod, entryCurrentIndex, action);
            break;
        }
        // case '###APP_NAME### Click|twitter|tweet': {
        //     console.log('✔️  ' + methodName);
        //     await twitter.tweet(page, entryMethod);
        //     break;
        // }
        // case '###APP_NAME### Click|twitter|retweet': {
        //     console.log('✔️  ' + methodName);
        //     await twitter.x1(page, entryMethod);
        //     break;
        // }
        // case '###APP_NAME### Click|twitchtv|follow': {
        //     console.log('✔️  ' + methodName);
        //     await twitch.follow(page, entryMethod);
        //     break;
        // }

        // case '###APP_NAME### Click|instagram|view_post': {
        //     console.log('✔️  ' + methodName);
        //     await instagram.view(page, entryMethod);
        //     break;
        // }

        // case '###APP_NAME### Click|facebook|view_post': {
        //     console.log('✔️  ' + methodName);
        //     await facebook.view(page, entryMethod);
        //     break;
        // }

        default: {
            if (methodName.includes('###CUSTOM###')) {
                await _custom(page, entryMethod, methodName);
            } else {
                console.log("❌ " + methodName);
                console.log("index", entryMethods.length , entryCurrentIndex + 1);
                if(entryMethods.length > entryCurrentIndex + 1){
                   await action(page, entryMethods, entryCurrentIndex + 1)
                }
            }
            break;
        }
    }
}
export async function grind(browser, url) {
    const page = (await browser.pages())[0];
    try {
        await page.goto(url, {
            waitUntil: "networkidle0"
        });
    } catch (e) {
        console.error('err while loading the page: ' + e);
    }
    // await page.waitForSelector(".antigate_solver", {timeout : 2000})
    // await page.waitFor(500);
    // if (await page.$(".antigate_solver")) {
    //     console.log("vào đây")
    //     await page.setDefaultNavigationTimeout(0);
    //     await page.waitForSelector('.antigate_solver .solved', {timeout : 90000}).catch(error => console.log('failed to wait for the selector'));
    // }
    console.log("Solving recapcha ...");
    await page.solveRecaptchas();
    console.log("Capcha Solver");

    // await page.solveRecaptchas()
    // await page.waitForNavigation()
    // await Promise.all([
    //   page.waitForNavigation(),
    //   // setTimeout(() => {page.click(`#sw_login_button`)}, 20000)
    // ])
    console.log(url);

    if ((await checkIfAvailable(page)) == true) {
        await passVerification(page);

        // for (let i = 0; i < 2; i++) {
        let entryMethods = await page.$$(emVisible);
        console.log(entryMethods.length);
        action(page, entryMethods, 0);
        // for await (entryMethod of entryMethods) {
        //     let methodName = await getMethodName(page, entryMethod);
        //     console.log("methodName",methodName);
        // }
        // }
    }
    console.log('KONIEC');
}