import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import AddPackage from "./AddPackage";

function App() {
  return (
    <Routes>
      <Route element={<AddPackage />} path="/add-package" />
      <Route element={<Homepage />} path="/" />
    </Routes>
  );
}

export default App;
