import React, { useState, useEffect } from 'react';
import { getExercise } from '../utils/exercises';

const PersonalizedExercises = ({ mood, onSaveGratitude, onSaveSelfCompassionNote, onTriggerIntervention }) => {
    const [exercise, setExercise] = useState('');
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (mood) {
            const selectedExercise = getExercise(mood);
            setExercise(selectedExercise);
            setIsDone(false);
        }
    }, [mood]);

    const getMoodConfig = (mood) => {
        switch (mood) {
            case 'happy': return { bg: '#E0F2E9', color: '#1B5E20', icon: '✨' };
            case 'neutral': return { bg: '#F5F5F5', color: '#424242', icon: '🔍' };
            case 'stress': return { bg: '#FFEBEE', color: '#C62828', icon: '📝' };
            case 'sad': return { bg: '#E3F2FD', color: '#1565C0', icon: '💙' };
            case 'anxious': return { bg: '#FFF3E0', color: '#E65100', icon: '🌬️' };
            case 'calm': return { bg: '#E8F5E9', color: '#2E7D32', icon: '🌿' };
            default: return { bg: '#F5F5F5', color: '#424242', icon: '✨' };
        }
    };

    const config = getMoodConfig(mood);

    const handleMarkDone = () => {
        setIsDone(true);
        setTimeout(() => setIsDone(false), 3000);
    };

    if (!exercise) return null;

    return (
        <div className="exercise-card fade-in" style={{
            background: config.bg,
            padding: '20px',
            borderRadius: '15px',
            marginTop: '20px',
            border: `2px solid ${config.color}20`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '15px'
            }}>
                <span style={{ fontSize: '1.5rem' }}>{config.icon}</span>
                <h4 style={{
                    color: config.color,
                    margin: 0,
                    fontWeight: '600',
                    fontSize: '1.1rem'
                }}>
                    Coping Exercise
                </h4>
            </div>

            <p style={{
                color: config.color,
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '15px',
                fontWeight: '500'
            }}>
                {exercise}
            </p>

            {!isDone ? (
                <button
                    onClick={handleMarkDone}
                    className="btn-primary"
                    style={{
                        background: config.color,
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                    }}
                >
                    Mark as Done ✓
                </button>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: '10px',
                    color: config.color,
                    fontWeight: '600',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    🎉 Great job! You're taking care of yourself.
                </div>
            )}
        </div>
    );
};

export default PersonalizedExercises;
