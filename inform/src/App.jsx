import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leaders from "./pages/Leaders";
import MyNavbar from "./components/Navbar";
import Inform from "./pages/Inform";
import Statistics from "./pages/Statistics"

function App() {
  return (
    <div className="h-screen bg-[#fefcfc]"> 
      <MyNavbar className="h-8" />
      <div className="px-[15px] sm:px-[2%] md:px-[4%] lg:px-[6%] mt-8 mb-40 w-full sm:w-full md:w-[90%] lg:w-[88%]"> 
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
