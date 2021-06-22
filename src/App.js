/*eslint-disable */

import React, { useState } from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Content />
      <Content />
      <Content />
      <Footer />
    </div>
  );
}

function NavBar(){
  return(
    <div className="main-nav">
      <button class="totop_arrow2" type="button"></button>
      <div>도움말</div>
    </div>
  );
}

function Content(){
  return(
    <div className="list">
      <h3>Q.1제목입니다.</h3>
      <p>1내용입니다.</p>
      <hr/>
    </div>
  )
}

function Footer(){
  return(
    <div className="footer">
      <p>
        감사합니다.
        소송프로 팀 드림
      </p>
      <hr/>
    </div>
  )
}

export default App;
