import React from 'react';
import { getStoredRecoveryDays } from '../utils/safeFeatures';

const RecoveryTimeCard = () => {
    try {
        const days = getStoredRecoveryDays();
        if (!days) return null;

        return (
            <div className="card fade-in" style={{
                background: 'linear-gradient(135deg, rgba(181, 234, 215, 0.15), rgba(200, 230, 210, 0.1))',
                border: '1px solid rgba(181, 234, 215, 0.3)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{ fontSize: '1.5rem' }}>💪</span>
                <div>
                    <p style={{
                        margin: 0,
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: 'hsl(var(--text-dark))',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        Recovery time: {days} day{days !== 1 ? 's' : ''}
                    </p>
                    <p style={{
                        margin: '4px 0 0',
                        fontSize: '0.8rem',
                        color: 'hsl(var(--text-muted))',
                        fontFamily: 'var(--font-body)'
                    }}>
                        Time between your last difficult moment and feeling better
                    </p>
                </div>
            </div>
        );
    } catch {
        return null;
    }
};

export default RecoveryTimeCard;
