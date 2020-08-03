import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.js';

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

	console.log(path);
	console.log('selectedState ', selectedState);
	console.log('items: ', items);
	console.log('file name: ', DLFileName);

	try {
		await fs.writeFile(
			`${dir}/${DLFileName}.jsx`,
			// format(componentRender(items, selectedState, DLFileName), {
			format(items, {
				singleQuote: true,
				trailingComma: 'es5',
				bracketSpacing: true,
				jsxBracketSameLine: true
				// parser: "babel",
			}),
			(err) => {
				console.warn(err);
			}
		);
	} catch (err) {
		console.log(err);
	}
};

export default createFiles;
