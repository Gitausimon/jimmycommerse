import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSlider from '../components/shop/CartSlider';

export default function Layout() {
  return (
    <div className="layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="main-content" style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <CartSlider />
    </div>
  );
}
