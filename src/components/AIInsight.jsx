import React, { useState } from 'react';
import PersonalizedExercises from './PersonalizedExercises';
import MicroCopingActivity from './MicroCopingActivity';

const AIInsight = ({ sentiment, isAnalyzing, fusionLabel, facialMood, onTriggerIntervention, onSaveGratitude, onSaveSelfCompassionNote, onExerciseComplete }) => {
    const [isStressRelieved, setIsStressRelieved] = useState(false);
    if (isAnalyzing) {
        return (
            <div className="card pulse-soft" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'rgba(205, 180, 219, 0.1)',
                border: '2px solid hsl(var(--primary) / 0.2)'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✨</div>
                <h3 style={{ color: 'hsl(var(--primary))', fontWeight: '500' }}>Analyzing your mood...</h3>
            </div>
        );
    }

    if (!sentiment) {
        return (
            <div className="card" style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'rgba(205, 180, 219, 0.05)',
                border: '2px dashed var(--divider)',
                boxShadow: 'none'
            }}>
                <div style={{ opacity: 0.6 }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔮</div>
                    <p style={{ fontSize: '1rem' }}>Your gentle insights will appear here<br />after you analyze your entry.</p>
                </div>
            </div>
        );
    }

    // Determine Badge and Header Color
    const getMoodConfig = (mood) => {
        switch (mood) {
            case 'happy': return { bg: '#E0F2E9', color: '#1B5E20', header: '#C8E6C9', emoji: '😄' };
            case 'neutral': return { bg: '#F5F5F5', color: '#424242', header: '#E0E0E0', emoji: '😐' };
            case 'stress': return { bg: '#FFEBEE', color: '#C62828', header: '#FFCDD2', emoji: '😵' };
            case 'sad': return { bg: '#E3F2FD', color: '#1565C0', header: '#BBDEFB', emoji: '😔' };
            case 'anxious': return { bg: '#FFF3E0', color: '#E65100', header: '#FFE0B2', emoji: '😰' };
            default: return { bg: '#F5F5F5', color: '#424242', header: '#E0E0E0', emoji: '✨' };
        }
    };

    const config = getMoodConfig(sentiment.dominant);
    const cv = sentiment.crossVerification;
    const mixedInsight = sentiment.mixedMoodInsight;

    // If mixed emotion detected, show special panel
    if (mixedInsight && mixedInsight.type === 'mixed') {
        return (
            <div className="card fade-in" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden'
            }}>
                {/* Purple header for mixed emotions */}
                <div style={{ height: '6px', background: 'hsl(var(--primary) / 0.5)', width: '100%' }}></div>

                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <header style={{
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <h3 style={{ fontWeight: '500', margin: 0 }}>Mixed Signals</h3>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                padding: '2px 10px',
                                borderRadius: '4px',
                                width: 'fit-content',
                                color: 'hsl(var(--primary))',
                                background: 'rgba(205, 180, 219, 0.15)'
                            }}>
                                🎭 Emotion Check-in
                            </span>
                        </div>
                        <span style={{
                            fontSize: '2rem',
                            opacity: 0.7
                        }}>
                            🎭
                        </span>
                    </header>

                    {/* Mixed emotion card */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(205, 180, 219, 0.15), rgba(200, 180, 220, 0.08))',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '20px',
                        border: '1px solid hsl(var(--primary) / 0.15)',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <p style={{
                            fontSize: '1rem',
                            color: 'hsl(var(--text-dark))',
                            lineHeight: '1.6',
                            margin: 0,
                            fontStyle: 'italic',
                            textAlign: 'center'
                        }}>
                            {mixedInsight.message}
                        </p>
                    </div>

                    {/* Gentle reflection prompt */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px dashed hsl(var(--primary) / 0.2)',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'hsl(var(--text-muted))',
                            margin: 0,
                            lineHeight: '1.5'
                        }}>
                            💭 <strong>Gentle Reflection:</strong><br />
                            Take a moment to sit with your feelings. You don't need to fix or explain anything right now.
                        </p>
                    </div>

                    <footer style={{
                        marginTop: '25px',
                        paddingTop: '15px',
                        borderTop: '1px solid var(--divider)',
                        textAlign: 'center'
                    }}>
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            🧠 Multimodal emotion analysis
                        </small>
                    </footer>
                </div>
            </div>
        );
    }

    // ===== NORMAL MOOD INSIGHT (non-mixed) =====
    const copingStrategies = {
        happy: {
            title: "🌟 Gratitude Moment",
            content: "Write down one thing you’re grateful for and why it mattered today.",
            bg: "#E0F2E9",
            icon: "🌟"
        },
        neutral: {
            title: "🔍 Reflection Prompt",
            content: "What is one small thing that went well today?",
            bg: "#F5F5F5",
            icon: "🔍"
        },
        anxious: {
            title: "🌬 Try a Breathing Exercise",
            content: "Breathe in for 4 seconds, hold for 4, breathe out for 4. Repeat this cycle 4 times.",
            bg: "#FFF3E0",
            icon: "🌬"
        },
        stress: {
            title: "📝 5-Minute Reset",
            content: "Pick one small task and work on it for just 5 minutes. Starting small reduces overwhelm and builds momentum.",
            bg: "#FFEBEE",
            icon: "📝"
        },
        sad: {
            title: "💙 A Gentle Reminder",
            content: "It’s okay to have difficult days. Speak to yourself the way you would comfort a close friend.",
            bg: "#E3F2FD",
            icon: "💙"
        }
    };

    const coping = copingStrategies[sentiment.dominant] || copingStrategies.neutral;

    return (
        <div className="card fade-in" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            overflow: 'hidden'
        }}>
            <div style={{ height: '6px', background: config.header, width: '100%' }}></div>

            <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <header style={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <h3 style={{ fontWeight: '500', margin: 0 }}>Insight</h3>
                        {cv && cv.label && (
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                padding: '2px 10px',
                                borderRadius: '4px',
                                width: 'fit-content',
                                color: cv.status === 'aligned' ? '#2E7D32' : '#E65100',
                                background: cv.status === 'aligned'
                                    ? 'rgba(46, 125, 50, 0.1)'
                                    : 'rgba(230, 81, 0, 0.1)'
                            }}>
                                {cv.label}
                            </span>
                        )}
                    </div>
                    <span className="mood-badge" style={{
                        background: config.bg,
                        color: config.color,
                        padding: '8px 16px',
                        borderRadius: '50px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        textTransform: 'capitalize'
                    }}>
                        {config.emoji} {sentiment.dominant}
                    </span>
                </header>

                {/* Mood Cross-Verification Breakdown */}
                {cv && (cv.status === 'aligned' || cv.status === 'mismatch') && (
                    <div style={{
                        background: cv.status === 'aligned'
                            ? 'linear-gradient(135deg, rgba(200, 230, 201, 0.3), rgba(232, 245, 233, 0.4))'
                            : 'linear-gradient(135deg, rgba(255, 224, 178, 0.3), rgba(255, 243, 224, 0.4))',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        marginBottom: '16px',
                        border: cv.status === 'aligned'
                            ? '1px solid rgba(46, 125, 50, 0.15)'
                            : '1px solid rgba(230, 81, 0, 0.15)'
                    }}>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: cv.combinedInsight ? '10px' : '0', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.75rem', color: '#777' }}>📝 Text Mood:</span>
                                <span style={{
                                    fontSize: '0.8rem', fontWeight: '600',
                                    textTransform: 'capitalize', color: '#444'
                                }}>
                                    {cv.textEmoji} {cv.textMood}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.75rem', color: '#777' }}>📷 Facial Mood:</span>
                                <span style={{
                                    fontSize: '0.8rem', fontWeight: '600',
                                    textTransform: 'capitalize', color: '#444'
                                }}>
                                    {cv.facialEmoji} {cv.facialMood}
                                </span>
                            </div>
                        </div>
                        {cv.combinedInsight && (
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#555',
                                lineHeight: '1.5',
                                margin: 0,
                                fontStyle: 'italic'
                            }}>
                                {cv.combinedInsight}
                            </p>
                        )}
                    </div>
                )}

                {/* Facial-only message (Case D) */}
                {cv && cv.status === 'facial_only' && cv.combinedInsight && (
                    <div style={{
                        background: 'rgba(205, 180, 219, 0.1)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        marginBottom: '16px',
                        border: '1px solid rgba(205, 180, 219, 0.2)',
                        textAlign: 'center'
                    }}>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: 0, fontStyle: 'italic' }}>
                            {cv.combinedInsight}
                        </p>
                    </div>
                )}

                <div style={{ flex: 1 }}>
                    <p className="insight-text" style={{ color: 'hsl(var(--text-dark))', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        {isStressRelieved ? "Nice. Do you feel a little lighter?" : sentiment.response}
                    </p>

                    {/* Personalized Exercise Card */}
                    <PersonalizedExercises
                        mood={sentiment.dominant}
                        onSaveGratitude={onSaveGratitude}
                        onSaveSelfCompassionNote={onSaveSelfCompassionNote}
                        onTriggerIntervention={onTriggerIntervention}
                    />

                    {/* Micro Coping Activity Card */}
                    {!isStressRelieved ? (
                        <MicroCopingActivity
                            isGameRequested={sentiment.isGameRequested}
                            onComplete={() => {
                                setIsStressRelieved(true);
                                onExerciseComplete();
                            }}
                        />
                    ) : (
                        <div className="card fade-in" style={{
                            background: 'rgba(224, 242, 233, 0.5)',
                            border: '1px solid #C8E6C9',
                            borderRadius: '16px',
                            padding: '15px',
                            marginTop: '20px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '5px' }}>🌿</span>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#1B5E20', fontWeight: '600' }}>
                                Great work. Your stress levels are trending down.
                            </p>
                        </div>
                    )}
                </div>

                <footer style={{
                    marginTop: '25px',
                    paddingTop: '15px',
                    borderTop: '1px solid var(--divider)',
                    textAlign: 'center'
                }}>
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        🧠 Generated using AI mood analysis
                    </small>
                </footer>
            </div>
        </div >
    );
};

export default AIInsight;
