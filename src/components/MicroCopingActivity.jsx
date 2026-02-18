import React, { useState } from 'react';
import BubblePopGame from './BubblePopGame';
import GroundingGame from './GroundingGame';

const MicroCopingActivity = ({ isGameRequested, onComplete }) => {
    const [gameState, setGameState] = useState('preview'); // preview, playing, completed
    const [selectedGame, setSelectedGame] = useState(null);

    // Only show if explicitly requested by user via keywords
    if (!isGameRequested && gameState === 'preview') return null;

    const startGame = (gameType) => {
        setSelectedGame(gameType);
        setGameState('playing');
    };

    const handleFinish = () => {
        setGameState('completed');
        onComplete();
    };

    return (
        <div className="card fade-in" style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            marginTop: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
        }}>
            {gameState === 'preview' && (
                <>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🧩</div>
                    <h4 style={{ margin: '0 0 10px 0', color: 'hsl(var(--primary))' }}>
                        Calm Activity
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Choose a 1-minute activity to ground yourself.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                            onClick={() => startGame('bubble')}
                            className="btn-primary"
                            style={{
                                padding: '12px 20px',
                                borderRadius: '50px',
                                background: 'hsl(var(--primary))',
                                border: 'none',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Start Bubble Breathing Game
                        </button>
                        <button
                            onClick={() => startGame('grounding')}
                            className="btn-secondary"
                            style={{
                                padding: '12px 20px',
                                borderRadius: '50px',
                                background: 'rgba(205, 180, 219, 0.2)',
                                border: '1px solid hsl(var(--primary) / 0.2)',
                                color: 'hsl(var(--primary))',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Start 5-4-3-2-1 Grounding Game
                        </button>
                    </div>
                </>
            )}

            {gameState === 'playing' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setGameState('preview')}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)'
                            }}
                        >
                            Skip ✕
                        </button>
                    </div>
                    {selectedGame === 'bubble' ? (
                        <BubblePopGame onComplete={handleFinish} />
                    ) : (
                        <GroundingGame onComplete={handleFinish} />
                    )}
                </div>
            )}

            {gameState === 'completed' && (
                <div className="fade-in">
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✨</div>
                    <h4 style={{ color: 'hsl(var(--primary))', margin: '0 0 5px 0' }}>Well done.</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                        Your awareness is a powerful tool for calm.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MicroCopingActivity;
