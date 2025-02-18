import { Link, useLocation } from "react-router-dom";
import {  User, LayoutDashboard, FileBarChart, BarChart3 } from "lucide-react";
import logo from "../assets/mci-logo.png";

function MyNavbar() {
  const location = useLocation(); // Obtiene la ruta actual

  // Función para verificar si la ruta está activa
  const isActive = (path) => location.pathname === path ? "mb-0 rounded-[2px] text-[#0f0873] border-l-2 border-blue-500" : "border-none text-black";


  return (
    <nav className="flex gap-6 px-[1%] font-stretch-condensed shadow-md ">
      <div className="text-center mt-[4px]">
        <img src={logo} alt="Logo" className="w-13 h-13" />
      </div>     
      <div className="mt-[14px]">
        <ul className="flex items-start p-0 gap-10 text-center text-[15px]">
          <li className="hover:border-l-2  hover:border-blue-500 ">
           <Link to="/" className={`${isActive("/")} flex gap-1 p-1`}>
              <LayoutDashboard className="p-[2px]" size={22} /> 
              <p className="p-[2px] m-0">Home</p>
            </Link>
          </li> 
          <li className="hover:border-l-2 hover:border-blue-500">
            <Link to="/Inform" className={`${isActive("/Inform")} flex gap-1 p-1`}>
              <FileBarChart className="p-[2px]" size={22} />
              <p className="p-[2px] m-0">Informes</p>
            </Link>
            
          </li>
          <li className="hover:border-l-2  hover:border-blue-500">
            <Link to="/Leaders"  className={`${isActive("/Leaders")} flex gap-1 p-1`}>
              <User className="p-[2px]" size={22} />
              <p className="p-[2px] m-0">Lideres</p>
            </Link>
            
          </li>
          <li className="hover:border-l-2  hover:border-blue-500">
            <Link to="/Statistics" className={`${isActive("/Statistics")} flex gap-1 p-1`}>
              <BarChart3 className="p-[2px]" size={22} />
              <p className="p-[2px] m-0">Reportes</p>
            </Link>
           
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default MyNavbar;
