// first run the following to install required npm packages:
//
// npm install adm-zip follow-redirects puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
//
//
const https = require('follow-redirects').https;
const fs = require('fs');
const AdmZip = require("adm-zip");

const apiKey = '9698fd97edbeef9b41a90971059c8d24';
const pluginURL = 'https://antcpt.com/anticaptcha-plugin.zip';
const url = 'https://anti-captcha.com/tutorials/v2-textarea';
const login = 'Test login';
const password = 'Test password';
let page = null;
const PROFILE_PATH = '/Users/sondt/Library/Application Support/Chromium/Profile 1';

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
    // download the plugin
    // await new Promise((resolve) => {
    //     https.get(pluginURL, resp => resp.pipe(fs.createWriteStream('./plugin.zip').on('close', resolve)));
    // })
    // // unzip it
    // const zip = new AdmZip("./plugin.zip");
    // await zip.extractAllTo("./plugin/", true);

    // // set API key in configuration file
    // await new Promise((resolve, reject) => {
    //     if (fs.existsSync('./plugin/js/config_ac_api_key.js')) {
    //         let confData = fs.readFileSync('./plugin/js/config_ac_api_key.js', 'utf8');
    //         confData = confData.replace(/antiCapthaPredefinedApiKey = ''/g, `antiCapthaPredefinedApiKey = '${apiKey}'`);
    //         fs.writeFileSync('./plugin/js/config_ac_api_key.js', confData, 'utf8');
    //         resolve();
    //     } else {
    //         console.error('plugin configuration not found!')
    //         reject();
    //     }
    // });

    // set browser launch options
    const options = {
        headless: false,
        userDataDir: "/Users/sondt/Library/Application Support/Google/Chrome/Default",
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        ignoreDefaultArgs: [
            "--disable-extensions",
            "--enable-automation"
        ],
        args: [
            '--disable-features=IsolateOrigins,site-per-process',
            '--allow-running-insecure-content',
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--mute-audio',
            '--no-zygote',
            '--no-xshm',
            '--window-size=1920,1080',
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--enable-webgl',
            '--ignore-certificate-errors',
            '--lang=en-US,en;q=0.9',
            '--password-store=basic',
            '--disable-gpu-sandbox',
            '--disable-software-rasterizer',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-infobars',
            '--disable-breakpad',
            '--disable-canvas-aa',
            '--disable-web-security',
            '--disable-2d-canvas-clip-aa',
            '--disable-gl-drawing-for-tests',
            '--enable-low-end-device-mode',
            // '--user-data-dir=/Users/sondt/Library/Application Support/Chromium',
            // '--profile-directory=Profile 1',
            '--disable-extensions-except=./plugin',
            '--load-extension=./plugin'
        ]
    }

    try {
        // launch browser with the plugin
        const browser = await puppeteer.launch(options);
        page = (await browser.pages())[0];
    } catch (e) {
        console.log('could not launch browser: '+e.toString())
        return;
    }

    // navigate to the target page
    try {
        await page.goto(url, {
            waitUntil: "networkidle0"
        });
    } catch (e) {
        console.error('err while loading the page: '+e);
    }

    // disable navigation timeout errors
    // await page.setDefaultNavigationTimeout(0);

    // // fill the form
    // await page.$eval('#login', (element, login) => {
    //     element.value = login;
    // }, login);
    // await page.$eval('#password', (element, password) => {
    //     element.value = password;
    // }, password);

    // wait for "solved" selector to come up
    await page.waitForSelector('.antigate_solver.solved').catch(error => console.log('failed to wait for the selector: '+ error));
    console.log('recaptcha solved');

    // press submit button
    // await Promise.all([
    //     page.click('#submitButton'),
    //     page.waitForNavigation({ waitUntil: "networkidle0" })
    // ]);
    console.log('recaptcha solved');

})();