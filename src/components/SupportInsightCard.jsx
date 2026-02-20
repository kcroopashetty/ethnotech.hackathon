import React, { useState } from 'react';

// Multiple video IDs per category — one is picked randomly on each Play click
const focusMusic = {
    instrumental: ['DWcJFNfaw9c', '5qap5aO4i9A'],
    lofi: ['5qap5aO4i9A', 'lTRiuFIWV54', 'Na0w3Mz46GA'],
    nature: ['eKFTSSKCzWA', 'V1bFr2SWP1I', 'q76bMs-NwRk'],
    piano: ['1ZYbU82GVz4', '4Tr0otuiQuU'],
};

const categoryLabels = {
    instrumental: 'Soft Instrumental',
    lofi: 'Lo-fi Focus',
    nature: 'Nature Sounds',
    piano: 'Piano Calm',
};

const SupportInsightCard = ({ onStartExercise, onTalkToAura }) => {
    const [showMusic, setShowMusic] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState(null);

    const handlePlay = (category) => {
        const ids = focusMusic[category];
        const randomId = ids[Math.floor(Math.random() * ids.length)];
        setCurrentVideoId(randomId);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '1rem' }}>
            <div className="card fade-in" style={{
                background: 'linear-gradient(135deg, rgba(255, 154, 162, 0.15), rgba(255, 218, 193, 0.15))',
                border: '1px solid hsl(var(--primary) / 0.3)',
                boxShadow: 'var(--shadow-soft)',
                padding: '20px',
                borderRadius: '16px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '1.5rem' }}>💙</span>
                    <h3 style={{
                        margin: 0,
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        color: 'hsl(var(--text-dark))'
                    }}>
                        You've been under sustained stress
                    </h3>
                </div>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'hsl(var(--text-muted))',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '20px'
                }}>
                    You've had several difficult days recently.<br />
                    A small reset activity or talking to a counselor could help.
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                    <button
                        onClick={onStartExercise}
                        style={{
                            padding: '8px 16px',
                            background: 'hsl(var(--primary))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(181, 234, 215, 0.4)'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Start Exercise
                    </button>

                    <button
                        onClick={onTalkToAura}
                        style={{
                            padding: '8px 16px',
                            background: 'hsl(var(--secondary))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(205, 180, 219, 0.4)'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Talk to Aura
                    </button>

                    <button
                        onClick={() => setShowMusic(!showMusic)}
                        style={{
                            padding: '8px 16px',
                            background: showMusic ? 'hsl(var(--bg-warm))' : 'white',
                            color: 'hsl(var(--text-dark))',
                            border: '1px solid var(--divider)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        🎵 Focus Music
                    </button>
                </div>

                <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: 'hsl(var(--text-muted))',
                    fontStyle: 'italic'
                }}>
                    Consider speaking with a counselor or someone you trust.
                </p>
            </div>

            {/* Focus Music Playlist Card */}
            {showMusic && (
                <div className="card fade-in" style={{
                    background: 'hsl(var(--card-bg))',
                    border: '1px solid var(--divider)',
                    borderRadius: '16px',
                    padding: '20px'
                }}>
                    <h4 style={{
                        marginTop: 0,
                        marginBottom: '15px',
                        fontFamily: 'var(--font-heading)',
                        color: 'hsl(var(--text-dark))',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        🎧 Focus Reset Playlist
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {Object.keys(focusMusic).map((category) => (
                            <div key={category} style={{
                                padding: '10px',
                                background: 'rgba(205, 180, 219, 0.1)',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-dark))', fontWeight: '500' }}>
                                    {categoryLabels[category]}
                                </span>
                                <button
                                    onClick={() => handlePlay(category)}
                                    style={{
                                        fontSize: '0.8rem',
                                        color: 'hsl(var(--primary))',
                                        padding: '4px 10px',
                                        background: 'white',
                                        borderRadius: '12px',
                                        border: '1px solid var(--divider)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = 'hsl(var(--bg-warm))'}
                                    onMouseOut={e => e.currentTarget.style.background = 'white'}
                                >
                                    ▶ Play
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Embedded player — shown when a track is selected */}
                    {currentVideoId && (
                        <div style={{ marginTop: '15px', borderRadius: '12px', overflow: 'hidden' }}>
                            <iframe
                                key={currentVideoId}
                                src={`https://www.youtube.com/embed/${currentVideoId}?rel=0`}
                                title="Focus Music"
                                width="100%"
                                height="200"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ display: 'block' }}
                            />
                        </div >
                    )}
                </div >
            )}
        </div >
    );
};

export default SupportInsightCard;
