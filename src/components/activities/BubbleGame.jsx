import React, { useState, useEffect, useRef } from 'react';

const BubbleGame = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const bubblesRef = useRef([]);
    const gameStateRef = useRef({ score: 0, gameActive: true });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Initialize bubbles
        const createBubble = () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 20 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            popped: false
        });

        bubblesRef.current = Array.from({ length: 8 }, () => createBubble());

        // Game loop
        const animation = setInterval(() => {
            if (!gameStateRef.current.gameActive) {
                setGameEnded(true);
                clearInterval(animation);
                return;
            }

            // Clear canvas
            ctx.fillStyle = 'hsl(var(--background))';
            ctx.fillRect(0, 0, width, height);

            // Update and draw bubbles
            bubblesRef.current.forEach((bubble, index) => {
                if (bubble.popped) return;

                // Update position
                bubble.x += bubble.vx;
                bubble.y += bubble.vy;

                // Bounce off walls
                if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > width) {
                    bubble.vx *= -1;
                    bubble.x = Math.max(bubble.radius, Math.min(width - bubble.radius, bubble.x));
                }
                if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > height) {
                    bubble.vy *= -1;
                    bubble.y = Math.max(bubble.radius, Math.min(height - bubble.radius, bubble.y));
                }

                // Draw bubble
                const gradient = ctx.createRadialGradient(
                    bubble.x - bubble.radius / 3,
                    bubble.y - bubble.radius / 3,
                    0,
                    bubble.x,
                    bubble.y,
                    bubble.radius
                );
                gradient.addColorStop(0, `hsla(var(--primary), 0.6)`);
                gradient.addColorStop(1, `hsla(var(--primary), 0.2)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fill();

                // Draw bubble shine
                ctx.strokeStyle = `hsla(var(--primary), 0.8)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // End game after 30 seconds
            if (Date.now() - gameStateRef.current.startTime > 30000) {
                gameStateRef.current.gameActive = false;
            }
        }, 30);

        // Handle bubble clicks
        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            bubblesRef.current.forEach((bubble) => {
                if (bubble.popped) return;

                const dist = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
                if (dist < bubble.radius) {
                    bubble.popped = true;
                    gameStateRef.current.score += 10;
                    setScore(gameStateRef.current.score);

                    // Create new bubble to replace it
                    const newBubble = createBubble();
                    bubblesRef.current[bubblesRef.current.indexOf(bubble)] = newBubble;
                }
            });
        };

        canvas.addEventListener('click', handleClick);
        gameStateRef.current.startTime = Date.now();

        return () => {
            clearInterval(animation);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    if (gameEnded) {
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
                    🫧
                </div>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-hand)'
                }}>
                    Game Over!
                </h2>
                <p style={{
                    fontSize: '1.3rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '20px'
                }}>
                    Final Score: <strong style={{ color: 'hsl(var(--primary))' }}>{score}</strong>
                </p>
                <p style={{
                    fontSize: '1rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '30px',
                    maxWidth: '300px'
                }}>
                    You popped {score / 10} bubbles with mindfulness. Lovely job! 🌿
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
            height: '100%',
            padding: '20px'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '15px'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    margin: 0,
                    fontFamily: 'var(--font-hand)'
                }}>
                    Bubble Breathing
                </h2>
                <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))'
                }}>
                    Score: {score}
                </div>
            </div>

            {/* Instructions */}
            <p style={{
                fontSize: '0.9rem',
                color: 'hsl(var(--text-muted))',
                marginBottom: '15px',
                textAlign: 'center'
            }}>
                Click bubbles mindfully for 30 seconds ⏱️
            </p>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                width={400}
                height={300}
                style={{
                    background: 'hsl(var(--background))',
                    borderRadius: '12px',
                    border: '2px solid var(--divider)',
                    cursor: 'crosshair',
                    flex: 1,
                    maxWidth: '100%'
                }}
            />
        </div>
    );
};

export default BubbleGame;
