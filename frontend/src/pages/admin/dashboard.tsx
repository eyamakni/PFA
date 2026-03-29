import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role !== "ADMIN") {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3003/admin/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [navigate]);

  if (!stats) return <div className="loading-skeleton" />;

  const totalReservations =
    stats.confirmedReservations + stats.cancelledReservations;

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
<div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>        <h2 className="title-gradient">Velora Admin</h2>

        <div className="sidebar-links">
          <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/admin/hotels")}>Hotels</button>
          <button onClick={() => navigate("/admin/rooms")}>Rooms</button>
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="dashboard-header">

          {/* MENU BUTTON (mobile) */}
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h1>Dashboard</h1>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="dashboard-grid">
          <Card title="Users" value={stats.totalUsers} />
          <Card title="Reservations" value={stats.totalReservations} />
          <Card title="Hotels" value={stats.totalHotels} />
          <Card title="Rooms" value={stats.totalRooms} />
        </div>

        {/* PIE CHART */}
        <h2 className="section-title">Reservations Overview</h2>

        <div className="chart-container">
          {totalReservations === 0 ? (
            <p className="empty-chart">No reservation data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Confirmed", value: stats.confirmedReservations },
                    { name: "Cancelled", value: stats.cancelledReservations },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  <Cell fill="#6366f1" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* BAR CHART */}
        <h2 className="section-title">Inventory Overview</h2>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Hotels", value: stats.totalHotels },
                { name: "Rooms", value: stats.totalRooms },
              ]}
            >
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SHORTCUTS */}
        <h2 className="section-title">Quick Actions</h2>

        <div className="shortcut-grid">
          <Shortcut title="Add Hotel" onClick={() => navigate("/admin/create-hotel")} />
          <Shortcut title="Manage Hotels" onClick={() => navigate("/admin/hotels")} />
          <Shortcut title="Add Room" onClick={() => navigate("/admin/create-room")} />
          <Shortcut title="Manage Rooms" onClick={() => navigate("/admin/rooms")} />
        </div>

      </div>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, value }: any) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

function Shortcut({ title, onClick }: any) {
  return (
    <div className="shortcut-card" onClick={onClick}>
      {title}
    </div>
  );
}