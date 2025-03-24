import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const RevenueChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white p-3 shadow-md rounded-lg transition duration-300">
      <h3 className="font-semibold text-sm mb-2">Revenue Overview</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          onMouseMove={(e) => setHoveredIndex(e.activeTooltipIndex)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-md">
                    <p className="font-semibold">{payload[0].payload.day}</p>
                    <p>Income: <span className="font-bold text-green-400">${payload[0].value}</span></p>
                    <p>Expense: <span className="font-bold text-red-400">${payload[1].value}</span></p>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ stroke: "rgba(0, 0, 0, 0.1)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke={hoveredIndex !== null ? "#2E7D32" : "#4CAF50"}
            strokeWidth={2.5}
            dot={{ r: hoveredIndex !== null ? 6 : 4 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke={hoveredIndex !== null ? "#D32F2F" : "#F44336"}
            strokeWidth={2.5}
            dot={{ r: hoveredIndex !== null ? 6 : 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
