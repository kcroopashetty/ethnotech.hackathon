import React, { useState, useEffect } from 'react';

const TaskBreakdownModule = ({ onClose }) => {
    const [task, setTask] = useState('');
    const [steps, setSteps] = useState([]);
    const [checkedSteps, setCheckedSteps] = useState({});
    const [completed, setCompleted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const breakDownTask = (taskDescription) => {
        // Auto-generate 3 reasonable steps based on the task
        if (!taskDescription.trim()) return;

        const taskLower = taskDescription.toLowerCase();
        let generatedSteps = [];

        // Logic to generate context-aware steps
        if (taskLower.includes('clean') || taskLower.includes('tidy')) {
            generatedSteps = [
                '🧹 Clear surfaces and put items away',
                '🧽 Wipe down and dust',
                '✨ Final check and organize'
            ];
        } else if (taskLower.includes('work') || taskLower.includes('project')) {
            generatedSteps = [
                '📋 Break down into smaller tasks',
                '⏰ Set time blocks for each task',
                '🎯 Start with the easiest part'
            ];
        } else if (taskLower.includes('study') || taskLower.includes('learn')) {
            generatedSteps = [
                '📖 Gather materials needed',
                '⏱️ Study for 25-minute blocks',
                '✅ Review and summarize'
            ];
        } else if (taskLower.includes('exercise') || taskLower.includes('workout')) {
            generatedSteps = [
                '🚀 Start with a 5-minute warm-up',
                '💪 Do light movement for 10 minutes',
                '🧘 Stretch and cool down'
            ];
        } else if (taskLower.includes('write') || taskLower.includes('email')) {
            generatedSteps = [
                '🤔 Outline main points',
                '✍️ Write a rough draft',
                '📝 Edit and refine'
            ];
        } else {
            // Generic steps
            generatedSteps = [
                '✅ Step 1: Start small and build momentum',
                '⏰ Step 2: Take breaks when needed',
                '🎉 Step 3: Celebrate progress'
            ];
        }

        setSteps(generatedSteps);
        setCheckedSteps({});
        setSubmitted(true);
    };

    const toggleStep = (index) => {
        setCheckedSteps(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    useEffect(() => {
        if (steps.length > 0 && Object.keys(checkedSteps).length === steps.length) {
            const allChecked = steps.every((_, i) => checkedSteps[i]);
            if (allChecked) {
                setCompleted(true);
            }
        }
    }, [checkedSteps, steps]);

    if (completed) {
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
                    🎉
                </div>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '15px',
                    fontFamily: 'var(--font-hand)'
                }}>
                    You Did It!
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '30px',
                    maxWidth: '300px'
                }}>
                    Breaking it down made it manageable. You're capable and strong. 💪
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

    if (!submitted) {
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
                    📝
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'hsl(var(--primary))',
                    marginBottom: '15px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-hand)'
                }}>
                    5-Minute Task Breakdown
                </h2>

                {/* Description */}
                <p style={{
                    fontSize: '0.95rem',
                    color: 'hsl(var(--text-muted))',
                    marginBottom: '25px',
                    textAlign: 'center',
                    lineHeight: '1.5'
                }}>
                    Turn overwhelming tasks into tiny, doable steps.
                </p>

                {/* Input */}
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && breakDownTask(task)}
                    placeholder="What feels overwhelming?"
                    style={{
                        padding: '15px',
                        borderRadius: '12px',
                        border: '2px solid var(--divider)',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        marginBottom: '20px',
                        outlined: 'none',
                        transition: 'border 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'hsl(var(--primary))'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--divider)'}
                />

                {/* Submit Button */}
                <button
                    onClick={() => breakDownTask(task)}
                    disabled={!task.trim()}
                    style={{
                        background: task.trim() ? 'hsl(var(--primary))' : 'var(--divider)',
                        color: task.trim() ? 'white' : 'hsl(var(--text-muted))',
                        padding: '12px 32px',
                        borderRadius: '50px',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: task.trim() ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        alignSelf: 'center'
                    }}
                    onMouseOver={e => {
                        if (task.trim()) e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={e => {
                        if (task.trim()) e.target.style.transform = 'scale(1)';
                    }}
                >
                    Break It Down
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
            {/* Title */}
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'hsl(var(--primary))',
                marginBottom: '10px',
                textAlign: 'center',
                fontFamily: 'var(--font-hand)'
            }}>
                Simple Steps
            </h2>

            <p style={{
                fontSize: '0.95rem',
                color: 'hsl(var(--text-muted))',
                marginBottom: '25px',
                textAlign: 'center'
            }}>
                Mark each step as you go
            </p>

            {/* Steps List */}
            <div style={{ flex: 1, marginBottom: '25px' }}>
                {steps.map((step, index) => (
                    <label
                        key={index}
                        onClick={() => toggleStep(index)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px',
                            marginBottom: '12px',
                            background: checkedSteps[index] ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--card-bg))',
                            border: `2px solid ${checkedSteps[index] ? 'hsl(var(--primary))' : 'var(--divider)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textDecoration: checkedSteps[index] ? 'line-through' : 'none',
                            color: checkedSteps[index] ? 'hsl(var(--text-muted))' : 'hsl(var(--text-dark))',
                            fontWeight: '500'
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = checkedSteps[index] ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--card-bg))';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = checkedSteps[index] ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--card-bg))';
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={checkedSteps[index] || false}
                            onChange={() => toggleStep(index)}
                            style={{
                                marginRight: '12px',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                            }}
                        />
                        <span>{step}</span>
                    </label>
                ))}
            </div>

            {/* Progress */}
            <div style={{
                textAlign: 'center',
                color: 'hsl(var(--text-muted))',
                fontSize: '0.9rem',
                marginBottom: '15px'
            }}>
                {Object.keys(checkedSteps).filter(k => checkedSteps[k]).length} of {steps.length} completed
            </div>
        </div>
    );
};

export default TaskBreakdownModule;
