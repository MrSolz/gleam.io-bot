//npm install adm-zip
const https = require('https')
const fs = require('fs');
const AdmZip = require("adm-zip");
const process = require('process');
const zipPath = `./plugin.zip`;
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
const pluginURL = 'https://antcpt.com/anticaptcha-plugin.zip';

(async () => {
    // download the plugin
    await new Promise(async(resolve) => {
        await https.get(pluginURL, resp => resp.pipe(fs.createWriteStream('./plugin.zip').on('close', resolve)));
    })
    // unzip it
    const zip = new AdmZip(zipPath);
    await zip.extractAllTo("./plugin/", true);
})();