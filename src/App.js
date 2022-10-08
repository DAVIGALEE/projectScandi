import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreFront from "./pages/StoreFront";
import ProductView from "./pages/ProductView";
import MainCart from "./pages/MainCart";

function App() {
  return (
    <Router>
      <div className="App container">
        <Routes>
          <Route path="/product/:productID" element={<ProductView />} />
          <Route path="/cart" element={<MainCart />} />
          <Route path="/" element={<StoreFront />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
