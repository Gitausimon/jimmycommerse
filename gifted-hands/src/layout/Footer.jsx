import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandSection}>
          <div className={styles.brand}>
            <img src={logo} alt="Gifted Hands" className={styles.logo} />
          </div>
          <p className={styles.brandDesc}>
            Your trusted partner for high-quality stationery, bespoke branding, 
            and large-format printing right here in Nairobi.
          </p>
        </div>

        <div className={styles.linksSection}>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop/specialty-papers">Specialty Papers</Link></li>
            <li><Link to="/shop/promotional">Promotional Goods</Link></li>
            <li><Link to="/shop/school">School Stationery</Link></li>
            <li><Link to="/shop/office">Office Equipment</Link></li>
          </ul>
        </div>

        <div className={styles.linksSection}>
          <h4>Services</h4>
          <ul>
            <li><Link to="/printing">Business Cards</Link></li>
            <li><Link to="/printing">Flyers & Brochures</Link></li>
            <li><Link to="/printing">Banners & Signage</Link></li>
            <li><Link to="/printing">Branded Merch</Link></li>
          </ul>
        </div>

        <div className={styles.linksSection}>
          <h4>Contact & Info</h4>
          <ul>
            <li>Sheikh Karume Road, Nairobi</li>
            <li><a href="tel:0758519041">0758519041</a></li>
            <li><a href="mailto:hello@giftedhands.co.ke">hello@giftedhands.co.ke</a></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Gifted Hands. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
