import React from 'react'
import "./app.scss"

const app = ({icon,id}) => {

    return (
      <div className="widget">
        <div className="content">
          <div className='iconWrapper'>
            {icon}
          </div>
          <div className="textWrapper">
            <div id="line"></div> 
            <p>{id}</p>
          </div>
        </div>
      </div>
    );
  };


export default app