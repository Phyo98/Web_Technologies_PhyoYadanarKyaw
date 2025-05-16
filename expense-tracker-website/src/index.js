import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; 
import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = "https://mi-linux.wlv.ac.uk/~2537566/public";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
     <BrowserRouter basename="/Web_Technologies_PhyoYadanarKyaw">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
