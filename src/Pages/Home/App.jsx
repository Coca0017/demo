import { useState } from "react";
import "./App.scss";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="pageDiv">
        <div className="overlay">
          <div className="headText">
            <h1>An Investment That Pays The Best Funds</h1>

            <button>
              <Link to={"/Register"}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
