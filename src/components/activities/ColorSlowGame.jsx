import React, { useState, useEffect } from 'react';

const ColorSlowGame = ({ onClose }) => {
    const colors = [
        { hex: '#A8D8D8', name: 'Seafoam', mood: 'calm' },
        { hex: '#FFD4CC', name: 'Coral Blush', mood: 'warm' },
        { hex: '#B4C7E7', name: 'Soft Blue', mood: 'peaceful' },
        { hex: '#E8D4F1', name: 'Lavender', mood: 'dreamy' },
        { hex: '#D4E8D8', name: 'Mint', mood: 'fresh' },
        { hex: '#FFF4CC', name: 'Cream', mood: 'gentle' },
        { hex: '#E8D4D4', name: 'Rose Taupe', mood: 'soft' },
        { hex: '#D4E8E8', name: 'Powder', mood: 'soothing' }
    ];

    const [gameStarted, setGameStarted] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [targetColor, setTargetColor] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [matches, setMatches] = useState(0);
    const [totalRounds, setTotalRounds] = useState(6);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (gameStarted && currentRound === 0) {
            startNewRound();
        }
    }, [gameStarted]);

    const startNewRound = () => {
        if (currentRound >= totalRounds) {
            setGameOver(true);
            setGameStarted(false);
            return;
        }

        const randomTarget = colors[Math.floor(Math.random() * colors.length)];
        setTargetColor(randomTarget);
        setSelectedColor(null);
        setFeedback('');
    };

    const handleColorSelect = (color) => {
        if (!color || selectedColor) return;

        setSelectedColor(color);

        if (color.hex === targetColor.hex) {
            setMatches(prev => prev + 1);
            setFeedback('✓ Perfect match!');
            
            setTimeout(() => {
                setCurrentRound(prev => prev + 1);
                if (currentRound + 1 < totalRounds) {
                    startNewRound();
                } else {
                    setGameOver(true);
                    setGameStarted(false);
                }
            }, 1000);
        } else {
            setFeedback('Close, but not quite. Try another.');
            setTimeout(() => {
                setSelectedColor(null);
                setFeedback('');
            }, 1200);
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setCurrentRound(0);
        setMatches(0);
        setGameOver(false);
    };

    if (gameOver) {
        const accuracy = Math.round((matches / totalRounds) * 100);
        
        let message = '';
        if (accuracy === 100) message = "Perfect! You have an amazing eye for color! 🎨";
        else if (accuracy >= 80) message = "Wonderful! You matched most colors perfectly! 🌟";
        else if (accuracy >= 60) message = "Great job! You're developing color sensitivity. 🎭";
        else message = "Nice try! Color matching is a relaxing practice. 🌈";

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
                    🎨
                </div>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-hand)'
                }}>
                    Game Complete!
                </h2>
                <p style={{
                    fontSize: '1.3rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '10px'
                }}>
                    Accuracy: <strong style={{ color: 'hsl(var(--primary))' }}>{accuracy}%</strong>
                </p>
                <p style={{
                    fontSize: '1rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '30px',
                    maxWidth: '300px'
                }}>
                    {message}
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

    if (!gameStarted) {
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
                    fontSize: '3rem',
                    marginBottom: '25px'
                }}>
                    🎨
                </div>
                <h2 style={{
                    fontSize: '1.6rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '15px',
                    fontFamily: 'var(--font-hand)'
                }}>
                    Color Slow-Down
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    maxWidth: '280px'
                }}>
                    A calming color will appear at the top. Match it from the palette below. Move at your own pace. 💆
                </p>
                <button
                    onClick={startGame}
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
                    Start Game
                </button>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px 20px',
            minHeight: '400px'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '30px'
            }}>
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    margin: 0,
                    fontFamily: 'var(--font-hand)'
                }}>
                    Color Slow-Down
                </h2>
                <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'hsl(var(--text-muted))'
                }}>
                    {currentRound} / {totalRounds}
                </div>
            </div>

            {/* Target Color Block */}
            {targetColor && (
                <div style={{
                    marginBottom: '30px',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '0.9rem',
                        color: 'hsl(var(--text-muted))',
                        marginBottom: '15px',
                        fontWeight: '500'
                    }}>
                        Match this color:
                    </p>
                    <div
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '12px',
                            background: targetColor.hex,
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                            margin: '0 auto'
                        }}
                    />
                    <p style={{
                        marginTop: '12px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: 'hsl(var(--text-dark))'
                    }}>
                        {targetColor.name}
                    </p>
                </div>
            )}

            {/* Feedback */}
            {feedback && (
                <p style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: feedback.includes('Perfect') ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
                    marginBottom: '20px',
                    minHeight: '24px'
                }}>
                    {feedback}
                </p>
            )}

            {/* Color Palette */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                width: '100%',
                marginTop: 'auto'
            }}>
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => handleColorSelect(color)}
                        disabled={selectedColor !== null && selectedColor.hex !== color.hex}
                        style={{
                            width: '100%',
                            height: '80px',
                            borderRadius: '12px',
                            background: color.hex,
                            border: selectedColor?.hex === color.hex ? '4px solid hsl(var(--primary))' : '2px solid rgba(0, 0, 0, 0.1)',
                            cursor: selectedColor ? 'default' : 'pointer',
                            transition: 'all 0.2s',
                            opacity: selectedColor && selectedColor.hex !== color.hex ? 0.5 : 1,
                            boxShadow: selectedColor?.hex === color.hex ? '0 0 15px rgba(0, 0, 0, 0.2)' : 'none',
                            transform: selectedColor?.hex === color.hex ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onMouseOver={e => {
                            if (!selectedColor) {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }
                        }}
                        onMouseOut={e => {
                            if (!selectedColor) {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorSlowGame;
