import React, { useState, useMemo } from 'react';
import { computeWeeklySummary } from '../utils/safeFeatures';

const WeeklySummaryCard = ({ moodHistory }) => {
    try {
        const summary = useMemo(() => {
            try {
                return computeWeeklySummary(moodHistory);
            } catch {
                return null;
            }
        }, [moodHistory]);

        if (!summary) return null;

        const moodLabel = summary.mostCommonMood === 'stress' ? 'stressed' : summary.mostCommonMood;

        return (
            <div className="card fade-in" style={{
                background: 'linear-gradient(135deg, rgba(205, 180, 219, 0.1), rgba(162, 210, 255, 0.1))',
                border: '1px solid hsl(var(--primary) / 0.2)',
                borderRadius: '16px',
                padding: '20px',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.3rem' }}>📊</span>
                    <h4 style={{
                        margin: 0,
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        color: 'hsl(var(--text-dark))'
                    }}>
                        Your Weekly Reflection
                    </h4>
                </div>

                <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: 'hsl(var(--text-dark))',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)'
                }}>
                    This week you felt <strong style={{ textTransform: 'capitalize' }}>{moodLabel}</strong> on several days.
                    You had <strong>{summary.happyDays}</strong> positive day{summary.happyDays !== 1 ? 's' : ''}.
                    Journaling and small coping steps are helping you stay aware.
                </p>

                {summary.exercisesCompleted > 0 && (
                    <p style={{
                        margin: '10px 0 0',
                        fontSize: '0.85rem',
                        color: 'hsl(var(--primary))',
                        fontWeight: '600',
                        fontFamily: 'var(--font-body)'
                    }}>
                        🌿 You used healthy coping activities this week.
                    </p>
                )}

                <p style={{
                    margin: '12px 0 0',
                    fontSize: '0.75rem',
                    color: 'hsl(var(--text-muted))',
                    fontStyle: 'italic'
                }}>
                    Based on {summary.totalEntries} journal entries this week
                </p>
            </div>
        );
    } catch {
        return null;
    }
};

export default WeeklySummaryCard;
