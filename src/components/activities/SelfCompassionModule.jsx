import React, { useState } from 'react';

const SelfCompassionModule = ({ onClose }) => {
    const [note, setNote] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [displayNote, setDisplayNote] = useState('');

    const affirmations = [
        "Your kindness to yourself matters. 💙",
        "You are doing your best, and that's enough. ✨",
        "This moment of self-compassion is powerful. 🌿",
        "You deserve the same kindness you give others. 💫",
        "Be gentle with yourself. You're learning and growing. 🌱"
    ];

    const handleSubmit = () => {
        if (note.trim()) {
            setDisplayNote(note);
            setSubmitted(true);
            setNote('');
        }
    };

    if (submitted) {
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
                    💙
                </div>

                {/* Display the note */}
                <div style={{
                    background: 'hsl(var(--primary) / 0.08)',
                    border: '2px solid hsl(var(--primary) / 0.3)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '30px',
                    maxWidth: '300px',
                    fontStyle: 'italic',
                    color: 'hsl(var(--text-dark))',
                    lineHeight: '1.6'
                }}>
                    "{displayNote}"
                </div>

                {/* Random Affirmation */}
                <div style={{
                    background: 'hsl(var(--secondary) / 0.1)',
                    border: '2px solid hsl(var(--secondary) / 0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '30px',
                    maxWidth: '320px'
                }}>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'hsl(var(--text-dark))',
                        margin: 0,
                        fontFamily: 'var(--font-hand)',
                        fontWeight: '600'
                    }}>
                        {affirmations[Math.floor(Math.random() * affirmations.length)]}
                    </p>
                </div>

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
            padding: '40px 20px',
            minHeight: '400px'
        }}>
            {/* Icon */}
            <div style={{
                fontSize: '2.5rem',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                💙
            </div>

            {/* Prompt */}
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'hsl(var(--primary))',
                marginBottom: '20px',
                textAlign: 'center',
                fontFamily: 'var(--font-hand)'
            }}>
                Write a Kind Note to Yourself
            </h2>

            <p style={{
                fontSize: '0.95rem',
                color: 'hsl(var(--text-muted))',
                marginBottom: '20px',
                textAlign: 'center',
                lineHeight: '1.5'
            }}>
                Imagine speaking to a dear friend who's struggling. What would you say to comfort them? Now say those words to yourself.
            </p>

            {/* Text Area */}
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write something kind to yourself..."
                style={{
                    flex: 1,
                    padding: '15px',
                    borderRadius: '12px',
                    border: '2px solid var(--divider)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    color: 'hsl(var(--text-dark))',
                    resize: 'none',
                    minHeight: '150px',
                    marginBottom: '20px',
                    transition: 'border 0.2s',
                    outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = 'hsl(var(--primary))'}
                onBlur={(e) => e.target.style.borderColor = 'var(--divider)'}
            />

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={!note.trim()}
                style={{
                    background: note.trim() ? 'hsl(var(--primary))' : 'var(--divider)',
                    color: note.trim() ? 'white' : 'hsl(var(--text-muted))',
                    padding: '12px 32px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: note.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    alignSelf: 'center'
                }}
                onMouseOver={e => {
                    if (note.trim()) e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={e => {
                    if (note.trim()) e.target.style.transform = 'scale(1)';
                }}
            >
                Send Yourself Kindness
            </button>
        </div>
    );
};

export default SelfCompassionModule;
