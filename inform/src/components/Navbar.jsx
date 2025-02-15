import { Link, useLocation } from "react-router-dom";
import {  User, LayoutDashboard, FileBarChart, BarChart3 } from "lucide-react";
import logo from "../assets/mci-logo-w.png";

function MyNavbar() {
  const location = useLocation(); // Obtiene la ruta actual

  // Función para verificar si la ruta está activa
  const isActive = (path) => location.pathname === path ? "text-blue-500" : "text-white";

  return (
    <nav className="flex gap-20 px-[10%] border-b-2">
      <div className="text-center mt-2 ">
        <img src={logo} alt="Logo" className="w-18 h-18 " />
      </div>     
      <div className="flex-grow mt-4">
        <ul className="flex items-start w-[40%] p-0 mr-6  gap-30 text-white  text-center">
          <li className="justify-center no-underline ">
           <Link to="/" className={`${isActive("/")}`}>
              <LayoutDashboard className="w-full hover:text-black" size={28} /> 
              <p className="isActive w-17 hover:text-black">Home</p>
            </Link>
           
          </li> 
          <li  className="justify-center">
            <Link to="/Inform" className={isActive("/Inform")}>
              <FileBarChart className="w-full hover:text-black" size={28} />
              <p className="w-17 hover:text-black">Informes</p>
            </Link>
            
          </li>
          <li  className="justify-center">
            <Link to="/Leaders" className={isActive("/Leaders")}>
              <User className="w-full hover:text-black" size={28} />
              <p className="w-17 hover:text-black">Lideres</p>
            </Link>
            
          </li>
          <li className="justify-center">
            <Link to="/Statistics" className={isActive("/Statistics")}>
              <BarChart3 className="w-full hover:text-black" size={28} />
              <p className="w-17 hover:text-black">Reportes</p>
            </Link>
           
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MyNavbar;
