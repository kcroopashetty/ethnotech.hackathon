import React, { useState, useEffect } from 'react';

const FocusTapGame = ({ onClose }) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [circleVisible, setCircleVisible] = useState(false);
    const [circlePosition, setCirclePosition] = useState({ x: 50, y: 50 });
    const [taps, setTaps] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [reactionTime, setReactionTime] = useState(null);
    const [newCircleTime, setNewCircleTime] = useState(null);

    // Start game
    const startGame = () => {
        setGameStarted(true);
        setTaps(0);
        setTimeLeft(30);
        setGameOver(false);
        showNewCircle();
    };

    // Show circle at random position
    const showNewCircle = () => {
        setCircleVisible(false);
        
        setTimeout(() => {
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 70 + 15;
            setCirclePosition({ x, y });
            setCircleVisible(true);
            setNewCircleTime(Date.now());
        }, Math.random() * 1500 + 500);
    };

    // Handle circle tap
    const handleCircleTap = (e) => {
        if (!circleVisible || !gameStarted) return;
        
        e.stopPropagation();
        
        const time = Date.now() - newCircleTime;
        setReactionTime(time);
        
        setTaps(prev => prev + 1);
        setCircleVisible(false);
        
        // Show new circle after short delay
        setTimeout(showNewCircle, 200);
    };

    // Countdown timer
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true);
                    setGameStarted(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, gameOver]);

    const getPerformanceMessage = () => {
        if (taps < 10) return "Keep practicing! You'll improve your focus. 📚";
        if (taps < 20) return "Nice work! Your focus is improving. 🌱";
        if (taps < 30) return "Excellent! Great concentration! ⭐";
        return "Amazing! You have incredible focus! 🚀";
    };

    const getAverageReactionTime = () => {
        return Math.round(reactionTime || 0);
    };

    if (gameOver) {
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
                    🎯
                </div>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-hand)'
                }}>
                    Time's Up!
                </h2>
                <p style={{
                    fontSize: '1.3rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '20px'
                }}>
                    Total Taps: <strong style={{ color: 'hsl(var(--primary))' }}>{taps}</strong>
                </p>
                <p style={{
                    fontSize: '1rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '30px',
                    maxWidth: '300px'
                }}>
                    {getPerformanceMessage()}
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
                    🎯
                </div>
                <h2 style={{
                    fontSize: '1.6rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '15px',
                    fontFamily: 'var(--font-hand)'
                }}>
                    Focus Tap Game
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    maxWidth: '280px'
                }}>
                    A circle will appear on the screen. Tap it as quickly as you can. You have 30 seconds. Ready?
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
        <div
            onClick={() => circleVisible && handleCircleTap({ stopPropagation: () => {} })}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '500px',
                padding: '20px',
                position: 'relative',
                cursor: 'crosshair',
                background: 'hsl(var(--background))'
            }}
        >
            {/* Header with stats */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '2px solid var(--divider)'
            }}>
                <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))'
                }}>
                    Taps: {taps}
                </div>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: timeLeft <= 5 ? '#ff6b6b' : 'hsl(var(--primary))',
                    fontFamily: 'monospace'
                }}>
                    {timeLeft}s
                </div>
            </div>

            {/* Game area */}
            <div style={{
                flex: 1,
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {circleVisible && (
                    <button
                        onClick={handleCircleTap}
                        style={{
                            position: 'absolute',
                            left: `${circlePosition.x}%`,
                            top: `${circlePosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, hsl(var(--primary)), hsl(var(--primary) / 0.7))',
                            border: '3px solid hsl(var(--primary))',
                            color: 'white',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            transition: 'all 0.1s',
                            boxShadow: '0 0 20px rgba(205, 180, 219, 0.6)',
                            animation: 'pulse 0.5s ease-in-out infinite'
                        }}
                        onMouseOver={e => e.target.style.transform = 'translate(-50%, -50%) scale(1.1)'}
                        onMouseOut={e => e.target.style.transform = 'translate(-50%, -50%)'}
                    >
                        ●
                    </button>
                )}

                {!circleVisible && (
                    <div style={{
                        fontSize: '1.2rem',
                        color: 'hsl(var(--text-muted))',
                        fontStyle: 'italic'
                    }}>
                        Waiting for circle...
                    </div>
                )}
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(205, 180, 219, 0.6); }
                    50% { box-shadow: 0 0 30px rgba(205, 180, 219, 0.9); }
                }
            `}</style>
        </div>
    );
};

export default FocusTapGame;
