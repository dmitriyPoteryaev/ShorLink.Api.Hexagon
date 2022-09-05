import React from "react";
import UserWindow from "./pages/UserWindow/UserWindow.jsx";
import Register_Validator from "./pages/Register_Validator/Register_Validator.jsx";
import Login_Validator from "./pages/Login_Validator/Login_Validator.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../style/style.css";


function App() {
    return (

<div className="App">
<BrowserRouter>
       <Routes>

       <Route path="/register" element={<Register_Validator/>} />
       <Route path="/login" element={<Login_Validator/>} />
       <Route path="/UserWindow/:pages" element={<UserWindow/>} />
       
       <Route path="*" element={<Register_Validator />} />
     </Routes>
   </BrowserRouter>

 
      </div>

    );}

    export default App;