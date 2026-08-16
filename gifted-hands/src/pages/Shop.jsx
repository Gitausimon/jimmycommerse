import { useState, useEffect } from 'react';
import ProductCard from '../components/shop/ProductCard';
import styles from './Shop.module.css';
import { Filter } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const STUB_PRODUCTS = [
  { id: 1, name: 'Premium Conqueror Paper A4', category: 'Specialty Paper', price: 2500, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&q=80' },
  { id: 2, name: 'HP LaserJet Pro M404n', category: 'Office Equipment', price: 35000, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&q=80' },
  { id: 3, name: 'Pilot G2 Pens (Box of 12)', category: 'Stationery', price: 1800, image: 'https://images.unsplash.com/photo-1585336261022-680e61d8b2d1?w=500&q=80' },
  { id: 4, name: 'Executive Leather Portfolio', category: 'Corporate Gifts', price: 4500, image: 'https://images.unsplash.com/photo-1553456558-aff63285aaa1?w=500&q=80' },
  { id: 5, name: 'Scientific Calculator fx-991EX', category: 'School Supplies', price: 3200, image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&q=80' },
  { id: 6, name: 'A4 Lever Arch Files (Pack of 10)', category: 'Office Supplies', price: 3000, image: 'https://images.unsplash.com/photo-1554162125-da3ee435bb15?w=500&q=80' },
];

const CATEGORIES = ['All', 'Specialty Paper', 'Office Equipment', 'Stationery', 'Corporate Gifts', 'School Supplies', 'Office Supplies'];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState(STUB_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const dbProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (dbProducts.length > 0) {
          setProducts(dbProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className={styles.shopContainer}>
      <div className="container">
        <header className={styles.shopHeader}>
          <h1>Shop Supplies</h1>
          <p>High-quality materials and equipment for your professional needs.</p>
        </header>

        <div className={styles.shopLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.filterHeader}>
              <Filter size={20} />
              <h3>Categories</h3>
            </div>
            <ul className={styles.categoryList}>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.productSection}>
            <div className={styles.productHeader}>
              <span>Showing {filteredProducts.length} results</span>
            </div>
            
            <div className={styles.grid}>
              {loading ? (
                <p>Loading products...</p>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
