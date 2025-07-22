// src/components/Layout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/" className={`${location.pathname === '/' ? 'text-yellow-400' : ''}`}>Dashboard</Link>
          <Link to="/users" className={`${location.pathname === '/users' ? 'text-yellow-400' : ''}`}>Users</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
