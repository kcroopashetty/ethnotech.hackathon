import React from 'react';

const Doodle = ({ type, color = '#CDB4DB', style = {}, className = '' }) => {
    const doodles = {
        star: (
            <svg viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M25 5L30 18L45 18L33 28L38 42L25 35L12 42L17 28L5 18L20 18L25 5Z" />
            </svg>
        ),
        heart: (
            <svg viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M25 39.7l-.6-.5C9.8 25.6 5 20.3 5 14.5 5 9.1 9.1 5 14.5 5c3.2 0 6.1 1.6 8 4.1 1.9-2.5 4.8-4.1 8-4.1 5.4 0 9.5 4.1 9.5 9.5 0 5.8-4.8 11.1-19.4 24.7l-.6.5z" />
            </svg>
        ),
        scribble: (
            <svg viewBox="0 0 100 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <path d="M5 10C15 5 25 15 35 10C45 5 55 15 65 10C75 5 85 15 95 10" />
            </svg>
        ),
        flower: (
            <svg viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <path d="M25 25m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
                <path d="M25 20c0-8-10-8-10 0c-8 0-8 10 0 10c0 8 10 8 10 0c8 0 8-10 0-10" />
                <path d="M25 35q0 15-10 10" />
            </svg>
        ),
        sun: (
            <svg viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <circle cx="25" cy="25" r="10" />
                <path d="M25 5v5M25 40v5M5 25h5M40 25h5M11 11l4 4M35 35l4 4M11 39l4-4M35 15l4-4" />
            </svg>
        ),
        arrow: (
            <svg viewBox="0 0 50 30" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
                <path d="M5 15q20-5 40 0" />
                <path d="M35 5l10 10l-10 10" />
            </svg>
        )
    };

    return (
        <div className={`doodle-svg ${className}`} style={{ width: '40px', height: '40px', display: 'inline-block', ...style }}>
            {doodles[type] || null}
        </div>
    );
};

export default Doodle;
