import { ArrowRight, Package, Printer, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1>
              Professional Printing <br /> & Office Supplies
            </h1>
            <p>
              Your trusted partner for high-quality stationery, bespoke branding, 
              and large-format printing right here in Nairobi.
            </p>
            <div className={styles.heroActions}>
              <Link to="/shop" className="btn btn-primary">
                Shop Supplies
              </Link>
              <Link to="/printing" className="btn btn-secondary">
                Print Services <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
              alt="Office Supplies and Printing Equipment" 
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Everything you need for your business</h2>
            <p>We provide comprehensive solutions tailored for local businesses and schools.</p>
          </div>

          <div className={styles.servicesGrid}>
            <div className="card">
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  <Package size={28} />
                </div>
                <h3>General Supplies</h3>
                <p>Day-to-day office consumables and school essentials ranging from pens to printing paper.</p>
                <Link to="/shop" className={styles.cardLink}>
                  Browse supplies <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="card">
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  <Palette size={28} />
                </div>
                <h3>Bespoke Branding</h3>
                <p>Let us create your brand identity. Logo design, social media graphics, and digital content.</p>
                <Link to="/printing" className={styles.cardLink}>
                  Request design <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="card">
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  <Printer size={28} />
                </div>
                <h3>Professional Printing</h3>
                <p>Letterheads, business cards, banners, and branded merchandise with quick turnaround.</p>
                <Link to="/printing" className={styles.cardLink}>
                  Start order <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
