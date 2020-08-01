import '../assets/css/BuildPage.css';
import React, { useState, useEffect } from 'react';
import BuildItem from '../components/BuildItem.jsx';

const HierarchyContainer = (props) => {
    const {items} = props;
    
    function renderItems(items) {
		return items.map((item) => {
			if (Array.isArray(item)) return renderItems(item);
			return <BuildItem id={item.id} key={item.buildId} item={item} />;
		});
	}


	return (
		<div className="hierarchyContainer">
            <div className="hierarchyHeader">
		        <h1>HIERARCHY</h1>
            </div>
            {items && renderItems(items)}
		</div>
	);
};

export default HierarchyContainer;
