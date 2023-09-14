import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/";
import AddPackage from "./components/AddPackage";

function App() {
  return (
    <Routes>
      <Route element={<AddPackage />} path="/add-package" />
      <Route element={<Homepage />} path="/" />
    </Routes>
  );
}

export default App;
