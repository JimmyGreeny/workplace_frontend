import React from 'react';
//import '../App.css';
//import helpers from "./helpers.js";

function AddSorMRowButton(props) {
  return (
    <tr>
      <td colSpan="6" className="align-middle text-center">
        <button
          className="addRow_btn font-weight-bold"
          onClick={props.onAddRow}
        >
          +
        </button>
      </td>
    </tr>
  );
}

export default AddSorMRowButton;