import fs from "fs";
import componentRender from "./componentRender.js";

const createFiles = async (items, path, DLFileName, selectedState) => {
  let dir = path;
  if (!dir.match(/components|\*$/)) {
    if (fs.existsSync(`${dir}/src`)) {
      dir = `${dir}/src`;
    }
    dir = `${dir}/components`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  // const promises = [];
  // const newPromise = new Promise((resolve, reject) => {
  //   fs.writeFile(
  //     `${dir}/${DLFileName}.jsx`,
  //     // format(componentRender(component, items), {
  //     //   singleQuote: true,
  //     //   trailingComma: "es5",
  //     //   bracketSpacing: true,
  //     //   jsxBracketSameLine: true,
  //     //   parser: "babylon",
  //     // }),
  //     componentRender(items, selectedState, DLFileName),
  //     (err) => {
  //       if (err) return reject(err.message);
  //       return resolve(path);
  //     }
  //   );
  // });
  // promises.push(newPromise);

  // return Promise.all(promises);

  await fs.writeFile(
    `${dir}/${DLFileName}.jsx`,
    // format(componentRender(component, items), {
    //   singleQuote: true,
    //   trailingComma: "es5",
    //   bracketSpacing: true,
    //   jsxBracketSameLine: true,
    //   parser: "babylon",
    // }),
    componentRender(items, selectedState, DLFileName),
    (err) => {
      console.warn(err);
    }
  );
};

export default createFiles;
