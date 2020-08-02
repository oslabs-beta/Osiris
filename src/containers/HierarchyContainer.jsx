import '../assets/css/BuildPage.css';
import React, { useState, useEffect } from 'react';
import BuildItem from '../components/BuildItem.jsx';

const HierarchyContainer = (props) => {
	const {items} = props;
	// const [arr, setArr] = useState([]);
	// // let arr = [];
    // useEffect(() => {
	// 	renderItems(props.items)
	// 	}, [props.items]);

    function renderItems(items, level = 0) {
		// 	let temp = []
		// for(let i = 0; i < items.length; i++) {
		// 	if (Array.isArray(items[i])) {
		// 		// [div, input, button]
		// 		let firstItemLevel = renderItems(item[i][0], level + 1);	
		// 		temp.push(firstItemLevel)
		// 		let rest = item[i].slice(1) // [input, button]
		// 		rest.forEach(el => {
		// 			temp.push(renderItems(el, level + 2))
		// 		})
		// 		// let restItemsLevel = renderItems(item.slice(1), level + 2) // [input, button]
		// 		// arr.push([firstItemLevel, ...restItemsLevel])
		// 		console.log('renderitems temp arr: ', temp)
		// 	} else {
		// 		temp.push(<BuildItem styles={{color: 'white'}}id={items[i].id} key={items[i].buildId} item={items[i]} level={level} />);
		// 		console.log('renderitems temp arr: ', temp)
		// 	}
		// };
		// // arr = [...arr, ...temp] //jeho was here
		// setArr([...arr, ...temp])
		// console.log('builditem array with levels: ', arr)
		return items.map((item) => {
			if (Array.isArray(item)) return renderItems(item, level+1);
			return <BuildItem id={item.id} key={item.buildId} level={level} item={item} />;
		});
	}

	// function showArr(arr) {
	// 	console.log('showArr func: ', arr)
	// 	return arr.forEach(el => {
	// 		console.log('showArr element: ', el);
	// 		return el;
	// 	})
	// }

	return (
		<div className="hierarchyContainer">
            <div className="hierarchyHeader">
		        <h1>HIERARCHY</h1>
            {items && renderItems(items)}
            </div>
		</div>
	);
};

export default HierarchyContainer;
