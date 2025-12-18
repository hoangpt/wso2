import React from 'react';
import { Plus } from 'lucide-react';

const PizzaCard = ({ pizza, onAdd }) => {
    return (
        <div className="glass-panel" style={{
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ overflow: 'hidden', height: '200px' }}>
                <img
                    src={pizza.image}
                    alt={pizza.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{pizza.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                    {pizza.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>
                        ${pizza.price.toFixed(2)}
                    </span>

                    <button
                        className="btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        onClick={() => onAdd && onAdd(pizza)}
                    >
                        <Plus size={18} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaCard;
