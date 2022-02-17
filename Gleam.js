// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const grind = require('./Grind').grind;
const { default: bypass } = require('./libs/bypasser/captchaBypasser')
// const CHROME_PATH = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
// const PROFILE_PATH = '~/Library/Application Support/Chromium';
const profiles = ["Profile 1"]
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
puppeteer.use(RecaptchaPlugin({
    provider: {
        fn : bypass
    }
}))
const run = async (profile) => {
    let page = null;
    let options = {
        userDataDir: "./userDataDir/" + profile,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        headless: false,
        devtools: false,
        defaultViewport: null,
        ignoreDefaultArgs: [
            "--disable-extensions",
            "--enable-automation"
        ],
        args: [
            '--disable-web-security',
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
            '--disable-2d-canvas-clip-aa',
            '--disable-gl-drawing-for-tests',
            '--enable-low-end-device-mode',
            // '--disable-extensions-except=./plugin',
            // '--load-extension=./plugin'
        ]
    }
    try {
        const browser = await puppeteer.launch(options);
        await grind(browser, "https://gleam.io/1D72v/pokemine-bitkeep-airdrop?gsr=1D72v-SqMpeCZXHa")
    } catch (error) {
        console.log("error",error);
    }
}
(async () => {
    await Promise.all([profiles.map(res => run(res))]);
})();