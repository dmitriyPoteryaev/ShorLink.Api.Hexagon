import React from "react";
import Greeting_Validator from "./pages/Greeting_Validator/Greeting_Validator.jsx";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../style/style.css";
// //      <BrowserRouter>
//       {/* <Navbar/> */}
//       <Routes>
//       <Route path="/Greeting" element={<Greeting_Validator />} />
//       <Route path="*" element={<Greeting_Validator />} />
//     </Routes>
//   </BrowserRouter>



function App() {
    return (

<div className="App">

 <Greeting_Validator/>
 
      </div>

    );}

    export default App;