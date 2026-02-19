import React, { useState, useEffect } from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import Doodle from './Doodle';

const JournalInterface = ({ onAnalyze }) => {
    const [entry, setEntry] = useState('');
    const { isListening, transcript, voiceEmotion, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition();

    const prompts = [
        "Today I am grateful for...",
        "I feel stressed because...",
        "Something that made me smile today...",
        "What's one thing I want to let go of?",
        "How did I show kindness today?"
    ];

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const currentText = isListening ? (entry + ' ' + transcript).trim() : entry;

    const handleAnalyze = () => {
        if (isListening) stopListening();
        onAnalyze(currentText, voiceEmotion);
        setEntry('');
    };

    const handlePrompt = () => {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setEntry(randomPrompt);
    };

    useEffect(() => {
        if (!isListening && transcript) {
            setEntry(prev => (prev + ' ' + transcript).trim());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening]); // Only run when listening state changes to avoid loops with transcript updates if any

    // Simple keyword highlighting logic for the overlay
    const getHighlightedText = () => {
        const keywords = ['overwhelmed', 'tired', 'worried', 'anxious', 'happy', 'excited', 'stressed', 'sad', 'angry'];
        let text = currentText;
        if (!text) return '';

        // Escape HTML
        text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        keywords.forEach(word => {
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');
            text = text.replace(regex, '<mark class="keyword-highlight">$1</mark>');
        });

        return text + '\n\n'; // Add spacing for mirror alignment
    };

    return (
        <div className="card" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transform: 'rotate(-1deg)',
            border: '3px solid hsl(var(--primary) / 0.3)',
            boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
            background: 'hsl(var(--card-bg))'
        }}>
            <button
                onClick={handlePrompt}
                style={{
                    position: 'absolute',
                    top: '-45px',
                    right: '10px',
                    background: '#CDB4DB',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    zIndex: 20,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
            >
                💡 Need a prompt?
            </button>

            <div className="tape-strip" style={{ top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>

            <div style={{
                position: 'absolute',
                left: '10px',
                top: '20px',
                bottom: '20px',
                width: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                zIndex: 10
            }}>
                {[...Array(12)].map((_, i) => (
                    <div key={i} style={{
                        width: '30px',
                        height: '10px',
                        background: 'linear-gradient(to right, #555, #777, #555)',
                        borderRadius: '50px',
                        boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        transform: 'rotate(-5deg)'
                    }} />
                ))}
            </div>

            <header style={{
                marginBottom: '10px',
                borderBottom: '2px solid var(--secondary)',
                paddingBottom: '15px',
                paddingLeft: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div>
                    <h3 style={{ fontWeight: '400', fontFamily: 'var(--font-hand)', fontSize: '1.8rem', color: 'hsl(var(--text-dark))' }}>
                        Dear Diary...
                    </h3>
                    <span style={{ fontFamily: 'var(--font-body-hand)', color: 'hsl(var(--text-muted))' }}>
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                </div>

                {hasRecognitionSupport && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            onClick={handleMicClick}
                            title={isListening ? "Stop Recording" : "Start Voice Journaling"}
                            style={{
                                background: isListening ? '#dc3545' : 'transparent',
                                color: isListening ? 'white' : 'hsl(var(--text-muted))',
                                border: isListening ? 'none' : '2px dashed var(--divider)',
                                borderRadius: '50%',
                                width: '45px',
                                height: '45px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                animation: isListening ? 'pulse 1.5s infinite' : 'none',
                                fontSize: '1.2rem'
                            }}
                        >
                            {isListening ? '⏹️' : '🎙️'}
                        </button>
                        
                        {voiceEmotion && (
                            <div style={{
                                padding: '6px 12px',
                                background: 'rgba(205, 180, 219, 0.15)',
                                borderRadius: '15px',
                                fontSize: '0.75rem',
                                color: 'hsl(var(--primary))',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}>
                                <span>🎵</span>
                                <span>{voiceEmotion.emotion}</span>
                                <span style={{ opacity: 0.7 }}>({voiceEmotion.confidence}%)</span>
                            </div>
                        )}
                    </div>
                )}
            </header>

            <div style={{ flex: 1, position: 'relative', paddingLeft: '50px', overflow: 'hidden' }}>
                {/* Mirror div for highlighting */}
                <div
                    dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50px',
                        right: 0,
                        bottom: 0,
                        padding: '10px 0',
                        fontSize: '1.4rem',
                        fontFamily: 'var(--font-body-hand)',
                        lineHeight: '2.5rem',
                        color: 'transparent',
                        pointerEvents: 'none',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        zIndex: 1
                    }}
                />

                <textarea
                    value={currentText}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Write freely... (the page is listening if you click the mic!)"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: 'transparent',
                        resize: 'none',
                        fontSize: '1.4rem',
                        fontFamily: 'var(--font-body-hand)',
                        lineHeight: '2.5rem',
                        color: 'hsl(var(--text-dark))',
                        padding: '10px 0',
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 2.4rem, rgba(255, 255, 255, 0.1) 2.5rem)',
                        backgroundAttachment: 'local',
                        boxShadow: 'none',
                        outline: 'none',
                        position: 'relative',
                        zIndex: 2
                    }}
                    spellCheck="false"
                />
                <Doodle type="scribble" color="#FFB7B2" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '80px', opacity: 0.6 }} />
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '10px' }}>
                <button
                    onClick={handleAnalyze}
                    className="btn-primary btn-large"
                    style={{
                        fontFamily: 'var(--font-hand)',
                        borderRadius: '20px 225px 30px 200px / 200px 30px 200px 25px',
                        border: '2px solid transparent'
                    }}
                >
                    Analyze ✨
                </button>
            </div>
        </div>
    );
};

export default JournalInterface;
