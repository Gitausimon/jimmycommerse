import { useState, useEffect } from 'react';
import styles from './ProductModal.module.css'; // Reuse product modal styles

const ICONS = ['IdCard', 'FileText', 'LayoutTemplate', 'Mail', 'Shirt', 'Palette', 'Briefcase', 'Book', 'Gift', 'Image'];

export default function PrintServiceModal({ isOpen, onClose, onSave, editingService }) {
  const [formData, setFormData] = useState({
    id: '', // Used for frontend state mapping like 'business_cards'
    label: '',
    iconName: 'IdCard',
    minQty: 1
  });

  useEffect(() => {
    if (editingService) {
      setFormData({
        id: editingService.idLabel || editingService.id || '', // idLabel to prevent overwriting firestore id in state internally, though we can just manage this.
        label: editingService.label || '',
        iconName: editingService.iconName || 'IdCard',
        minQty: editingService.minQty || 1
      });
    } else {
      setFormData({ id: '', label: '', iconName: 'IdCard', minQty: 1 });
    }
  }, [editingService, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{editingService ? 'Edit Print Service' : 'Add Print Service'}</h2>
          <button type="button" onClick={onClose} className={styles.closeBtn}>&times;</button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Service Internal ID (e.g. flyers) <span className={styles.required}>*</span></label>
            <input 
              type="text" 
              name="id" 
              required 
              value={formData.id} 
              onChange={handleChange} 
              className={styles.input}
              placeholder="Unique lowercase identifier"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Display Label <span className={styles.required}>*</span></label>
            <input 
              type="text" 
              name="label" 
              required 
              value={formData.label} 
              onChange={handleChange} 
              className={styles.input}
              placeholder="Flyers & Brochures"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Icon <span className={styles.required}>*</span></label>
            <select 
              name="iconName" 
              required 
              value={formData.iconName} 
              onChange={handleChange} 
              className={styles.input}
            >
              {ICONS.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Minimum Quantity <span className={styles.required}>*</span></label>
            <input 
              type="number" 
              name="minQty" 
              required 
              min="1"
              value={formData.minQty} 
              onChange={handleChange} 
              className={styles.input}
            />
          </div>

          <footer className={styles.footer}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Service</button>
          </footer>
        </form>
      </div>
    </div>
  );
}
