import React from 'react';

const HelplineButton = () => {
    return (
        <div className="fade-in" style={{
            textAlign: 'center',
            padding: '16px',
            background: 'linear-gradient(135deg, #e8eaf6, #f3e5f5)',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            margin: '12px auto',
            maxWidth: '360px'
        }}>
            <p style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '0.95rem',
                color: '#5a5a7a',
                marginBottom: '12px'
            }}>
                Speaking to someone can help. 💙
            </p>
            <a
                href="tel:18005990019"
                style={{
                    display: 'inline-block',
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #7e57c2, #5c6bc0)',
                    color: 'white',
                    borderRadius: '24px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(126, 87, 194, 0.3)',
                    transition: 'all 0.2s'
                }}
            >
                📞 Call Kiran Helpline
            </a>
            <p style={{
                fontSize: '0.75rem',
                color: '#999',
                marginTop: '10px',
                fontStyle: 'italic'
            }}>
                Kiran Mental Health Helpline: 1800-599-0019 (Toll-free, 24/7)
            </p>
        </div>
    );
};

export default HelplineButton;
