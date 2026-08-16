import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import styles from './AdminShared.module.css';
import PrintServiceModal from './PrintServiceModal';
import * as Icons from 'lucide-react';

export default function AdminPrintServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'print_services'));
      const dbServices = querySnapshot.docs.map(document => ({ docId: document.id, ...document.data() }));
      setServices(dbServices);
    } catch (error) {
      console.error("Error fetching print services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSaveService = async (serviceData) => {
    try {
      if (editingService) {
        await updateDoc(doc(db, 'print_services', editingService.docId), {
          id: serviceData.id,
          label: serviceData.label,
          iconName: serviceData.iconName,
          minQty: Number(serviceData.minQty)
        });
      } else {
        await addDoc(collection(db, 'print_services'), {
          id: serviceData.id,
          label: serviceData.label,
          iconName: serviceData.iconName,
          minQty: Number(serviceData.minQty)
        });
      }
      setIsModalOpen(false);
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to save service. Check console.");
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this print service option?")) return;
    try {
      await deleteDoc(doc(db, 'print_services', docId));
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Print Services Configurator</h1>
        <button className="btn btn-primary" onClick={openAddModal}>
          Add Print Option
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p className={styles.loadingText}>Loading print services...</p>
        ) : (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Label</th>
                <th>Identifier</th>
                <th>Min Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="5" className={styles.emptyText}>No print services defined. Add one above.</td>
                </tr>
              ) : (
                services.map(service => {
                  const IconComponent = Icons[service.iconName] || Icons.HelpCircle;
                  return (
                    <tr key={service.docId}>
                      <td>
                        <div style={{ color: 'var(--primary-accent)' }}>
                          <IconComponent size={24} />
                        </div>
                      </td>
                      <td>{service.label}</td>
                      <td><code>{service.id}</code></td>
                      <td>{service.minQty}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button className={styles.editBtn} onClick={() => openEditModal(service)}>Edit</button>
                          <button className={styles.deleteBtn} onClick={() => handleDelete(service.docId)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      <PrintServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        editingService={editingService}
      />
    </div>
  );
}
