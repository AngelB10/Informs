import { Card } from "react-bootstrap";
import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import {  FileText, UserPlus, Banknote, Users } from "lucide-react";

const Home = () => {
const { informes } = useStoreInformes();
const {leaders } = useStoreLeaders();
const today = new Date().toISOString().split("T")[0]; 

const getMonthWeek = (value) => {
  const fecha = new Date(value); // Se recibe un formato válido de fecha
  const dayOfMonth = fecha.getUTCDate();  
  return Math.ceil(dayOfMonth / 7); // Devuelve un número del 1 al 4
};

// Obtener la semana actual
const getCurrentWeek = () => {
  const today = new Date();
  return getMonthWeek(today.toISOString()); 
};

// Obtener el mes actual
const getCurrentMonth = () => {
  return new Date().getUTCMonth() + 1; // Enero es 0, por eso sumamos 1
};

const filterCurrentWeekInforms = (informes) => { 
  const currentWeek = getCurrentWeek();
  const currentMonth = getCurrentMonth();
  return informes.filter((informe) => {
    const informeDate = new Date(informe.date); // Convertimos la fecha en objeto Date
    const informeMonth = informeDate.getUTCMonth() + 1; // Obtener el mes en UTC
    const informeWeek = getMonthWeek(informe.date); // Obtener la semana en UTC

    return informeWeek === currentWeek && informeMonth === currentMonth;
  });
};


const totalInformesSemana = filterCurrentWeekInforms(informes).length;


const sumOfferingWeek = (informes) => {
  return filterCurrentWeekInforms(informes).reduce((total, { offering }) => total + (offering || 0), 0);
};



// Obtener número total de asistentes de la semana actual
const Attendees = (informes) => {
  return filterCurrentWeekInforms(informes).reduce((total, { numberAttendees }) => total + (numberAttendees || 0), 0);
};

// Obtener número total de nuevos asistentes de la semana actual
const filterNewAttendees = (informes) => {
  return filterCurrentWeekInforms(informes).reduce((total, { newAttendees }) => total + (newAttendees || 0), 0);
};

const MonthWeek = (value) => {
const fecha = new Date(value + "T00:00:00"); 
const dayOfMonth = fecha.getDate();  
return Math.ceil(dayOfMonth / 7); 

}




  return (
    <div className="p-[2px] sm:p-4 md:p-4 bg-gray-100 h-[700px]">
      <div className="w-full d-flex justify-content-between text-gray-600">
        <div>
          <h2 className="m-0"><strong>Dashboard</strong></h2>
          <p className="mb-5 p-0">Informacion semanal</p>
          <h5><strong>Semana {MonthWeek(today)}</strong> </h5>
        </div>
        <p className="float-right bg-blue-500 p-2 h-10 rounded-[6px] text-white">{today}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Card className="p-2 shadow rounded-xl !bg-[#8c49ff] text-white ">
          <div className="flex">
          <FileText className="mr-2 float-rigth" size={28} /> 
          <p className="text-[20px] flex md:text-[12px] lg:text-[20px] transition-all ">CANTIDAD DE INFORMES</p>
          </div>
          <h2 className="font-bold ml-2">{totalInformesSemana} #</h2>
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

      <div className="grid grid-cols-2 gap-3">
      <Card className="p-[2px] sm:p-4 md:p-4 bg-white shadow rounded-xl ">
          <div className="flex">
             <Banknote className="pr-[2px]" size={32} /> 
             <p className=" text-[17px] font-semibold mb-1 !mt-[2px] sm:mt-0 md:mt-0 lg:mt-0">Ofrenda</p>
          </div>
          <p className="sm:text-[20px] text-[20px] font-bold">${sumOfferingWeek(informes).toLocaleString("es-CO")}</p>
          <div className="h-2 w-full bg-gray-300 rounded-full mt-2">
            <div className="h-2 bg-blue-600 w-1/2 rounded-full"></div>
          </div>
        </Card>
        <Card className="p-[2px] sm:p-4 md:p-4 bg-white shadow rounded-xl">
          <h4 className="sm:text-[10px] text-[17px] font-semibold mb-4">Lideres</h4>
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
