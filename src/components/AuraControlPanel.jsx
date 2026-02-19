import React, { useState } from 'react';
import TrustedContactSettings from './TrustedContact';
import { getConversations } from '../utils/auraResponses';

const AuraControlPanel = ({ isOpen, onClose, onLogout, onTriggerExercise, currentUser }) => {
        const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [clearRange, setClearRange] = useState('today');
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [toast, setToast] = useState(null);

    if (!isOpen) return null;

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleClearChat = () => {
        const allConversations = getConversations();
        const today = new Date();
        let filtered = [];
        let deletedCount = 0;

        if (clearRange === 'today') {
            const todayStr = today.toISOString().split('T')[0];
            const beforeCount = allConversations.length;
            filtered = allConversations.filter(c => c.date !== todayStr);
            deletedCount = beforeCount - filtered.length;
        } else if (clearRange === '7days') {
            const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            const beforeCount = allConversations.length;
            filtered = allConversations.filter(c => new Date(c.date) < sevenDaysAgo);
            deletedCount = beforeCount - filtered.length;
        } else if (clearRange === '14days') {
            const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
            const beforeCount = allConversations.length;
            filtered = allConversations.filter(c => new Date(c.date) < fourteenDaysAgo);
            deletedCount = beforeCount - filtered.length;
        } else if (clearRange === 'all') {
            deletedCount = allConversations.length;
            filtered = [];
        }

        if (deletedCount === 0) {
            showToast('No reflections found for this period.');
            setShowClearConfirm(false);
            return;
        }

        localStorage.setItem('aura_conversations', JSON.stringify(filtered));
        
        // Recalculate streak
        if (currentUser) {
            const todayStr = new Date().toISOString().split('T')[0];
            const hasTodayEntry = filtered.some(c => c.date === todayStr);
            
            if (!hasTodayEntry) {
                const users = JSON.parse(localStorage.getItem('aura_users') || '{}');
                if (users[currentUser.email]) {
                    users[currentUser.email].streak = 0;
                    users[currentUser.email].lastEntryDate = null;
                    localStorage.setItem('aura_users', JSON.stringify(users));
                }
            }
        }

        setShowClearConfirm(false);
        showToast('Selected reflections have been cleared.');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const exercises = [
        { id: 'breathing', name: 'Breathing Exercise', icon: '🌬️', description: 'Animated breathing guide' },
        { id: 'grounding', name: '5-4-3-2-1 Grounding', icon: '🧘', description: 'Sensory awareness technique' },
        { id: 'compassion', name: 'Self-Compassion Writing', icon: '💙', description: 'Kind words to yourself' },
        { id: 'breakdown', name: '5-Minute Task Breakdown', icon: '📝', description: 'Break overwhelming tasks' }
    ];

    const games = [
        { id: 'bubble', name: 'Bubble Breathing', icon: '🫧', description: 'Pop bubbles mindfully' },
        { id: 'focus', name: 'Focus Tap', icon: '🎯', description: 'Concentration game' },
        { id: 'color', name: 'Color Slow-Down', icon: '🎨', description: 'Calming color matching' }
    ];

    return (
        <>
            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: 'hsl(var(--primary))',
                    color: 'white',
                    padding: '15px 25px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    zIndex: 10000,
                    animation: 'fadeIn 0.3s ease-out',
                    fontWeight: '600'
                }}>
                    {toast}
                </div>
            )}

            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Modal Panel */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'hsl(var(--card-bg))',
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        width: '90%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '2px solid hsl(var(--primary) / 0.2)'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '20px 30px',
                        borderBottom: '2px solid var(--divider)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, rgba(205, 180, 219, 0.1), rgba(162, 210, 255, 0.1))'
                    }}>
                        <h2 style={{
                            margin: 0,
                            fontFamily: 'var(--font-hand)',
                            fontSize: '1.8rem',
                            color: 'hsl(var(--primary))'
                        }}>
                            ✨ Aura Controls
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                opacity: 0.6,
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={e => e.target.style.opacity = '1'}
                            onMouseOut={e => e.target.style.opacity = '0.6'}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{
                        padding: '20px 30px',
                        overflowY: 'auto',
                        flex: 1
                    }}>
                        {/* Clear Chat Section */}
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-hand)',
                                fontSize: '1.3rem',
                                color: 'hsl(var(--text-dark))',
                                marginBottom: '15px'
                            }}>
                                🗑️ Clear Chat History
                            </h3>
                            
                            {!showClearConfirm ? (
                                <>
                                    <div style={{ marginBottom: '15px' }}>
                                        {[
                                            { value: 'today', label: 'Today' },
                                            { value: '7days', label: 'Last 7 days' },
                                            { value: '14days', label: 'Last 14 days' },
                                            { value: 'all', label: 'All (30-day storage)' }
                                        ].map(option => (
                                            <label key={option.value} style={{
                                                display: 'block',
                                                padding: '10px',
                                                marginBottom: '8px',
                                                background: clearRange === option.value ? 'hsl(var(--primary) / 0.1)' : 'transparent',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                border: clearRange === option.value ? '2px solid hsl(var(--primary))' : '2px solid var(--divider)',
                                                transition: 'all 0.2s'
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="clearRange"
                                                    value={option.value}
                                                    checked={clearRange === option.value}
                                                    onChange={(e) => setClearRange(e.target.value)}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setShowClearConfirm(true)}
                                        style={{
                                            background: '#ff6b6b',
                                            color: 'white',
                                            padding: '12px 24px',
                                            borderRadius: '50px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            width: '100%',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
                                        onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                    >
                                        Clear Selected
                                    </button>
                                </>
                            ) : (
                                <div style={{
                                    background: 'rgba(255, 107, 107, 0.1)',
                                    padding: '15px',
                                    borderRadius: '10px',
                                    border: '2px solid #ff6b6b'
                                }}>
                                    <p style={{ margin: '0 0 15px 0', color: '#ff6b6b', fontWeight: '600' }}>
                                        ⚠️ This will delete selected reflections permanently.
                                    </p>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={handleClearChat}
                                            style={{
                                                flex: 1,
                                                background: '#ff6b6b',
                                                color: 'white',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: '600'
                                            }}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => setShowClearConfirm(false)}
                                            style={{
                                                flex: 1,
                                                background: 'var(--divider)',
                                                color: 'hsl(var(--text-dark))',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: '600'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Exercises Section */}
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-hand)',
                                fontSize: '1.3rem',
                                color: 'hsl(var(--text-dark))',
                                marginBottom: '15px'
                            }}>
                                🧘 Exercises
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {exercises.map(exercise => (
                                    <button
                                        key={exercise.id}
                                        onClick={() => {
                                            onTriggerExercise(exercise.id);
                                            onClose();
                                        }}
                                        style={{
                                            background: 'hsl(var(--card-bg))',
                                            border: '2px solid var(--divider)',
                                            borderRadius: '12px',
                                            padding: '15px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.borderColor = 'hsl(var(--primary))';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.borderColor = 'var(--divider)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{exercise.icon}</div>
                                        <div style={{ fontWeight: '600', marginBottom: '3px' }}>{exercise.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>
                                            {exercise.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Calm Games Section */}
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-hand)',
                                fontSize: '1.3rem',
                                color: 'hsl(var(--text-dark))',
                                marginBottom: '15px'
                            }}>
                                🎮 Calm Games
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {games.map(game => (
                                    <button
                                        key={game.id}
                                        onClick={() => {
                                            onTriggerExercise(game.id);
                                            onClose();
                                        }}
                                        style={{
                                            background: 'hsl(var(--card-bg))',
                                            border: '2px solid var(--divider)',
                                            borderRadius: '12px',
                                            padding: '15px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.borderColor = 'hsl(var(--secondary))';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.borderColor = 'var(--divider)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{game.icon}</div>
                                        <div style={{ fontWeight: '600', marginBottom: '3px' }}>{game.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>
                                            {game.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Trusted Account Section */}
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-hand)',
                                fontSize: '1.3rem',
                                color: 'hsl(var(--text-dark))',
                                marginBottom: '15px'
                            }}>
                                🤝 Trusted Account
                            </h3>
                            <TrustedContactSettings />
                        </section>
                    </div>

                    {/* Footer - Logout */}
                    {/* Divider above logout */}
                    <div style={{
                        padding: '0 30px',
                        borderTop: '2px solid var(--divider)',
                        marginTop: '20px',
                        background: 'hsl(var(--background))'
                    }}>
                        <button
                            onClick={() => setShowLogoutConfirm(true)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#ff4b4b',
                                padding: '14px 0',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                width: '100%',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.2s',
                                marginTop: '10px'
                            }}
                        >
                            🚪 Logout
                        </button>
                    </div>

                    {/* Logout Confirmation Modal */}
                    {showLogoutConfirm && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.4)',
                            zIndex: 10001,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                padding: '32px',
                                maxWidth: '340px',
                                textAlign: 'center',
                                fontFamily: 'var(--font-hand)'
                            }}>
                                <h3 style={{ color: '#ff4b4b', marginBottom: '18px' }}>Are you sure you want to log out?</h3>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                    <button
                                        onClick={() => {
                                            setShowLogoutConfirm(false);
                                            onLogout();
                                            onClose();
                                        }}
                                        style={{
                                            background: '#ff4b4b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '10px 24px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Yes, Log Out
                                    </button>
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        style={{
                                            background: 'var(--divider)',
                                            color: 'hsl(var(--text-dark))',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '10px 24px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AuraControlPanel;
