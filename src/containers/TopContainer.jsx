import '../assets/css/TopContainer.css';
import React from 'react';
import {leftArrow} from '../assets/images/favicons/leftArrow.js';
import {rightArrow} from '../assets/images/favicons/rightArrow.js';
import {upArrow} from '../assets/images/favicons/upArrow.js';
import {downArrow} from '../assets/images/favicons/downArrow.js';


const TopContainer = (props) => {
  const { items } = props;
  return (
    <div className='topContainer'>TOP CONTAINER
    {items.map(item => (
      <div>
        <li>{item.file_name}</li>
        {upArrow}
        {rightArrow}
        {downArrow}
        {leftArrow}
      </div>
    ))}
    </div>
  )
}

export default TopContainer;