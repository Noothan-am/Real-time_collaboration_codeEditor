import React from "react";
import Home from "./Containers/Home";
import Editor from "./Containers/Editor";
import { Route,Routes } from "react-router-dom";
import "./app.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/editor/:_id" element={<Editor/>}/>
      </Routes>
    </>
  );
}

export default App;
