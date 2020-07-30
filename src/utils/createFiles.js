import fs from "fs";
import {
  format
} from "prettier";
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

  console.log(format)

  await fs.writeFile(
    `${dir}/${DLFileName}.jsx`,
    format(componentRender(items, selectedState, DLFileName), {
      singleQuote: true,
      trailingComma: "es5",
      bracketSpacing: true,
      jsxBracketSameLine: true,
      // parser: "babel",
    }),
    (err) => {
      console.warn(err);
    }
  );
};

export default createFiles;
