import React from 'react';

const SafetyCheckInCard = ({ onSafe, onUnsure, onNeedHelp }) => {
    const btnStyle = (bg, hover) => ({
        padding: '12px 24px',
        border: 'none',
        borderRadius: '20px',
        fontSize: '1rem',
        fontFamily: 'var(--font-hand)',
        cursor: 'pointer',
        background: bg,
        color: '#4a4a4a',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.2s',
        width: '100%',
        textAlign: 'center'
    });

    return (
        <div className="fade-in" style={{
            background: 'linear-gradient(135deg, #f0e6ff 0%, #e6f0ff 50%, #f0fff0 100%)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            maxWidth: '360px',
            margin: '16px auto'
        }}>
            <h4 style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.15rem',
                color: '#5a5a7a',
                marginBottom: '16px',
                textAlign: 'center'
            }}>
                Are you safe right now? 💙
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                    onClick={onSafe}
                    style={btnStyle('#d4edda', '#c3e6cb')}
                    onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                >
                    Yes, I am safe ✅
                </button>
                <button
                    onClick={onUnsure}
                    style={btnStyle('#fff3cd', '#ffeeba')}
                    onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                >
                    I'm not sure 🤔
                </button>
                <button
                    onClick={onNeedHelp}
                    style={btnStyle('#e2d5f1', '#d4c4e3')}
                    onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                >
                    I need help 🤝
                </button>
            </div>

            <p style={{
                fontSize: '0.75rem',
                color: '#999',
                textAlign: 'center',
                marginTop: '12px',
                fontStyle: 'italic'
            }}>
                Aura is not a therapist. If you're in crisis, please reach out.
            </p>
        </div>
    );
};

export default SafetyCheckInCard;
