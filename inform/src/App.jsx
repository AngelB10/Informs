import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leaders from "./pages/Leaders";
import MyNavbar from "./components/Navbar";
import Inform from "./pages/Inform";
import Statistics from "./pages/Statistics"

function App() {
  return (
    <div className="h-screen bg-[#fefcfc] "> 
      <MyNavbar className="h-8" />
      <div className="px-[5%] mt-8 w-[80%]"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Leaders" element={<Leaders />} /> 
          <Route path="/Inform" element={<Inform />} />
          <Route path="/Statistics" element={<Statistics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
