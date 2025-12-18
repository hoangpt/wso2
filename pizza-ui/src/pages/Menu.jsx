import React, { useState, useEffect } from 'react';
import PizzaCard from '../components/PizzaCard';
import { useCart } from '../context/CartContext';
import { Loader } from 'lucide-react';

const Menu = () => {
    const { addToCart } = useCart();
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // Use relative path which will be proxied
                const response = await fetch('/pizzashack/1.0.0/menu', {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer eyJ4NXQiOiJNekF6TVRGak9EUTFNRE5qT1RVMVpEQTROR1E1TURrell6RTNNV0k0TW1SbFpHVTNZelpqWWprNFpHUmtNMlJoTW1Jd01qQXhZekpsTUdKak5qZG1OdyIsImtpZCI6Ik16QXpNVEZqT0RRMU1ETmpPVFUxWkRBNE5HUTVNRGt6WXpFM01XSTRNbVJsWkdVM1l6WmpZams0WkdSa00yUmhNbUl3TWpBeFl6SmxNR0pqTmpkbU53X1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3NmJjY2UzOC0wZTEwLTRiNWQtYmQ0MS1lMTkyY2ZmYjVmNTgiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6InByX0phTGJycmZEX2ZBMExUd3NqVnJ2SzNwQWEiLCJuYmYiOjE3NjU5NjI4ODQsImF6cCI6InByX0phTGJycmZEX2ZBMExUd3NqVnJ2SzNwQWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5NDQzL29hdXRoMi90b2tlbiIsImV4cCI6MTc2NTk2NjQ4NCwiaWF0IjoxNzY1OTYyODg0LCJqdGkiOiJhYzY5MTc2ZC0wZDkyLTQxYjUtODVjNy03Y2EyYjRkYzRlYjAiLCJjbGllbnRfaWQiOiJwcl9KYUxicnJmRF9mQTBMVHdzalZydkszcEFhIn0.SgDjPASsqxZZumkAA6exiUX8W5DOE7dxJul8OSnJ28a7CS5FiDuo2dITpLR37A2uH_J14qP9oxXXlryODiRAYJZYUU_0nwcXz3_G6BzTtQbQkrjAqIv-5fVCiih9hQrGoFWpeePLT0KQ6BEdiatZ7Cipxv2UWAYIyn-hYoyhfL5WMyG5JiT-RqnE3OX-3ro7NoCgT6Rb4dtXxqthR2JDy-Ln0tMQBWJ4TPKa5G3Cw0nPVvmQnOZSqO2rf99PLzq7H0bi4DHsxaPIbR1J8TRccYtynbZQV-kGD6h9_3ieXYHyLNJPv32JqiLjATU58jM7nDc6KiAQo_iYggzh34wCCA'
                    }
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();

                // Transform API data to match app structure
                const transformedData = data.map((item, index) => ({
                    id: index + 1, // API doesn't seem to return ID, using index
                    name: item.name,
                    description: item.description,
                    price: parseFloat(item.price),
                    image: transformImage(item.icon)
                }));

                setPizzas(transformedData);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch menu:", err);
                setError("Failed to load menu. Please make sure the API is running.");
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const transformImage = (iconPath) => {
        // Return relative path to be proxied
        return `/pizzashack/1.0.0${iconPath}`;
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--primary)' }}>
                <Loader className="animate-spin" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2 style={{ color: 'var(--primary)' }}>Oops!</h2>
                <p style={{ color: 'var(--text-muted)' }}>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Our <span className="text-gradient">Menu</span></h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {pizzas.map(pizza => (
                    <PizzaCard key={pizza.id} pizza={pizza} onAdd={() => addToCart(pizza)} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
