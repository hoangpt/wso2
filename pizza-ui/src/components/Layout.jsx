import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '2rem' }}>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default Layout;
