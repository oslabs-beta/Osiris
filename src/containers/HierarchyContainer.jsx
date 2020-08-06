import '../assets/css/BuildPage.css';
import React, { useState, useEffect } from 'react';
import BuildItem from '../components/BuildItem.jsx';

const HierarchyContainer = (props) => {
	const {items} = props;

  function renderItems(items, level = 0) {
		return items.map((item) => {
			if (Array.isArray(item)) return renderItems(item, level+1);
			return <BuildItem id={item.id} key={item.buildId} level={level} item={item} />;
		});
	}


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
