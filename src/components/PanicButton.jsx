import React, { useState, useEffect } from 'react';

const PanicButton = () => {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Keyboard shortcut triggers
        const handleKeyDown = (e) => {
            // Escape key triggers panic mode
            if (e.key === 'Escape') {
                setIsHidden(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (isHidden) {
        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(255, 255, 255, 0.98)', // Opaque white
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <h1 style={{ color: '#ccc', fontSize: '10rem', opacity: 0.1 }}>WORK</h1>
                <p style={{ color: '#999' }}>Press button below to resume</p>
                <button
                    onClick={() => setIsHidden(false)}
                    className="btn-primary"
                    style={{ marginTop: '20px' }}
                >
                    Unlock
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setIsHidden(true)}
            title="Panic Button (Hide Screen)"
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#ff6b6b',
                color: 'white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                zIndex: 100,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            👁️
        </button>
    );
};

export default PanicButton;
