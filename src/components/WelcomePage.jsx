import React from 'react';
import Doodle from './Doodle';

const WelcomePage = ({ onStart }) => {
    return (
        <div className="app-container fade-in" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Doodles */}
            <Doodle type="sun" color="#CDB4DB" style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', opacity: 0.4 }} />
            <Doodle type="scribble" color="#FFC8DD" style={{ position: 'absolute', top: '20%', right: '10%', width: '120px', opacity: 0.4, transform: 'rotate(45deg)' }} />
            <Doodle type="star" color="#BDE0FE" style={{ position: 'absolute', bottom: '15%', left: '15%', width: '60px', opacity: 0.6 }} />
            <Doodle type="heart" color="#FFAFCC" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '80px', opacity: 0.5 }} />

            <div className="card" style={{
                maxWidth: '600px',
                width: '100%',
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center'
            }}>


                <h1 style={{
                    fontSize: '4rem',
                    color: 'hsl(var(--primary))',
                    marginBottom: '10px',
                    textShadow: '0 0 12px rgba(108, 99, 255, 0.5), 0 0 24px rgba(108, 99, 255, 0.3)'
                }}>
                    Aura
                </h1>

                <p style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.2em',
                    color: 'hsl(var(--primary))',
                    marginTop: '-5px',
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    opacity: 0.8
                }}>
                    Reflect. Understand. Heal.
                </p>

                <p style={{
                    fontSize: '1.2rem',
                    color: 'hsl(var(--text-muted))',
                    maxWidth: '80%',
                    lineHeight: '1.6'
                }}>
                    Welcome to your private, safe space to reflect, track your mood, and find clarity.
                </p>

                <div style={{ height: '20px' }}></div>

                <button
                    onClick={onStart}
                    className="btn-primary btn-welcome"
                    style={{
                        fontSize: '1.2rem',
                        padding: '15px 50px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'white' // Force white text
                    }}
                >
                    Start Journaling →
                </button>

                <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#999' }}>
                    Local Storage Only • Privacy First • No Login Required
                </p>
            </div>
        </div>
    );
};

export default WelcomePage;
