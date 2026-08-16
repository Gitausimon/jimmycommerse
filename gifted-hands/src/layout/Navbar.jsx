import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Printer } from 'lucide-react';
import styles from './Navbar.module.css';
import logo from '../assets/logo.svg';
import { useCart, useCartDispatch } from '../context/CartContext';

export default function Navbar() {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.brand}>
          <img src={logo} alt="Gifted Hands Logo" className={styles.logo} />
          <div className={styles.brandText}>Gifted <span>Hands</span></div>
        </Link>

        <nav className={styles.navLinks}>
          <Link to="/shop" className={styles.link}>Shop Supplies</Link>
          <Link to="/printing" className={styles.link}>
            <Printer size={18} /> Print Services
          </Link>
          <Link to="/about" className={styles.link}>About Us</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Account">
            <User size={24} />
          </button>
          <button 
            className={styles.iconBtn} 
            aria-label="Cart"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <ShoppingCart size={24} />
            <span className={styles.cartBadge}>{cartItemCount}</span>
          </button>
          <button className={`${styles.iconBtn} ${styles.mobileMenu}`} aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
