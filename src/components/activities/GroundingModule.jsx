import React, { useState } from 'react';

const GroundingModule = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [userResponses, setUserResponses] = useState({
        see: [],
        feel: [],
        hear: [],
        smell: [],
        breathe: []
    });

    const steps = [
        {
            id: 'see',
            number: 5,
            emoji: '👀',
            title: '5 Things You See',
            description: 'Look around and name 5 things you can see',
            instruction: 'Look around and list 5 things you notice...'
        },
        {
            id: 'feel',
            number: 4,
            emoji: '🤚',
            title: '4 Things You Feel',
            description: 'Notice textures and sensations on your body',
            instruction: 'What textures or sensations do you feel?'
        },
        {
            id: 'hear',
            number: 3,
            emoji: '👂',
            title: '3 Things You Hear',
            description: 'Listen and name 3 sounds you can hear',
            instruction: 'Name 3 sounds you can hear...'
        },
        {
            id: 'smell',
            number: 2,
            emoji: '👃',
            title: '2 Things You Smell',
            description: 'Notice scents around you',
            instruction: 'What smells do you notice?'
        },
        {
            id: 'breathe',
            number: 1,
            emoji: '🌬️',
            title: '1 Thing You Breathe',
            description: 'Focus on your breath',
            instruction: 'Take a deep breath and focus on the present moment'
        }
    ];

    const currentStepData = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            setCompleted(true);
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    if (completed) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                padding: '40px 20px',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '3.5rem',
                    marginBottom: '25px'
                }}>
                    ✨
                </div>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '15px',
                    fontFamily: 'var(--font-hand)'
                }}>
                    Grounding Complete!
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '30px',
                    maxWidth: '300px'
                }}>
                    You've reconnected with the present moment. You're doing great. 🌿
                </p>
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
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 20px',
            minHeight: '400px'
        }}>
            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '6px',
                background: 'var(--divider)',
                borderRadius: '10px',
                marginBottom: '30px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    background: 'hsl(var(--primary))',
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                    transition: 'width 0.3s ease'
                }} />
            </div>

            {/* Step Number Circle */}
            <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
            }}>
                {currentStepData.emoji}
            </div>

            {/* Step Title */}
            <h2 style={{
                fontSize: '1.6rem',
                fontWeight: '600',
                color: 'hsl(var(--primary))',
                marginBottom: '10px',
                fontFamily: 'var(--font-hand)',
                textAlign: 'center'
            }}>
                {currentStepData.title}
            </h2>

            {/* Step Count Badge */}
            <div style={{
                display: 'inline-block',
                background: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '0.95rem',
                fontWeight: '600',
                marginBottom: '25px'
            }}>
                {currentStepData.number} things
            </div>

            {/* Instruction */}
            <p style={{
                fontSize: '1.1rem',
                color: 'hsl(var(--text-dark))',
                textAlign: 'center',
                marginBottom: '35px',
                maxWidth: '280px',
                lineHeight: '1.5'
            }}>
                {currentStepData.instruction}
            </p>

            {/* Breathing Circle Animation */}
            <div
                style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(205, 180, 219, 0.4), rgba(205, 180, 219, 0.1))`,
                    boxShadow: '0 0 30px rgba(205, 180, 219, 0.3)',
                    marginBottom: '40px',
                    animation: 'breathe 3s ease-in-out infinite'
                }}
            />

            {/* Next Button */}
            <button
                onClick={handleNext}
                style={{
                    background: 'hsl(var(--primary))',
                    color: 'white',
                    padding: '12px 40px',
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
                {isLastStep ? 'Complete' : 'Next'}
            </button>

            <style>{`
                @keyframes breathe {
                    0%, 100% { 
                        transform: scale(1);
                        box-shadow: 0 0 30px rgba(205, 180, 219, 0.3);
                    }
                    50% { 
                        transform: scale(1.1);
                        box-shadow: 0 0 40px rgba(205, 180, 219, 0.5);
                    }
                }
            `}</style>
        </div>
    );
};

export default GroundingModule;
