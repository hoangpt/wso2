import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div style={{ paddingBottom: '4rem', marginTop: '2rem' }}>
            <div className="glass-panel" style={{
                padding: '4rem',
                borderRadius: '24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,71,87,0.1) 0%, rgba(18,18,18,0) 70%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1
                    }}>
                        The Best <span className="text-gradient">Pizza</span><br /> in Town
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Handcrafted with love, baked to perfection. Experience the authentic taste of premium ingredients in every slice.
                    </p>

                    <Link to="/menu" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', textDecoration: 'none' }}>
                        Order Now <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '4rem'
            }}>
                {[
                    { title: 'Fast Delivery', desc: 'Hot and fresh to your door in 30 mins.' },
                    { title: 'Fresh Ingredients', desc: 'Locally sourced organic vegetables.' },
                    { title: 'Master Chefs', desc: 'Authentic recipes from Italian masters.' }
                ].map((feature, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
