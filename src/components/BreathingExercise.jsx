import React, { useState, useEffect } from 'react';

const BreathingExercise = ({ onClose }) => {
    const [phase, setPhase] = useState('Inhale');

    useEffect(() => {
        const cycle = () => {
            setPhase('Inhale');
            setTimeout(() => {
                setPhase('Hold');
                setTimeout(() => {
                    setPhase('Exhale');
                }, 2000); // Hold for 2s
            }, 4000); // Inhale for 4s
        };

        cycle();
        const interval = setInterval(cycle, 10000); // 4+2+4 = 10s cycle (simplified)
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', padding: '40px' }}>
            <h3>Resonance Breathing</h3>
            <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Follow the circle to calm your mind.</p>

            <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))',
                margin: '0 auto 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px hsl(var(--accent) / 0.5)',
                animation: 'breathe 10s infinite ease-in-out'
            }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{phase}</span>
            </div>

            <button onClick={onClose} className="btn-primary">
                I feel better
            </button>

            <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          40% { transform: scale(1.5); opacity: 1; }
          60% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
        </div>
    );
};

export default BreathingExercise;
