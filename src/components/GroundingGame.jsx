import React, { useState } from 'react';

const GroundingGame = ({ onComplete }) => {
    const steps = [
        { count: 5, label: "things you see", emoji: "👀" },
        { count: 4, label: "things you feel", emoji: "✋" },
        { count: 3, label: "things you hear", emoji: "👂" },
        { count: 2, label: "things you smell", emoji: "👃" },
        { count: 1, label: "thing you're grateful for", emoji: "💝" }
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [taps, setTaps] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleTap = () => {
        if (isFinished) return;

        const nextTaps = taps + 1;
        if (nextTaps >= steps[currentStep].count) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
                setTaps(0);
            } else {
                setIsFinished(true);
                setTimeout(onComplete, 2000);
            }
        } else {
            setTaps(nextTaps);
        }
    };

    const step = steps[currentStep];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '220px',
            textAlign: 'center',
            padding: '10px'
        }}>
            {isFinished ? (
                <div className="fade-in">
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌟</div>
                    <h4 style={{ color: 'hsl(var(--primary))', margin: 0 }}>
                        You’re back in the present moment.
                    </h4>
                </div>
            ) : (
                <>
                    <div style={{
                        fontSize: '2.5rem',
                        marginBottom: '10px',
                        animation: 'bounceSoft 2s infinite'
                    }}>
                        {step.emoji}
                    </div>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>
                        Notice {step.count} {step.label}
                    </h4>

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                        {[...Array(step.count)].map((_, i) => (
                            <div key={i} style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: i < taps ? 'hsl(var(--primary))' : 'rgba(0,0,0,0.1)',
                                transition: 'background 0.3s'
                            }} />
                        ))}
                    </div>

                    <button
                        onClick={handleTap}
                        className="btn-secondary"
                        style={{
                            padding: '8px 24px',
                            borderRadius: '20px',
                            background: 'rgba(205, 180, 219, 0.2)',
                            border: '1px solid hsl(var(--primary) / 0.2)',
                            color: 'hsl(var(--primary))',
                            fontWeight: '600'
                        }}
                    >
                        I noticed one
                    </button>
                </>
            )}

            <style>{`
                @keyframes bounceSoft {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default GroundingGame;
