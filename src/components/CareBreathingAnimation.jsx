import React, { useState, useEffect, useRef } from 'react';

const CareBreathingAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState('Inhale');
    const [cycle, setCycle] = useState(0);
    const [done, setDone] = useState(false);
    const totalCycles = 3;
    const timerRef = useRef(null);

    useEffect(() => {
        if (done) return;

        const runCycle = (currentCycle) => {
            if (currentCycle >= totalCycles) {
                setDone(true);
                return;
            }

            setPhase('Inhale');
            setCycle(currentCycle + 1);

            timerRef.current = setTimeout(() => {
                setPhase('Hold');
                timerRef.current = setTimeout(() => {
                    setPhase('Exhale');
                    timerRef.current = setTimeout(() => {
                        runCycle(currentCycle + 1);
                    }, 4000);
                }, 4000);
            }, 4000);
        };

        runCycle(0);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const circleScale = phase === 'Inhale' ? 1.4 : phase === 'Hold' ? 1.4 : 1;
    const circleOpacity = phase === 'Hold' ? 1 : 0.85;

    if (done) {
        return (
            <div className="fade-in" style={{
                textAlign: 'center',
                padding: '24px',
                background: 'linear-gradient(135deg, #e8f5e9, #f3e5f5)',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                margin: '16px auto',
                maxWidth: '360px'
            }}>
                <p style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1.1rem',
                    color: '#5a5a7a',
                    marginBottom: '12px'
                }}>
                    You did something kind for yourself just now. 💙
                </p>
                <button
                    onClick={onComplete}
                    style={{
                        padding: '10px 24px',
                        border: 'none',
                        borderRadius: '20px',
                        background: 'hsl(var(--primary))',
                        color: 'white',
                        fontFamily: 'var(--font-hand)',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    Continue journaling
                </button>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{
            textAlign: 'center',
            padding: '24px',
            background: 'linear-gradient(135deg, #e8f5e9, #f3e5f5)',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            margin: '16px auto',
            maxWidth: '360px'
        }}>
            <p style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1rem',
                color: '#5a5a7a',
                marginBottom: '16px'
            }}>
                Let's slow things down together for a moment.
            </p>

            <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #b39ddb, #81c784)',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 ${phase === 'Hold' ? '40px' : '20px'} rgba(179, 157, 219, 0.5)`,
                transform: `scale(${circleScale})`,
                opacity: circleOpacity,
                transition: 'all 4s ease-in-out'
            }}>
                <span style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'white',
                    fontFamily: 'var(--font-hand)'
                }}>
                    {phase}
                </span>
            </div>

            <p style={{
                fontSize: '0.85rem',
                color: '#888',
                fontFamily: 'var(--font-hand)'
            }}>
                Cycle {cycle} of {totalCycles}
            </p>
        </div>
    );
};

export default CareBreathingAnimation;
