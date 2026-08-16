import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import styles from './AdminLayout.module.css';
import logo from '../assets/logo.svg';

export default function AdminLayout() {
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
          <Link to="/" className={styles.logoutBtn}>
            <LogOut size={18} />
            Exit Admin
          </Link>
        </header>
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
