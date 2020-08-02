import React from 'react';
// import {leftArrow, rightArrow, upArrow, downArrow} from '../assets/images/favicons/Arrows.js';
import { Context } from '../context/MyProvider.js';

const BuildItem = (props) => {
  const { globalState, dispatch } = React.useContext(Context);

  const upArrowClick = (e) => {
    console.log('upArrow', e.target.id)  
    dispatch({ type: 'upClick', payload: props.item})
  }
  const downArrowClick = (e) => {
    console.log('downArrow', e.target.id)  
    dispatch({ type: 'downClick', payload: props.item})
  }
  const leftArrowClick = (e) => {
    console.log('leftArrow' , e.target.id)
    dispatch({ type: 'leftClick', payload: props.item})
  }
  const rightArrowClick = (e) => {
    console.log('rightArrow', e.target.id)  
    dispatch({ type: 'rightClick', payload: props.item})
  }
  // console.log(`items MyProvider level of ${props.item.file_name}: ${props.item.level}`)
  // console.log('id ',props.id, ` items hierarchy map level: ${props.item.file_name} `, props.level)
  return (
    <div className={`itemLevel${props.item.level}`}>
      <li>{props.item.file_name}</li>
      <i id={props.id} onClick={upArrowClick} className="fas fa-arrow-up"></i>
      <i id={props.id} onClick={downArrowClick} className="fas fa-arrow-down"></i>
      <i id={props.id} onClick={leftArrowClick} className="fas fa-arrow-left"></i>
      <i id={props.id} onClick={rightArrowClick} className="fas fa-arrow-right"></i>
    </div>
  )
}

export default BuildItem;