import React, { useState, useEffect } from 'react';

const PanicButton = ({ onOpenControlPanel }) => {
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

    return null;
};

export default PanicButton;
