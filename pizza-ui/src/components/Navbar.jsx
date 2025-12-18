import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Pizza } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                    background: 'var(--primary)',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Pizza color="white" size={24} />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>
                    Pizza<span className="text-gradient">Hub</span>
                </span>
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
                <Link to="/menu" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: '500' }}>Menu</Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/cart" style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    position: 'relative'
                }}>
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '18px',
                            height: '18px',
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}>{cartCount}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
