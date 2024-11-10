// src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        <header style={{ padding: '20px', backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>MyCollection</h1>
                <div style={{paddingRight:'20px'}}>
                    <button className='buttonbase'>Loggin</button>
                    <button className='buttonbase'>Register</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
