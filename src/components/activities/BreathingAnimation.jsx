import React, { useState, useEffect } from 'react';

const BreathingAnimation = ({ onClose }) => {
    const [cycle, setCycle] = useState(0);
    const [phase, setPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
    const [completed, setCompleted] = useState(false);
    const [scale, setScale] = useState(0.5);

    useEffect(() => {
        if (completed) return;
        if (cycle >= 5) {
            setCompleted(true);
            return;
        }

        const timings = {
            inhale: 4000,
            hold: 4000,
            exhale: 4000
        };

        const timer = setTimeout(() => {
            if (phase === 'inhale') {
                setPhase('hold');
                setScale(1);
            } else if (phase === 'hold') {
                setPhase('exhale');
            } else if (phase === 'exhale') {
                setPhase('inhale');
                setCycle(prev => prev + 1);
                setScale(0.5);
            }
        }, timings[phase]);

        return () => clearTimeout(timer);
    }, [phase, cycle, completed]);

    // Animate scale during inhale/exhale
    useEffect(() => {
        if (phase === 'inhale') {
            const start = Date.now();
            const animate = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / 4000, 1);
                setScale(0.5 + progress * 0.5);
                if (progress < 1) requestAnimationFrame(animate);
            };
            animate();
        } else if (phase === 'exhale') {
            const start = Date.now();
            const animate = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / 4000, 1);
                setScale(1 - progress * 0.5);
                if (progress < 1) requestAnimationFrame(animate);
            };
            animate();
        }
    }, [phase]);

    const phaseText = {
        inhale: 'Inhale 4s',
        hold: 'Hold 4s',
        exhale: 'Exhale 4s'
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '40px 20px'
        }}>
            {!completed ? (
                <>
                    {/* Animated Circle */}
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgba(205, 180, 219, ${scale * 0.8}), rgba(205, 180, 219, ${scale * 0.3}))`,
                        boxShadow: `0 0 ${40 * scale}px rgba(205, 180, 219, ${scale * 0.6})`,
                        marginBottom: '40px',
                        animation: phase === 'hold' ? 'none' : 'pulse 0.3s ease-in-out'
                    }} />

                    {/* Phase Text */}
                    <div style={{
                        fontSize: '1.8rem',
                        fontWeight: '600',
                        color: 'hsl(var(--primary))',
                        marginBottom: '20px',
                        fontFamily: 'var(--font-hand)'
                    }}>
                        {phaseText[phase]}
                    </div>

                    {/* Cycle Counter */}
                    <div style={{
                        fontSize: '1.1rem',
                        color: 'hsl(var(--text-muted))',
                        marginBottom: '30px'
                    }}>
                        Cycle {cycle + 1} of 5
                    </div>
                </>
            ) : (
                <>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px'
                    }}>
                        🌿
                    </div>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'hsl(var(--primary))',
                        textAlign: 'center',
                        marginBottom: '40px',
                        fontFamily: 'var(--font-hand)'
                    }}>
                        You did something kind for yourself 🌿
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'hsl(var(--primary))',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    >
                        Close
                    </button>
                </>
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </div>
    );
};

export default BreathingAnimation;
