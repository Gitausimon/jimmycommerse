import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart, useCartDispatch } from '../../context/CartContext';
import styles from './CartSlider.module.css';
import { Link } from 'react-router-dom';

export default function CartSlider() {
  const cart = useCart();
  const dispatch = useCartDispatch();

  if (!cart.isOpen) return null;

  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleClose = () => dispatch({ type: 'TOGGLE_CART' });

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <aside className={styles.slider}>
        <header className={styles.header}>
          <h2>Your Cart</h2>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </header>

        <div className={styles.content}>
          {cart.items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} />
              <p>Your cart is empty.</p>
              <Link to="/shop" onClick={handleClose} className="btn btn-secondary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className={styles.cartList}>
              {cart.items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>KSh {item.price.toLocaleString()}</p>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControl}>
                        <button 
                          className={styles.qtyBtn} 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button 
                          className={styles.qtyBtn} 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className={styles.removeBtn} 
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <footer className={styles.footer}>
            <div className={styles.summary}>
              <span>Total</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>
            {/* The checkout process logic will either go to a new route or modal depending on needs, for now it will just log or redirect */}
            <button className={`btn btn-primary ${styles.checkoutBtn}`} onClick={() => alert('Proceeding to delivery details & payment integrations...')}>
              Checkout <ArrowRight size={18} />
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
