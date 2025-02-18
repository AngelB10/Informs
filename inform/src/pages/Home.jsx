import { Card } from "react-bootstrap";
import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import {  FileText, UserPlus, PiggyBank, Users } from "lucide-react";

const Home = () => {
const { informes } = useStoreInformes();
const {leaders } = useStoreLeaders();
const today = new Date().toLocaleDateString();

const getWeekRange = () => {
  const now = new Date();
  const firstDay = new Date(now.setDate(now.getDate() - now.getDay())); // Domingo
  const lastDay = new Date(now.setDate(firstDay.getDate() + 6)); // Sábado

  return {
    start: firstDay.toISOString().split("T")[0], // Formato YYYY-MM-DD
    end: lastDay.toISOString().split("T")[0]
  };
};

const filterCurrentWeekInforms = (informes) => {
  const { start, end } = getWeekRange();

  return informes.filter(informe => {
    const date = new Date(informe.date).toISOString().split("T")[0];
    return date >= start && date <= end;
  });
};

const informesSemanaActual = filterCurrentWeekInforms(informes);
console.log("Informes de la semana actual:", informesSemanaActual);


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="w-full d-flex justify-content-between text-gray-600">
        <div>
          <h2 className="m-0">Dashboard</h2>
          <p className="mb-4 p-0">Informacion semanal</p>
        </div>
        <p className="float-right bg-blue-500 p-2 h-10 rounded-[6px] text-white">{today}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-2 shadow rounded-xl !bg-[#db49ff] text-white ">
          <div className="flex">
          <FileText className="mr-2 float-rigth" size={22} /> 
          <p className="text-[10px] flex md:text-[12px] lg:text-[14px] transition-all ">CANTIDAD DE INFORMES SEMANALES</p>
          </div>
          <h2 className="font-bold ml-2">{informesSemanaActual.length} #</h2>
        </Card>
        <Card className="p-2 !bg-[#a6ff41] shadow rounded-xl text-white">
          <div className="flex">
          <Users className="p-[2px] mr-2" size={22} /> 
          <p className="text-[12px]  md:text-[15px] lg:text-[14px]">ASISTENCIA SEMANAL</p>
          </div>
          <h2 className="font-bold ml-2">4.8</h2>
        </Card>
        <Card className="p-2 !bg-blue-300 shadow rounded-xl text-white">
          <div className="flex">
             <UserPlus className="p-[2px] mr-2" size={22} /> 
            <p className="text-[12px]  md:text-[12px] lg:text-[14px]">ASISTENTES NUEVOS</p>
          </div>
          <h2 className="font-bold ml-2">3.5h</h2>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Personas</h3>
          <div className="flex space-x-3">
            <div className="w-1/4 bg-pink-200 p-2 rounded-lg">{leaders.length}#</div>
            <div className="w-1/4 bg-pink-400 p-2 rounded-lg">65%</div>
            <div className="w-1/4 bg-pink-600 p-2 rounded-lg">87%</div>
            <div className="w-1/4 bg-pink-300 p-2 rounded-lg">34%</div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Ofrenda </h3>
          <PiggyBank className="p-[2px]" size={22} /> 
          <h2 className="text-2xl font-bold">$50,734</h2>
          <div className="h-2 w-full bg-gray-300 rounded-full mt-2">
            <div className="h-2 bg-blue-600 w-1/2 rounded-full"></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
