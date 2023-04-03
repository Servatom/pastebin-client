import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <>
    <Navbar />
    <div className="container mx-auto">
      <App />
    </div>
    <Footer />
  </>
);
