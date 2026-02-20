import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodDashboard = ({ history = [] }) => {
    // If no data, render nothing as per production hardening rules
    if (!history || history.length === 0) return null;
    // Mood to value mapping
    const moodToValue = {
        'sad': 1,
        'anxious': 2,
        'stress': 3,
        'neutral': 4,
        'happy': 5
    };

    const valueToMood = {
        1: 'Sad',
        2: 'Anxious',
        3: 'Stressed',
        4: 'Neutral',
        5: 'Happy'
    };

    // Process last 7 days of data
    const weekData = useMemo(() => {
        const today = new Date();
        const last7Days = [];

        // Generate last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString();

            // Find mood entry for this day
            const dayEntry = history.find(entry => {
                const entryDate = new Date(entry.date).toLocaleDateString();
                return entryDate === dateStr;
            });

            last7Days.push({
                day: date.toLocaleDateString(undefined, { weekday: 'short' }),
                date: dateStr,
                value: dayEntry ? moodToValue[dayEntry.mood] || 4 : 4,
                mood: dayEntry ? dayEntry.mood : 'neutral'
            });
        }

        return last7Days;
    }, [history]);

    // Generate AI insight based on trend
    const weeklyInsight = useMemo(() => {
        const values = weekData.map(d => d.value);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const trend = values[values.length - 1] - values[0];

        if (avg >= 4.5) return "Your week has been wonderful! Keep nurturing this positive energy. ✨";
        if (avg >= 3.5) return "You're maintaining good emotional balance this week. Keep it up! 🌟";
        if (trend > 1) return "Great progress! Your mood is trending upward. You're doing amazing! 📈";
        if (trend < -1) return "I notice some challenges this week. Remember to be gentle with yourself. 💙";
        if (avg < 2.5) return "This week seems tough. Please reach out to someone you trust or a professional. 🤝";
        return "Your mood has been steady this week. Small steps forward count too! 🌱";
    }, [weekData]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--divider)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <p style={{ margin: 0, fontWeight: '600', color: 'hsl(var(--primary))' }}>
                        {valueToMood[payload[0].value]}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card" style={{
            height: '100%',
            background: 'hsl(var(--card-bg))',
            border: '1px solid var(--divider)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Washi Tape */}
            <div className="tape-strip" style={{ top: '-10px', left: '10px', background: 'rgba(255, 218, 193, 0.4)' }}></div>

            <h3 style={{
                marginBottom: '1rem',
                fontWeight: '400',
                fontFamily: 'var(--font-hand)',
                fontSize: '1.5rem',
                color: 'hsl(var(--text-dark))'
            }}>
                Your Mood This Week
            </h3>

            {history.length === 0 ? (
                <p style={{ fontFamily: 'var(--font-body-hand)', color: 'hsl(var(--text-muted))' }}>
                    Start journaling to track your weekly mood patterns!
                </p>
            ) : (
                <>
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={weekData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 12, fill: 'hsl(var(--text-muted))' }}
                                stroke="var(--divider)"
                            />
                            <YAxis
                                domain={[0, 6]}
                                ticks={[1, 2, 3, 4, 5]}
                                tick={{ fontSize: 12, fill: 'hsl(var(--text-muted))' }}
                                stroke="var(--divider)"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                strokeWidth={3}
                                dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Weekly Insight */}
                    <div style={{
                        marginTop: '1rem',
                        padding: '12px',
                        background: 'rgba(205, 180, 219, 0.1)',
                        borderRadius: '8px',
                        borderLeft: '3px solid hsl(var(--primary))'
                    }}>
                        <p style={{
                            margin: 0,
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-body-hand)',
                            color: 'hsl(var(--text-dark))',
                            lineHeight: '1.5'
                        }}>
                            {weeklyInsight}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MoodDashboard;
