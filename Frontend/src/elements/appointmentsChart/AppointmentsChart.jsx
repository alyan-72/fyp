import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AppointmentsChart = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div className="bg-white p-3 shadow-md rounded-lg transition duration-300">
      <h3 className="font-semibold text-sm mb-2">Appointments This Week</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          onMouseMove={(e) => setHoveredBar(e.activeTooltipIndex)}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-md">
                    <p className="font-semibold">{payload[0].payload.day}</p>
                    <p>Appointments: <span className="font-bold">{payload[0].value}</span></p>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          />
          <Bar
            dataKey="appointments"
            fill="#1985C5"
            radius={[5, 5, 0, 0]}
            barSize={40}
            onMouseOver={(data, index) => setHoveredBar(index)}
            onMouseOut={() => setHoveredBar(null)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentsChart;
