import React from 'react';
import { Context } from '../context/MyProvider.js';

const BuildItem = (props) => {
  const { globalState, dispatch } = React.useContext(Context);

  const upArrowClick = (e) => {
    dispatch({ type: 'upClick', payload: props.item})
  }
  const downArrowClick = (e) => { 
    dispatch({ type: 'downClick', payload: props.item})
  }
  const leftArrowClick = (e) => {
    dispatch({ type: 'leftClick', payload: props.item})
  }
  const rightArrowClick = (e) => {
    dispatch({ type: 'rightClick', payload: props.item})
  }
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