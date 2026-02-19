import React, { useState, useEffect } from 'react';

const BubblePopGame = ({ onComplete }) => {
    const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
    const [cycle, setCycle] = useState(1);
    const [showPop, setShowPop] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isFinished) return;

        let timer;
        if (phase === 'inhale') {
            timer = setTimeout(() => setPhase('hold'), 4000);
        } else if (phase === 'hold') {
            timer = setTimeout(() => setPhase('exhale'), 4000);
        } else if (phase === 'exhale') {
            setShowPop(true);
            timer = setTimeout(() => {
                setShowPop(false);
                if (cycle < 3) {
                    setCycle(c => c + 1);
                    setPhase('inhale');
                } else {
                    setIsFinished(true);
                    setTimeout(onComplete, 2000);
                }
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [phase, cycle, isFinished, onComplete]);

    const getInstruction = () => {
        if (isFinished) return "Nice. Your body is calming down.";
        if (phase === 'inhale') return "Inhale slowly...";
        if (phase === 'hold') return "Hold and feel the glow...";
        return "Exhale and let go...";
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '220px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Bubbles Container */}
            <div style={{
                width: '120px',
                height: '120px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
            }}>
                <div style={{
                    width: phase === 'inhale' ? '120px' : (phase === 'hold' ? '120px' : '40px'),
                    height: phase === 'inhale' ? '120px' : (phase === 'hold' ? '120px' : '40px'),
                    background: phase === 'hold' ? 'radial-gradient(circle, #B2E2F2 0%, #80CED7 100%)' : 'rgba(128, 206, 215, 0.3)',
                    border: '2px solid #80CED7',
                    borderRadius: '50%',
                    transition: 'all 4s linear',
                    boxShadow: phase === 'hold' ? '0 0 20px #80CED7' : 'none',
                    opacity: showPop ? 0 : 1,
                    transform: showPop ? 'scale(1.5)' : 'scale(1)',
                }} />

                {showPop && (
                    <div style={{
                        position: 'absolute',
                        fontSize: '2rem',
                        animation: 'popOut 0.5s ease-out forwards'
                    }}>
                        ✨
                    </div>
                )}
            </div>

            <h4 style={{ margin: '0 0 5px 0', color: 'hsl(var(--primary))' }}>{getInstruction()}</h4>
            {!isFinished && (
                <small style={{ color: 'var(--text-muted)' }}>Cycle {cycle} of 3</small>
            )}

            <style>{`
                @keyframes popOut {
                    0% { transform: scale(0.5); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default BubblePopGame;
