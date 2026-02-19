import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
    const [context, setContext] = useState('');

    const options = [
        "Undergraduate student",
        "Postgraduate student",
        "Working professional",
        "Prefer not to say"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (context) {
            onComplete(context);
        }
    };

    return (
        <div className="fade-in" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌱</div>
                <h2 style={{ marginBottom: '1rem', color: 'hsl(var(--primary-dark))' }}>
                    Help us personalize your support
                </h2>
                <p style={{ color: 'hsl(var(--text-muted))', marginBottom: '2rem' }}>
                    Knowing your status helps Aura provide more relevant insights and coping strategies.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                            I am a...
                        </label>
                        <select
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid var(--divider)',
                                background: 'white',
                                fontSize: '1rem',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                            required
                        >
                            <option value="" disabled>Select your context</option>
                            {options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                        disabled={!context}
                    >
                        Continue to Journal →
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;
