import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi"; 
import { FaUserInjured, FaCalendarCheck, FaUsers, FaDollarSign } from "react-icons/fa";
import RevenueChart from "../../elements/revenueChart/RevenueChart";
import AppointmentsChart from "../../elements/appointmentsChart/AppointmentsChart"

const tiles_data = [
  { label: "Total Patients", value: 965, change: 5.3, diff: 10, icon: <FaUserInjured /> },
  { label: "Appointments", value: 128, change: -1.3, diff: -2, icon: <FaCalendarCheck /> },
  { label: "Meetings", value: 56, change: 4.1, diff: 5, icon: <FaUsers /> },
  { label: "Payments Processed", value: 12450, change: 3.7, diff: 450, icon: <FaDollarSign /> },
];

// Dummy Data for Graphs
const revenueData = [
  { day: "Monday", income: 1500, expense: 900 },
  { day: "Tuesday", income: 1800, expense: 1100 },
  { day: "Wednesday", income: 1700, expense: 1050 },
  { day: "Thursday", income: 2000, expense: 1300 },
  { day: "Friday", income: 1900, expense: 1250 },
  { day: "Saturday", income: 2200, expense: 1450 },
  { day: "Sunday", income: 2100, expense: 1400 },
];

const appointmentsData = [
  { day: "Monday", appointments: 30 },
  { day: "Tuesday", appointments: 40 },
  { day: "Wednesday", appointments: 45 },
  { day: "Thursday", appointments: 42 },
  { day: "Friday", appointments: 38 },
  { day: "Saturday", appointments: 25 },
  { day: "Sunday", appointments: 20 },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="h-full max-h-full p-4">

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {tiles_data.map((item, index) => (
          <div 
            key={index} 
            className="p-3 bg-mylightblue rounded-lg border transform transition-transform duration-300 hover:scale-105 shadow-md"
          >
            <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold">
              {item.icon}
              <p>{item.label}</p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <h2 className="text-xl font-bold">{item.value}</h2>
              <span
                className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                  item.change > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {item.change > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              {item.diff > 0
                ? `${item.diff} more than yesterday`
                : `${Math.abs(item.diff)} less than yesterday`}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <RevenueChart data={revenueData} />
        <AppointmentsChart data={appointmentsData} />
        <div className="bg-white p-3 shadow-md rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Schedule Calendar</h3>
          <Calendar onChange={setSelectedDate} value={selectedDate} className="w-full text-black" />
        </div>
      </div>

      {/* Live Chats & Patient Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {/* Live Chats */}
        <div className="bg-white p-3 shadow-md rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-black">Live Chats</h3>
          <ul>
            {["Dr. Olivia Martinez", "John Doe - Patient", "Sarah - Assistant", "John Doe - Patient"].map((name, index) => (
              <li key={index} className="flex items-center justify-between py-2 border-b last:border-none text-sm text-black ">
                <span>{name}</span>
                <button className="text-blue-500 text-xs bg-gray-200">Open Chat</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Appointments */}
        <div className="bg-white p-3 shadow-md rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-black">Patient Appointments</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-black text-left">
                <th className="p-2">Patient</th>
                <th className="p-2">Date</th>
                <th className="p-2">Doctor</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Caren G. Simpson", date: "20-07-28", doctor: "Dr. Petra Winsbury", status: "Confirmed" },
                { name: "Edgar Warrow", date: "20-07-28", doctor: "Dr. Olivia Martinez", status: "Pending" },
                { name: "Ocean Jane Lupre", date: "20-07-28", doctor: "Dr. Damian Sanchez", status: "Cancelled" },
                { name: "Ocean Jane Lupre", date: "20-07-28", doctor: "Dr. Damian Sanchez", status: "Pending" },
              ].map((appointment, index) => (
                <tr key={index} className="border-b text-black">
                  <td className="p-2">{appointment.name}</td>
                  <td className="p-2">{appointment.date}</td>
                  <td className="p-2">{appointment.doctor}</td>
                  <td className={`p-2 font-semibold ${appointment.status === "Confirmed" ? "text-green-500" : appointment.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                    {appointment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
