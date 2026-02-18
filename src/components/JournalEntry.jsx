import React, { useState } from 'react';

const JournalEntry = ({ onAnalyze }) => {
    const [entry, setEntry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!entry.trim()) return;
        onAnalyze(entry);
        setEntry('');
    };

    return (
        <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1rem' }}>Write your thoughts...</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="How was your day? What's on your mind?"
                    style={{
                        width: '100%',
                        minHeight: '150px',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'white',
                        marginBottom: '1rem',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                    }}
                />
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Analyze Mood
                </button>
            </form>
        </div>
    );
};

export default JournalEntry;
