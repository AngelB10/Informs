import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import exportToExcel from "../components/dwonloadExcel";
import { BarChart, Bar, XAxis, YAxis, Tooltip,  ResponsiveContainer } from "recharts";

const getMonthWeek = (date) => {
  const fecha = new Date(date);
  if (isNaN(fecha)) return 0; // Evita errores si la fecha es inválida
  const dayOfMonth = fecha.getDate();
  return Math.min(Math.ceil(dayOfMonth / 7), 4); // Máximo 4 semanas
};

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const { informes } = useStoreInformes();
  const { leaders } = useStoreLeaders();
  const [weeklyData, setWeeklyData] = useState([]);
  const [topNewAttendees, setTopNewAttendees] = useState([]);
  const [topAttendance, setTopAttendance] = useState([]);

  useEffect(() => {
    const groupedData = [1, 2, 3, 4].map((week) => {
      const informesSemana = informes.filter((informe) => getMonthWeek(informe.date) === week);

      return {
        week: `Semana ${week}`,
        totalReports: informesSemana.length, // Total de informes en la semana
        totalAttendees: informesSemana.reduce((sum, inf) => sum + (inf.numberAttendees || 0), 0), // Total asistencia
        newAttendees: informesSemana.reduce((sum, inf) => sum + (inf.newAttendees || 0), 0), // Nuevos asistentes
        offering: informesSemana.reduce((sum, inf) => sum + (inf.offering || 0), 0), // Total de ofrendas
      };
    });

    setWeeklyData(groupedData);
  }, [informes, leaders]);


  const exportMonthlyData = () => {
    if (!selectedMonth) {
      alert("Por favor, selecciona un mes.");
      return;
    }
  
    const monthNumber = parseInt(selectedMonth.split("-")[1]); // Extraer el número de mes (1-12)
  
    const filteredInformes = informes
      .filter((inf) => new Date(inf.date).getMonth() + 1 === monthNumber)
      .map((inf) => ({
        ...inf,
        mainLeader: leaders.find((l) => l._id === inf.mainLeader)?.name || "No encontrado",
      }));
  
    console.log(filteredInformes); // Verifica que mainLeader ahora tiene el nombre
  
    exportToExcel(filteredInformes, `Informes_Mes_${monthNumber}`);
  };


  useEffect(() => {
    const leaderStats = {};

    informes.forEach((inf) => {
      const leaderId = inf.mainLeader;
      if (!leaderStats[leaderId]) {
        leaderStats[leaderId] = { name: "", totalNew: 0, totalAttendance: 0 };
      }

      leaderStats[leaderId].totalNew += inf.newAttendees;
      leaderStats[leaderId].totalAttendance += inf.numberAttendees;
    });

    // Asignar nombres a los líderes
    Object.keys(leaderStats).forEach((leaderId) => {
      leaderStats[leaderId].name =
        leaders.find((l) => l._id === leaderId)?.name || "Desconocido";
    });

    // Convertir a array y ordenar
    const leaderArray = Object.values(leaderStats);
    const sortedByNew = [...leaderArray].sort((a, b) => b.totalNew - a.totalNew).slice(0, 3);
    const sortedByAttendance = [...leaderArray].sort((a, b) => b.totalAttendance - a.totalAttendance).slice(0, 3);

    setTopNewAttendees(sortedByNew);
    setTopAttendance(sortedByAttendance);
  }, [informes, leaders]);

  return (
    <div>
       <div className="flex flex-wrap gap-4 p-4">
      {/* 🏆 Top líderes con más nuevos asistentes */}
      <Card className="p-4 shadow-md w-full md:w-1/2">
        <h3 className="text-xl font-semibold">🎖️ Líderes con más nuevos asistentes</h3>
        <ul>
          {topNewAttendees.map((leader, index) => (
            <li key={index} className="text-lg">
              {index + 1}. {leader.name}: {leader.totalNew} nuevos asistentes
            </li>
          ))}
        </ul>
      </Card>

      {/* 🏆 Top líderes con más asistencia total */}
      <Card className="p-4 shadow-md w-full md:w-1/2">
        <h3 className="text-xl font-semibold">📊 Líderes con más asistencia</h3>
        <ul>
          {topAttendance.map((leader, index) => (
            <li key={index} className="text-lg">
              {index + 1}. {leader.name}: {leader.totalAttendance} asistentes
            </li>
          ))}
        </ul>
      </Card>
    </div>
      <div className="flex flex-wrap gap-3 p-3 mt-15">
        {weeklyData.map((week) => (
          <Card key={week.week} className="px-10 py-4 shadow-md ">
            <h4 className="text-xl font-semibold mb-4">{week.week}</h4>
            <p>Total de informes: {week.totalReports}</p>
            <p>Asistencia total: {week.totalAttendees}</p>
            <p>Nuevos asistentes: {week.newAttendees}</p>
            <p>Ofrenda total: ${week.offering.toLocaleString()}</p>
          </Card>
        ))}
      </div>
      {/* Gráficas separadas */}
      <div className="grid grid-cols-2 gap-2 p-1 mt-15">
        {/* Gráfica de Informes */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h5 className="text-lg font-semibold mb-2">Total de Informes</h5>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalReports" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Asistencia */}
    
        <div className="bg-white p-4 shadow-md rounded-md">
          <h5 className="text-lg font-semibold mb-2">Asistencia Total</h5>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalAttendees" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Nuevos Asistentes */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h5 className="text-lg font-semibold mb-2">Nuevos Asistentes</h5>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="newAttendees" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Ofrendas */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h5 className="text-lg font-semibold mb-2">Ofrenda Total</h5>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="offering" fill="#ffc107" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-4 p-4 mt-15">
       <h5>Descargar informacion Informes</h5>
      <label className="font-semibold">Selecciona un mes:</label>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={exportMonthlyData}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Descargar Excel
      </button>
    </div>
      
      </div>
    </div>
  );
};

export default Statistics;
