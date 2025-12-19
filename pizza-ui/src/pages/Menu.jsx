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
                        'Authorization': 'Bearer eyJ4NXQiOiJNekF6TVRGak9EUTFNRE5qT1RVMVpEQTROR1E1TURrell6RTNNV0k0TW1SbFpHVTNZelpqWWprNFpHUmtNMlJoTW1Jd01qQXhZekpsTUdKak5qZG1OdyIsImtpZCI6Ik16QXpNVEZqT0RRMU1ETmpPVFUxWkRBNE5HUTVNRGt6WXpFM01XSTRNbVJsWkdVM1l6WmpZams0WkdSa00yUmhNbUl3TWpBeFl6SmxNR0pqTmpkbU53X1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmOTliOTFhZi1mMzYzLTRmNDQtYTBhMC1lMTQ3NjQxYWY0YmYiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlBLZ2Q5MzhOSGlTZnFGVDl1QmFyem9PaTNDc2EiLCJuYmYiOjE3NjYwNDkzODEsImF6cCI6IlBLZ2Q5MzhOSGlTZnFGVDl1QmFyem9PaTNDc2EiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovLzQuMTk0LjE5OS4xOTY6OTQ0My9vYXV0aDIvdG9rZW4iLCJleHAiOjE3NjYwNTI5ODEsImlhdCI6MTc2NjA0OTM4MSwianRpIjoiMjllZGI4ZDgtMzI2Ny00ZTZlLWI0ODYtMmNmNjQ4ZmZjZWMxIiwiY2xpZW50X2lkIjoiUEtnZDkzOE5IaVNmcUZUOXVCYXJ6b09pM0NzYSJ9.UumVbf4LHLopC2nRcHscGe9uCgosBDsD55-fV4GZqKrBPumnH4wJ9ZWUqFcvkHIO80jedo7LuXLUIdpXzLz6ayQByVm2OAZcdtX61cSXumo4CV9Gh6w4M_81PNbZLnIkcR70wliuvzcghzkva5Ug8pdXaZv4YCbPLwLP391mMta_d_60tg7LMTePdK5owGQcdIpU3RemVPfBN-kCmWH7b0glJXyVG5xHpE-Pj1Z4ByEjfpSwvJDAapeh5aHB4LhPbZ2V5yX8xo4GbfGNVvSr7c4MIUOW5Hia9ROyyKNyUQ-nodU8sk-ApKChetXJxK-h0RZxwR50-K2-RDbPFrAF7g',
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
