import '../assets/css/buildPage.css';
import React, { useState } from 'react';
import { Context } from '../context/MyProvider.js';
import UiLibrary from './UiLibrary.jsx';
import LeftContainer from './LeftContainer.jsx';
import TopContainer from './TopContainer.jsx';

const BuildPage = (props) => {
	const { globalState } = React.useContext(Context);
  const [localState, setLocalState] =  useState({localUiItems: []});
  
  const onClick = (e) => {
    const id = e.target.id;
    const globalItem = globalState.uiItems.filter(item => item.id == id)[0];
		setLocalState({localUiItems: [...localState.localUiItems, globalItem]})
	};
    
	return (
		<div className="buildPage">
            <div className="buildPageHeader">
                <h1>Page Builder</h1>
            </div>
			<div className="left-container">
                <LeftContainer />
			</div>
			<div className="top-container">
                <TopContainer items={localState.localUiItems}  />
			</div>
			<div className="bottom-container">
				<UiLibrary handleClick={onClick} />
			</div>
		</div>
	);
};

export default BuildPage;
