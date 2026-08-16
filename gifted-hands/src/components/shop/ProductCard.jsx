import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import styles from './ProductCard.module.css';
import { useCartDispatch } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch({ type: 'ADD_ITEM', payload: product });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className={`card ${styles.productCard}`}>
      <div className={styles.imageContainer}>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className={styles.imagePlaceholder}>
            No Image
          </div>
        )}
      </div>
      <div className={styles.details}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>KSh {product.price.toLocaleString()}</p>
        <button 
          className={`btn btn-primary ${styles.addToCart}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'Added' : (
            <>
              <ShoppingCart size={16} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
