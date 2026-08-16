import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './AdminLayout.module.css';
import logo from '../assets/logo.svg';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className={styles.adminGrid}>
      <aside className={styles.sidebar}>
        <Link to="/admin" className={styles.brand}>
          <img src={logo} alt="Logo" width="24" height="24" />
          Gifted <span>Admin</span>
        </Link>
        <nav className={styles.nav}>
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <ShoppingCart size={20} />
            Orders
          </NavLink>
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <Package size={20} />
            Products
          </NavLink>
          <NavLink 
            to="/admin/print-services" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <Package size={20} />
            Print Configs
          </NavLink>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <button onClick={handleLogout} className={styles.logoutBtn} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} />
            Exit Admin
          </button>
        </header>
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
