import React from 'react';

/**
 * TrustedContactSuggestion — displayed during CARE MODE only.
 * Shows a gentle, non-forceful suggestion to call the pre-saved trusted contact.
 * Props: contact = { name, phone }, onDismiss = function
 */
const TrustedContactSuggestion = ({ contact, onDismiss }) => {
    if (!contact) return null;

    return (
        <div className="fade-in" style={{
            textAlign: 'center',
            padding: '18px',
            background: 'linear-gradient(135deg, #f3e5f5, #e8eaf6)',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            margin: '12px auto',
            maxWidth: '360px'
        }}>
            <p style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1rem',
                color: '#5a5a7a',
                lineHeight: '1.6',
                marginBottom: '14px'
            }}>
                You don't have to go through this alone.{'\n'}
                Would you consider talking to <strong>{contact.name}</strong>?
            </p>

            <a
                href={`tel:${contact.phone.replace(/[-\s]/g, '')}`}
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
                📞 Call {contact.name}
            </a>

            <div style={{ marginTop: '12px' }}>
                <button
                    onClick={onDismiss}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#999',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-hand)'
                    }}
                >
                    Not right now
                </button>
            </div>

            <p style={{
                fontSize: '0.7rem',
                color: '#bbb',
                marginTop: '8px',
                fontStyle: 'italic'
            }}>
                No call data is stored by Aura.
            </p>
        </div>
    );
};

export default TrustedContactSuggestion;
