import React from 'react'
import { PuffLoader } from 'react-spinners';
import "./App.scss";

function Spinner() {
  return (
    <div className='spinnerWrapper'>
        <PuffLoader color="#e23c4a" /> 
    </div>
  )
}

export default Spinner