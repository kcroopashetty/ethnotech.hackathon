import React from 'react';
import BreathingAnimation from './BreathingAnimation';
import GroundingModule from './GroundingModule';
import SelfCompassionModule from './SelfCompassionModule';
import TaskBreakdownModule from './TaskBreakdownModule';
import BubbleGame from './BubbleGame';
import FocusTapGame from './FocusTapGame';
import ColorSlowGame from './ColorSlowGame';

const ActivityModal = ({ activeActivity, onClose }) => {
    if (!activeActivity) return null;

    const getActivityComponent = () => {
        switch (activeActivity) {
            case 'breathing':
                return <BreathingAnimation onClose={onClose} />;
            case 'grounding':
                return <GroundingModule onClose={onClose} />;
            case 'compassion':
                return <SelfCompassionModule onClose={onClose} />;
            case 'breakdown':
                return <TaskBreakdownModule onClose={onClose} />;
            case 'bubble':
                return <BubbleGame onClose={onClose} />;
            case 'focus':
                return <FocusTapGame onClose={onClose} />;
            case 'color':
                return <ColorSlowGame onClose={onClose} />;
            default:
                return null;
        }
    };

    const getActivityTitle = () => {
        switch (activeActivity) {
            case 'breathing': return '🌬️ Breathing Exercise';
            case 'grounding': return '🧘 5-4-3-2-1 Grounding';
            case 'compassion': return '💙 Self-Compassion';
            case 'breakdown': return '📝 Task Breakdown';
            case 'bubble': return '🫧 Bubble Breathing';
            case 'focus': return '🎯 Focus Tap';
            case 'color': return '🎨 Color Slow-Down';
            default: return 'Activity';
        }
    };

    return (
        <>
            {/* Dimmed Background */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Modal Panel */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'hsl(var(--card-bg))',
                        borderRadius: '20px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                        width: '95vw',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '2px solid hsl(var(--primary) / 0.2)',
                        animation: 'slideUp 0.3s ease-out'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '20px 30px',
                            borderBottom: '2px solid var(--divider)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'linear-gradient(135deg, rgba(205, 180, 219, 0.1), rgba(162, 210, 255, 0.1))'
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontFamily: 'var(--font-hand)',
                                fontSize: '1.6rem',
                                color: 'hsl(var(--primary))'
                            }}
                        >
                            {getActivityTitle()}
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.8rem',
                                cursor: 'pointer',
                                opacity: 0.6,
                                transition: 'all 0.2s',
                                padding: '5px 10px',
                                borderRadius: '8px'
                            }}
                            onMouseOver={e => {
                                e.target.style.opacity = '1';
                                e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                            }}
                            onMouseOut={e => {
                                e.target.style.opacity = '0.6';
                                e.target.style.background = 'none';
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div
                        style={{
                            flex: 1,
                            overflow: 'auto',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {getActivityComponent()}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
};

export default ActivityModal;
