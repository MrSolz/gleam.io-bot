// import {  } from "python-shell";

import { PythonShell } from "python-shell";

// const = re
const bypass = async (captchas, token) => {
  return new Promise((resolve, reject) => {
      console.log("captchas",captchas);
    let options = {
      args: [captchas[0].sitekey],
    };
    console.log("options",options);
    PythonShell.run(
      `bypass.py`,
      options,
      async (err, result) => {
          console.log("captchaKey",result);
        // if (err) throw err;
        // let solutions = [
        //   {
        //     _vendor: captchas[0]._vendor,
        //     id: captchas[0].id,
        //     text: captchaKey,
        //     hasSolution: true,
        //   },
        // ];
        // resolve({ solutions: solutions });
      }
    );
  });
};
export default bypass;