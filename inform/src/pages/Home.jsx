import { Card } from "react-bootstrap";
import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import {  FileText, UserPlus, Banknote, Users } from "lucide-react";

const Home = () => {
const { informes } = useStoreInformes();
const {leaders } = useStoreLeaders();
const today = new Date().toISOString().split("T")[0]; 

// funcion para rangos semanales
const getWeekRange = () => {
  const now = new Date();
  const firstDay = new Date(now.setDate(now.getDate() - now.getDay())); // Domingo
  const lastDay = new Date(now.setDate(firstDay.getDate() + 6)); // Sábado

  return {
    start: firstDay.toISOString().split("T")[0], // Formato YYYY-MM-DD
    end: lastDay.toISOString().split("T")[0]
  };
};

// funcion para saber cantidad de informes entregados
const filterCurrentWeekInforms = (informes) => {
  const { start, end } = getWeekRange();
  return informes.filter(informe => {
    const date = new Date(informe.date).toISOString().split("T")[0];
    return date >= start && date <= end;
  });
};
const informesSemanaActual = filterCurrentWeekInforms(informes);

// funcion suma ofrenda semanal 
const sumOfferingWeek = (informes) => {
  const { start, end } = getWeekRange();
  
  return informes
    .filter(({ date }) => {
      const reportDate = date.split("T")[0];

      return reportDate >= start && reportDate <= end;
    })
    .reduce((total, { offering }) => total + offering, 0);
};

// suma de asistentes semanales
const Attendees = (informes) => {
  const { start, end } = getWeekRange();
  
  return informes
    .filter(({ date }) => {
      const reportDate = date.split("T")[0];

      return reportDate >= start && reportDate <= end;
    })
    .reduce((total, { numberAttendees }) => total + numberAttendees, 0);
};

// suma de nuevos
const filterNewAttendees = (informes) => {
  const { start, end } = getWeekRange();
  
  return informes
    .filter(({ date }) => {
      const reportDate = date.split("T")[0];

      return reportDate >= start && reportDate <= end;
    })
    .reduce((total, { newAttendees }) => total + newAttendees, 0);
};


const getMonthWeek = (value) => {
const fecha = new Date(value + "T00:00:00"); 
const dayOfMonth = fecha.getDate();  
return Math.ceil(dayOfMonth / 7); 

}




  return (
    <div className="p-4 bg-gray-100 h-[700px]">
      <div className="w-full d-flex justify-content-between text-gray-600">
        <div>
          <h2 className="m-0"><strong>Dashboard</strong></h2>
          <p className="mb-5 p-0">Informacion semanal</p>
          <h5><strong>Semana {getMonthWeek(today)}</strong> </h5>
        </div>
        <p className="float-right bg-blue-500 p-2 h-10 rounded-[6px] text-white">{today}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Card className="p-2 shadow rounded-xl !bg-[#8c49ff] text-white ">
          <div className="flex">
          <FileText className="mr-2 float-rigth" size={28} /> 
          <p className="text-[20px] flex md:text-[12px] lg:text-[20px] transition-all ">CANTIDAD DE INFORMES</p>
          </div>
          <h2 className="font-bold ml-2">{informesSemanaActual.length} #</h2>
        </Card>
        <Card className="p-2 !bg-[#7de113] shadow rounded-xl text-white">
          <div className="flex">
          <Users className="p-[2px] mr-2" size={28} /> 
          <p className="text-[20px]  md:text-[15px] lg:text-[20px]">ASISTENCIA</p>
          </div>
          <h2 className="font-bold ml-2">{Attendees(informes)} #</h2>
        </Card>
        <Card className="p-2 !bg-blue-400 shadow rounded-xl text-white">
          <div className="flex">
             <UserPlus className="p-[2px] mr-2" size={28} /> 
            <p className="text-[20px]  md:text-[15px] lg:text-[20px]">ASISTENTES NUEVOS</p>
          </div>
          <h2 className="font-bold ml-2">{filterNewAttendees(informes)} #</h2>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-3">
      <Card className=" p-4 bg-white shadow rounded-xl">
          <div className="flex">
             <Banknote className="pr-[2px]" size={32} /> 
             <h4 className="font-semibold mb-2">Ofrenda</h4>
          </div>
          <h2 className="text-2xl font-bold">${sumOfferingWeek(informes).toLocaleString("es-CO")}</h2>
          <div className="h-2 w-full bg-gray-300 rounded-full mt-2">
            <div className="h-2 bg-blue-600 w-1/2 rounded-full"></div>
          </div>
        </Card>
        <Card className="p-4   bg-white shadow rounded-xl">
          <h4 className="font-semibold mb-4">Lideres</h4>
          <div className="space-x-8 mb-2">
            <div className="flex">
            <div className="h-10 content-center px-7 bg-pink-300 rounded-lg">{leaders.length}</div>
            </div>
          </div> 
        </Card>
      </div>
    </div>
  );
};

export default Home;
