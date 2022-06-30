import { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Main from "./main/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  // const firestore = firebase.firestore();

  return (
    <div className="App">
      <BrowserRouter>
          <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;

