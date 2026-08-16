import { Package, ShoppingCart, TrendingUp } from 'lucide-react';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(56, 161, 105, 0.1)', color: '#38a169' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Total Revenue</p>
            <h3 className={styles.statValue}>KSh 0</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(49, 130, 206, 0.1)', color: '#3182ce' }}>
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Active Orders</p>
            <h3 className={styles.statValue}>0</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(221, 107, 32, 0.1)', color: '#dd6b20' }}>
            <Package size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Products Listed</p>
            <h3 className={styles.statValue}>0</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
