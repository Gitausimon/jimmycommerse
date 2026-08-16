import { useState, useEffect } from 'react';
import styles from './ProductModal.module.css';
import { uploadImageToCloudinary } from '../../services/cloudinary';

export default function ProductModal({ isOpen, onClose, onSave, editingProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || '',
        price: editingProduct.price || '',
        image: editingProduct.image || ''
      });
    } else {
      setFormData({ name: '', category: '', price: '', image: '' });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <button type="button" onClick={onClose} className={styles.closeBtn}>&times;</button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Product Name <span className={styles.required}>*</span></label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category <span className={styles.required}>*</span></label>
            <select 
              name="category" 
              required 
              value={formData.category} 
              onChange={handleChange} 
              className={styles.input}
            >
              <option value="">Select Category</option>
              <option value="Specialty Paper">Specialty Paper</option>
              <option value="Office Equipment">Office Equipment</option>
              <option value="Stationery">Stationery</option>
              <option value="Corporate Gifts">Corporate Gifts</option>
              <option value="School Supplies">School Supplies</option>
              <option value="Office Supplies">Office Supplies</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Price (KSh) <span className={styles.required}>*</span></label>
            <input 
              type="number" 
              name="price" 
              required 
              min="0"
              value={formData.price} 
              onChange={handleChange} 
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Product Image</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/webp"
                onChange={handleDocumentUpload} 
                className={styles.input}
                style={{ flex: 1 }}
                disabled={uploading}
              />
              {uploading && <span style={{ fontSize: '0.875rem', color: 'var(--primary-accent)', fontWeight: 'bold' }}>Uploading...</span>}
            </div>
            
            {formData.image && !uploading && (
              <div className={styles.imagePreview}>
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          <footer className={styles.footer}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={uploading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>Save Product</button>
          </footer>
        </form>
      </div>
    </div>
  );
}
