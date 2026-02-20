import React from 'react';

const NightInterventionCard = ({ onStartBreathing, onDismiss }) => {
    try {
        return (
            <div className="card fade-in" style={{
                background: 'linear-gradient(135deg, rgba(100, 120, 180, 0.12), rgba(140, 160, 220, 0.08))',
                border: '1px solid rgba(100, 120, 180, 0.25)',
                borderRadius: '16px',
                padding: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.3rem' }}>🌙</span>
                    <h4 style={{
                        margin: 0,
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        color: 'hsl(var(--text-dark))'
                    }}>
                        Late Night Check-in
                    </h4>
                </div>

                <p style={{
                    margin: '0 0 16px',
                    fontSize: '0.9rem',
                    color: 'hsl(var(--text-dark))',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)'
                }}>
                    It's late and you seem a bit overwhelmed.<br />
                    A short breathing exercise or rest might help tonight.
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={onStartBreathing}
                        style={{
                            padding: '8px 16px',
                            background: 'hsl(var(--primary))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(100, 120, 180, 0.3)'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        🌬 Start Breathing
                    </button>

                    <button
                        onClick={onDismiss}
                        style={{
                            padding: '8px 16px',
                            background: 'white',
                            color: 'hsl(var(--text-muted))',
                            border: '1px solid var(--divider)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    } catch {
        return null;
    }
};

export default NightInterventionCard;
