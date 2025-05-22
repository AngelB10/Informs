import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import exportToExcel from "../components/dwonloadExcel";
import AttendancePieChart from "../components/AttendancePieChart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



const Statistics = () => {
  const [ selectedMonth, setSelectedMonth ] = useState("");
  const { informes } = useStoreInformes();
  const { leaders } = useStoreLeaders();
  const [ weeklyData, setWeeklyData ] = useState([]);
  const [ topNewAttendees, setTopNewAttendees ] = useState([]);
  const [ topAttendance, setTopAttendance ] = useState([]);
  const [ monthlyData, setMonthlyData ] = useState([])
  const [ currentMonth, setCurrentMonth ] = useState(new Date().getMonth());
  const [ currentYear, setCurrentYear ] = useState(new Date().getFullYear());
  const [ministry, setMinistry] = useState()

useEffect(() => {
  const filteredInformes = informes.filter((inf) => {    
    return inf.date.slice(6, 7) - 1 == currentMonth && inf.date.slice(0, 4) == currentYear;
  });
    console.log(filteredInformes);
    

  const groupedData = [1, 2, 3, 4].map((week) => {    
  const informesSemana = filteredInformes.filter((informe) => informe.week == week);
    console.log(informesSemana);
    
    

    return {
      week: `Semana ${week}`,
      totalReports: informesSemana.length,
      totalAttendees: informesSemana.reduce((sum, inf) => sum + (inf.numberAttendees || 0), 0),
      newAttendees: informesSemana.reduce((sum, inf) => sum + (inf.newAttendees || 0), 0),
      offering: informesSemana.reduce((sum, inf) => sum + (inf.offering || 0), 0),
    };
  });

  setWeeklyData(groupedData);

  setMonthlyData({
    totalReports: filteredInformes.length,
    totalAttendees: filteredInformes.reduce((sum, inf) => sum + (inf.numberAttendees || 0), 0),
    newAttendees: filteredInformes.reduce((sum, inf) => sum + (inf.newAttendees || 0), 0),
    offering: filteredInformes.reduce((sum, inf) => sum + (inf.offering || 0), 0),
  });
}, [informes, currentMonth, currentYear]);

const changeMonth = (direction) => {
  let newMonth = currentMonth + direction;
  let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }


  setCurrentMonth(newMonth);
  setCurrentYear(newYear);
};


    const handleMinistryFilter = (data) => {
      const value = data.target.value;
      console.log(value);
      setMinistry(value)
      // if (value === "") {
      //   AllLeaders(); // Cargar todos los líderes
      // } else {
      //   filterByMinistry(value); // Filtrar según el tipo
      // }
    }

  const monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

  const optionsTwelveLeaders = (leaders || []).filter(leader => leader.mainLeader).map(leader => ({
  value: leader._id,
  name: leader.name,
}));



  useEffect(() => {
    const totalReports = informes.length;
    const totalAttendees = informes.reduce((sum, inf) => sum + (inf.numberAttendees || 0), 0);
    const newAttendees = informes.reduce((sum, inf) => sum + (inf.newAttendees || 0), 0);
    const offering = informes.reduce((sum, inf) => sum + (inf.offering || 0), 0);

    // Guardar los datos en el estado
    setMonthlyData({
      period: "Mes Completo",
      totalReports,
      totalAttendees,
      newAttendees,
      offering,
    });
  }, [ informes ]);



  // top de lideres 

  useEffect(() => {
    const leaderStats = {};

    const filteredInformes = informes.filter((inf) => {
      const infDate = new Date(inf.date);
      return infDate.getMonth() === currentMonth && infDate.getFullYear() === currentYear;
    });

    filteredInformes.forEach((inf) => {
      const leaderId = inf.leader;
      if (!leaderStats[ leaderId ]) {
        leaderStats[ leaderId ] = { name: "", totalNew: 0, totalAttendance: 0 };
      }

      leaderStats[ leaderId ].totalNew += inf.newAttendees;
      leaderStats[ leaderId ].totalAttendance += inf.numberAttendees;
    });

    // Asignar nombres a los líderes
    Object.keys(leaderStats).forEach((leaderId) => {
      leaderStats[ leaderId ].name =
        leaders.find((l) => l._id === leaderId)?.name || "Desconocido";
    });

    // Convertir a array y ordenar
    const leaderArray = Object.values(leaderStats);
    const sortedByNew = [ ...leaderArray ].sort((a, b) => b.totalNew - a.totalNew).slice(0, 12);
    const sortedByAttendance = [ ...leaderArray ].sort((a, b) => b.totalAttendance - a.totalAttendance).slice(0, 12);

    setTopNewAttendees(sortedByNew);
    setTopAttendance(sortedByAttendance);
  }, [ informes, leaders, currentMonth, currentYear ]);



  // funcion para descargar excel
  const exportMonthlyData = () => {
    if (!selectedMonth) {
      alert("Por favor, selecciona un mes.");
      return;
    }

    const monthNumber = parseInt(selectedMonth.split("-")[ 1 ]); // Extraer el número de mes (1-12)

    const filteredInformes = informes
      .filter((inf) => new Date(inf.date).getMonth() + 1 === monthNumber)
      .map((inf) => ({
        ...inf,
        mainLeader: leaders.find((l) => l._id === inf.mainLeader)?.name || "No encontrado",
      }));
    exportToExcel(filteredInformes, `Informes_Mes_${monthNumber}`);
  };

  return (
    <div className="p-2">
      <h3 className="!mb-10">Reportes</h3>
      <div className="flex items-center justify-center gap-4 mb-4">
        <button onClick={() => changeMonth(-1)}>⬅️</button>
        <h2>{monthNames[ currentMonth ]} {currentYear}</h2>
        <button onClick={() => changeMonth(1)}>➡️</button>
      </div>
      <div className="bg-gray-200 p-8 mb-2 rounded-2xl">
        <h4>Informacion estadistica datos semanales </h4>
        <div className="p-2">
          <div className="d-flex flex-wrap gap-2">
            {weeklyData.map((week) => (
              <Card key={week.week} className={"w-full sm:w-[48%] md:w-[48%] lg:w-[24%]   py-2 shadow bg-dark text-white"}>
                <Card.Body>
                  <Card.Title className="pb-3">🗓 {week.week} :</Card.Title>
                  <Card.Text>💼 Total de informes: {week.totalReports}</Card.Text>
                  <Card.Text>👨‍👩‍👧‍👧Asistencia total: {week.totalAttendees}</Card.Text>
                  <Card.Text>👭 Nuevos asistentes: {week.newAttendees}</Card.Text>
                  <Card.Text>💲 Ofrenda total: ${week.offering.toLocaleString()}</Card.Text>
                </Card.Body>
                <card-bottom>
                </card-bottom>
              </Card>
            ))}
          </div>
          <div className="mt-10 bg-dark rounded-[10px] w-[92%] text-white px-4 sm:px-8 md:px-8 lg:px-8 py-3">
            <h3>Resumen Mensual</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-2">
              <p className="bg-gray-700 p-3 rounded-[4px]">
                <strong className="mr-2">📋 Total de Informes:</strong>
                <strong className="text-[15px] sm:text-[18px] md:text-[15px]">
                  {monthlyData?.totalReports ? monthlyData.totalReports.toLocaleString() : "0"}
                </strong>
              </p>
              <p className="bg-gray-700 p-3 rounded-[4px]">
                <strong className="mr-2">👨‍👩‍👧‍👧 Total Asistencia:</strong>
                <strong className="text-[15px] sm:text-[18px] md:text-[15px]">
                  {monthlyData?.totalAttendees ? monthlyData.totalAttendees.toLocaleString() : "0"}
                </strong>
              </p>
              <p className="bg-gray-700 p-3 rounded-[4px]">
                <strong className="mr-2">👭 Nuevos Asistentes:</strong>
                <strong className="text-[15px] sm:text-[18px] md:text-[15px]">
                  {monthlyData?.newAttendees ? monthlyData.newAttendees.toLocaleString() : "0"}
                </strong>
              </p>
              <p className="bg-gray-700 p-3 rounded-[4px]">
                <strong className="mr-2">💲 Ofrendas:</strong>
                <strong className="text-[15px] sm:text-[18px] md:text-[15px]">
                  {monthlyData?.offering ? monthlyData.offering.toLocaleString() : "0"}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

       <div className="bg-gray-200 p-4 mb-2 rounded-2xl">
         <h4>Informacion por ministerio </h4>
        <div class="mb-3">
       <label className="form-label block">Filtrar ministerio</label><br />
        <select
          className="border border-gray-400 rounded p-2 w-[40%] bg-white"
          value={ministry}
          onChange={handleMinistryFilter}
        >
      <option value="">Todos</option>
        {optionsTwelveLeaders.map((leader) => (
          <option key={leader.value} value={leader.value}>
            {leader.name}
          </option>
        ))}
        </select>
    </div>
       </div>

      <div className="bg-gray-200 p-4 mb-2">
        <h4>Top líderes con más asistencia total y nuevos asistentes</h4>
        <p>Informacion Mensual</p>
        <div className="flex flex-wrap gap-1 p-2 ">
          {/* 🏆 Top líderes con más nuevos asistentes */}
          <Card className="p-4 shadow-md w-full md:w-[49%]">
            <h3 className="text-xl font-semibold">🎖️ Líderes con más nuevos asistentes</h3>
            <ul>
              {topNewAttendees.map((leader, index) => (
                <li key={index} className="text-lg ">
                  {index + 1}. {leader.name}: {leader.totalNew}
                </li>
              ))}
            </ul>
          </Card>

          {/* 🏆 Top líderes con más asistencia total */}
          <Card className="p-2 shadow-md w-full md:w-[49%] ">
            <h3 className="text-xl font-semibold">📊 Líderes con más asistencia</h3>
            <ul>
              {topAttendance.map((leader, index) => (
                <li key={index} className="text-lg">
                  {index + 1}. {leader.name}: {leader.totalAttendance}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="bg-gray-200 p-4 mb-2">
        <h4>Comparativa asistencia y cantidad de nuevos red de hombres y Mujeres</h4>
        <p>Informacion Mensual</p>
        <div className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
          <AttendancePieChart type="asistencia" mount={currentMonth} />
          <AttendancePieChart type="nuevos" mount={currentMonth} />
        </div>
      </div>

      <div className="bg-gray-200 p-4 mb-6 ">
        <h4>Graficas datos de informes</h4>
        {/* Gráficas separadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 p-1 mt-15">
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
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 mb-15 bg-gray-200 rounded-b-2xl">
        <h4>Descargar informacion Informes</h4>
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
  );
};

export default Statistics;