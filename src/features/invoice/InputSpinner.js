import React, { useState } from 'react';
//import '../App.css';
//import helpers from "./helpers.js";

const InputSpinner = (props) => {

const step = Number(props.step);
const [num, setNum]= useState(0);


const handleChange = (e) => {
    setNum(e.target.value);
    props.onChange(e.target.value);
}

const incNum = () => {
    setNum(Number(num)+step)
    props.onChange(Number(num)+step)
}

const decNum = () => {
    setNum(Number(num)-step)
    props.onChange(Number(num)-step)
}
    
  return (
    <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <button id="input-spinner-left-button" onClick={decNum} type="button" className="btn btn-dark">-</button>
        </div>
        <input className="form-control" type="number" value={Number(num)} onChange={handleChange}/>
        <div className="input-group-append">
          <button id="input-spinner-right-button" onClick={incNum} type="button" className="btn btn-dark">+</button>
        </div>
    </div>
  );
};

export default InputSpinner;