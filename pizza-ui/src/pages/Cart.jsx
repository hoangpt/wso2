import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added any delicious pizzas yet.</p>
                <Link to="/menu" className="btn-primary" style={{ textDecoration: 'none' }}>
                    Browse Menu <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Your <span className="text-gradient">Order</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cart.map(item => (
                        <div key={item.id} className="glass-panel" style={{
                            padding: '1.5rem',
                            borderRadius: 'var(--radius)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}>
                            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />

                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--darker)', padding: '0.5rem', borderRadius: '50px' }}>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}>
                                    <Minus size={16} />
                                </button>
                                <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}>
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{
                                    background: 'rgba(255, 71, 87, 0.1)',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius)', height: 'fit-content' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                        <span>Delivery</span>
                        <span>$5.00</span>
                    </div>

                    <div style={{ borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>${(cartTotal + 5).toFixed(2)}</span>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Checkout Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
