import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";


const AttendancePieChart = ({ type }) => {
  const { informes } = useStoreInformes();
  const { leaders } = useStoreLeaders();
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    let mensAttendees = 0;
    let menNewAttendees = 0;
    let womanAttendees = 0;
    let womanNewAttendees = 0;
    const groupedData = [1, 2, 3, 4].map((week) => {

      const informesSemana = informes.filter((informe) => informe.week == week);
  

  
      informesSemana.forEach((inf) => {
        const leaderInfo = leaders.find((l) => l._id.trim().toLowerCase() === inf.leader.trim().toLowerCase());        
        if (leaderInfo) {
          if (leaderInfo.team === "Hombres") {
            mensAttendees += inf.numberAttendees ;
            menNewAttendees += inf.newAttendees ;
          } else if (leaderInfo.team === "Mujeres") {
            womanAttendees += inf.numberAttendees ;
            womanNewAttendees += inf.newAttendees ;
          }
        }
      });
  
      return {
        week,
        asistencia: [
          { name: "Hombres", value: mensAttendees },
          { name: "Mujeres", value: womanAttendees },
        ],
        nuevos: [
          { name: "Hombres", value: menNewAttendees },
          { name: "Mujeres", value: womanNewAttendees },
        ],
      };
    });

    const validWeeks = groupedData.filter(
      (weekData) => weekData.asistencia.some((d) => d.value > 0) || 
                     weekData.nuevos.some((d) => d.value > 0)
    );
  
    const lastWeekData = validWeeks.length > 0 ? validWeeks[validWeeks.length - 1] : { asistencia: [], nuevos: [] };
   
    
    setAttendanceData(lastWeekData[type]);
  
  }, [informes, leaders, type]);
  
  

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h5 className="text-lg font-semibold mb-2">
        {type === "asistencia" ? "Asistencia por Red" : "Nuevos Asistentes por Red"}
      </h5>
      <h6>Informacion del mes</h6>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={attendanceData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {attendanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

AttendancePieChart.propTypes = {
    type: PropTypes.string.isRequired,
}

export default AttendancePieChart;
