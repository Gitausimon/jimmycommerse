import { useState, useEffect } from 'react';
import styles from './Printing.module.css';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function Printing() {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    service: null,
    designPath: null,
    specs: { quantity: 500, material: 'Standard', finish: 'None' },
    consultation: 'Phone Call',
    contact: { name: '', phone: '', delivery: 'pickup', destination: '', sacco: '' }
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'print_services'));
        const dbServices = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        setServices(dbServices);
      } catch (error) {
        console.error("Error fetching print services:", error);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  const activeServiceObj = services.find(s => s.id === order.service);
  const minQty = activeServiceObj ? activeServiceObj.minQty : 1;
  const qtyPresets = minQty >= 100 ? [100, 250, 500, 1000] : [1, 5, 10, 50];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const updateOrder = (key, val) => setOrder(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'print_orders'), {
        ...order,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setStep(5);
    } catch (error) {
      console.error("Error submitting order: ", error);
      alert("There was an issue submitting your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.printContainer}>
      <div className={`container ${styles.wizardWrapper}`}>
        <header className={styles.header}>
          <h1>Print Order Wizard</h1>
          <p>Complete your order in 4 simple steps.</p>
          
          <div className={styles.progress}>
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`${styles.progressNode} ${step >= s ? styles.activeNode : ''}`} 
              />
            ))}
          </div>
        </header>

        <main className={styles.wizardContent}>
          {step === 1 && (
            <div className={styles.stepPane}>
              <h2>1. What do you need?</h2>
              {loadingServices ? (
                <p>Loading available services...</p>
              ) : (
                <div className={styles.gridCards}>
                  {services.map(svc => {
                    const IconComp = Icons[svc.iconName] || Icons.HelpCircle;
                    return (
                      <button 
                        key={svc.id} 
                        className={`${styles.selectCard} ${order.service === svc.id ? styles.selected : ''}`}
                        onClick={() => {
                          updateOrder('service', svc.id);
                          setTimeout(nextStep, 300);
                        }}
                      >
                        <span className={styles.cardIcon}>
                          <IconComp size={40} className={styles.iconBlue} />
                        </span>
                        <span className={styles.cardLabel}>{svc.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepPane}>
              <h2>2. Your Design</h2>
              <div className={styles.gridCards}>
                <button 
                  className={`${styles.selectCard} ${order.designPath === 'upload' ? styles.selected : ''}`}
                  onClick={() => { updateOrder('designPath', 'upload'); nextStep(); }}
                >
                  <Icons.Upload size={32} className={styles.iconBlue} />
                  <span className={styles.cardLabel}>I have my design</span>
                  <small className={styles.cardSub}>Upload PDF, AI, or PNG</small>
                </button>

                <button 
                  className={`${styles.selectCard} ${order.designPath === 'template' ? styles.selected : ''}`}
                  onClick={() => { updateOrder('designPath', 'template'); nextStep(); }}
                >
                  <Icons.FileText size={32} className={styles.iconBlue} />
                  <span className={styles.cardLabel}>Pick a template</span>
                  <small className={styles.cardSub}>Customize existing layouts</small>
                </button>

                <button 
                  className={`${styles.selectCard} ${order.designPath === 'design' ? styles.selected : ''}`}
                  onClick={() => { updateOrder('designPath', 'design'); nextStep(); }}
                >
                  <Icons.CheckCircle2 size={32} className={styles.iconBlue} />
                  <span className={styles.cardLabel}>Design for me</span>
                  <small className={styles.cardSub}>We create it from scratch</small>
                </button>
              </div>
              <div className={styles.stepActions}>
                <button className="btn btn-secondary" onClick={prevStep}>Back</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepPane}>
              {order.designPath === 'design' ? (
                <>
                  <h2>3. Schedule Consultation</h2>
                  <div className={styles.specSection}>
                    <label>How should our designers connect with you?</label>
                    <div className={styles.pillGroup}>
                      {['Phone Call', 'Google Meet'].map(method => (
                        <button 
                          key={method}
                          className={`${styles.pill} ${order.consultation === method ? styles.selectedPill : ''}`}
                          onClick={() => updateOrder('consultation', method)}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2>3. Quantity & Specs</h2>
                  <div className={styles.specSection}>
                    <label>Quantity {minQty > 1 ? `(Minimum ${minQty})` : ''}</label>
                    <div className={styles.pillGroup}>
                      {qtyPresets.map(qty => (
                        <button 
                          type="button"
                          key={qty}
                          className={`${styles.pill} ${order.specs.quantity === qty ? styles.selectedPill : ''}`}
                          onClick={() => updateOrder('specs', { ...order.specs, quantity: qty })}
                        >
                          {qty}
                        </button>
                      ))}
                      <div className={styles.customQty}>
                        <span className={styles.customQtyLabel}>Custom value:</span>
                        <input 
                          type="number" 
                          min={minQty} 
                          className={styles.input} 
                          value={order.specs.quantity} 
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateOrder('specs', { ...order.specs, quantity: isNaN(val) ? '' : val });
                          }}
                          onBlur={(e) => {
                            if (!order.specs.quantity || order.specs.quantity < minQty) {
                              updateOrder('specs', { ...order.specs, quantity: minQty });
                            }
                          }}
                        />
                      </div>
                    </div>
                    {order.specs.quantity < minQty && (
                      <small style={{ color: '#ef4444', display: 'block', marginTop: '0.75rem', fontWeight: '500' }}>
                        * Warning: The minimum order requirement is {minQty} pieces.
                      </small>
                    )}
                  </div>
                  
                  <div className={styles.specSection}>
                    <label>Material / Finish</label>
                    <div className={styles.pillGroup}>
                      {['Standard', 'Matte', 'Glossy', 'Textured'].map(mat => (
                        <button 
                          key={mat}
                          className={`${styles.pill} ${order.specs.material === mat ? styles.selectedPill : ''}`}
                          onClick={() => updateOrder('specs', { ...order.specs, material: mat })}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className={styles.stepActions}>
                <button className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button className="btn btn-primary" onClick={nextStep}>Continue to Delivery</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.stepPane}>
              <h2>4. Contact & Delivery</h2>
              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input required type="text" className={styles.input} value={order.contact.name} onChange={e => updateOrder('contact', {...order.contact, name: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Mobile Number (WhatsApp preferred)</label>
                  <input required type="tel" className={styles.input} placeholder="+254" value={order.contact.phone} onChange={e => updateOrder('contact', {...order.contact, phone: e.target.value})} />
                </div>

                {order.designPath === 'design' && order.consultation === 'Google Meet' && (
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input required type="email" className={styles.input} placeholder="name@example.com" />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label>Delivery Method</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="delivery" checked={order.contact.delivery === 'pickup'} onChange={() => updateOrder('contact', {...order.contact, delivery: 'pickup'})}/> Pick up at Shop
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="delivery" checked={order.contact.delivery === 'delivery'} onChange={() => updateOrder('contact', {...order.contact, delivery: 'delivery'})}/> Deliver to me
                    </label>
                  </div>
                </div>

                {order.contact.delivery === 'delivery' && (
                  <>
                    <div className={styles.formGroup}>
                      <label>Destination (Town/City)</label>
                      <input required type="text" className={styles.input} value={order.contact.destination} onChange={e => updateOrder('contact', {...order.contact, destination: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Preferred Bus Sacco (e.g. EasyCoach, Mololine)</label>
                      <input type="text" className={styles.input} value={order.contact.sacco} onChange={e => updateOrder('contact', {...order.contact, sacco: e.target.value})} />
                    </div>
                  </>
                )}

                <div className={styles.stepActions}>
                  <button type="button" className="btn btn-secondary" onClick={prevStep} disabled={isSubmitting}>Back</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 5 && (
            <div className={styles.successPane}>
              <div className={styles.successIcon}>
                <Icons.CheckCircle2 size={64} />
              </div>
              <h2>Order Received!</h2>
              {order.designPath === 'design' && order.consultation === 'Google Meet' ? (
                <>
                  <p>We've sent a Google Meet invite to your email.<br/>You can also launch your empty meeting room below.</p>
                  <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <button 
                      type="button" 
                      onClick={() => window.open('https://meet.google.com/new', '_blank')} 
                      className="btn btn-secondary"
                    >
                      Launch Google Meet
                    </button>
                  </div>
                </>
              ) : (
                <p>We've sent a confirmation to your WhatsApp.<br/>Your print job is now in our system.</p>
              )}
              
              <div style={{ marginTop: '2rem' }}>
                <Link to="/" className="btn btn-primary">Return Home</Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
