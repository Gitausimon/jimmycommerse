import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebase';
import styles from './AdminShared.module.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'print_orders'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const dbOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(dbOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Print Orders</h1>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p className={styles.loadingText}>Loading orders...</p>
        ) : (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Client</th>
                <th>Contact</th>
                <th>Specs / Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.emptyText}>No print orders yet.</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.service}</strong>
                      <br/>
                      <small style={{color: 'var(--gray-text)'}}>{order.designPath}</small>
                    </td>
                    <td>{order.contact?.name || 'N/A'}</td>
                    <td>
                      {order.contact?.phone || 'N/A'}
                      <br/>
                      <small>{order.contact?.delivery || 'pickup'}</small>
                    </td>
                    <td>
                      {order.specs ? (
                        <>
                          Qty: {order.specs.quantity} | {order.specs.material}
                        </>
                      ) : (
                        'Custom Consultation'
                      )}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status || 'pending']}`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      <button className={styles.editBtn}>Update</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
