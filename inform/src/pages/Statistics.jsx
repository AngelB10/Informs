import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const getMonthWeek = (date) => {
  const dayOfMonth = new Date(date).getDate();
  return Math.min(Math.ceil(dayOfMonth / 7), 4); // Máximo 4 semanas
};

const Statistics = () => {
  const { informes } = useStoreInformes();
  const { leaders } = useStoreLeaders();
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const groupedData = [1, 2, 3, 4].map((week) => {
      const informesSemana = informes.filter(
        (informe) => getMonthWeek(informe.date) === week
      );

      return {
        week: `Semana ${week}`,
        total: informesSemana.length,
        leaders: informesSemana.map((inf) => leaders.find((l) => l._id === inf.mainLeader)?.name || "No encontrado"),
      };
    });

    setWeeklyData(groupedData);
  }, [informes, leaders]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="space-y-4">
        {weeklyData.map((week) => (
          <Card key={week.week} className="p-4 shadow-md">
            <h3 className="text-xl font-semibold">{week.week}</h3>
            <p>Total de informes: {week.total}</p>
            <p>Líderes: {week.leaders.join(", ")}</p>
          </Card>
        ))}
      </div>

      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-2">Resumen Mensual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
