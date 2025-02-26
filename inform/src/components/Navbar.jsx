import { Link, useLocation } from "react-router-dom";
import {  User, LayoutDashboard, FileBarChart, BarChart3 } from "lucide-react";
import logo from "../assets/mci-logo.png";

function MyNavbar() {
  const location = useLocation(); // Obtiene la ruta actual

  // Función para verificar si la ruta está activa
  const isActive = (path) => location.pathname === path ? "mb-0 rounded-[2px] text-[#0f0873] border-l-2 border-blue-500" : " text-black";


  return (
    <nav className="flex gap-3 sm:gap-2 md:gap-6 lg:gap-8 px-[1%] font-stretch-condensed shadow-md ">
      <div className="text-center mt-[8px] sm:mt-[4px] md:mt-[4px] lg:mt-[4px]">
        <img src={logo} alt="Logo" className="w-11 sm:w-13 md:w-13 lg:w-13" />
      </div>     
      <div className="mt-[14px]">
        <ul className="flex p-1 items-start sm:gap-2 md:gap-6 lg:gap-6 text-center text-[12px] sm:text-[12px] md:text-[15px] lg:text-[15px]">
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
