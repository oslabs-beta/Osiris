import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.js';

const createFiles = async (items, path, DLFileName, selectedState, language) => {
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

	try {	
		if (language === 'react') {
			await fs.writeFile(
				`${dir}/${DLFileName}.jsx`,
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
				)
			} else {
				await fs.writeFile(
					`${dir}/${DLFileName}.vue`,
						items,
						(err) => {
							console.warn(err);
						}
					)
			}		
	} catch (err) {
		console.log(err);
	}
};

export default createFiles;

// language === 'react' ?  
// 				(
// 					`${dir}/${DLFileName}.jsx`,
// 					format(items, {
// 						singleQuote: true,
// 						trailingComma: 'es5',
// 						bracketSpacing: true,
// 						jsxBracketSameLine: true
// 						// parser: "babel",
// 					})
// 				)
// 				: (`${dir}/${DLFileName}.vue`,
// 					items
// 				),
// 				(err) => {
// 					console.warn(err);
// 				}