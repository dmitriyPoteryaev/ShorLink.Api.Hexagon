import React from "react";
import Greeting_Validator from "./pages/Content/Content";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Greeting from "./pages/Greeting/Greeting";
import Navbar from "./components/UI/Navbar/Navbar";
import "../style/style.css";


function App() {
    return (

<div className="App">
      <BrowserRouter>
      {/* <Navbar/> */}
        <Routes>
          <Route path="/Greeting" element={<Greeting_Validator />} />
          <Route path="*" element={<Greeting_Validator />} />
        </Routes>
      </BrowserRouter>
      </div>

    );}

    export default App;