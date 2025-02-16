import React from 'react'
import { PuffLoader } from 'react-spinners';
import "./App.scss";

function Spinner() {
  return (
    <div className='spinnerWrapper'>
        <PuffLoader color="#094b88" /> 
    </div>
  )
}

export default Spinner