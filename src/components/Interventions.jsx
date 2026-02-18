import React from 'react';

const Interventions = ({ onStartBreathing }) => {
    return (
        <div className="glass-card animate-fade-in" style={{ marginTop: '2rem', border: '1px solid hsl(var(--accent))' }}>
            <h2 style={{ color: 'hsl(var(--accent))', marginBottom: '1rem' }}>We noticed you're feeling stressed.</h2>
            <p style={{ marginBottom: '1.5rem' }}>It's okay to feel this way. Here are some tools to help you reset:</p>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <button
                    onClick={onStartBreathing}
                    className="glass-card"
                    style={{ padding: '20px', textAlign: 'left', cursor: 'pointer', transition: '0.2s' }}
                >
                    <h4>🌬️ Breathe</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>2-minute resonance breathing</p>
                </button>

                <div className="glass-card" style={{ padding: '20px' }}>
                    <h4>🤝 Talk to Someone</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Campus Counselor: <br /><strong>(555) 123-4567</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Interventions;
