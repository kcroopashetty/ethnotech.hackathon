import React, { useState } from 'react';

const predefinedCounselors = [
    { name: 'NIMHANS Helpline', phone: '080-46110007', city: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Vandrevala Foundation', phone: '1860-2662-345', city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'iCall (TISS)', phone: '9152987821', city: 'Mumbai', lat: 19.0435, lon: 72.8600 },
    { name: 'Snehi', phone: '044-24640050', city: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Connecting Trust', phone: '9922001122', city: 'Pune', lat: 18.5204, lon: 73.8567 },
];

const FindHelpNearMe = () => {
    const [status, setStatus] = useState('idle'); // idle | loading | found | denied
    const [nearest, setNearest] = useState(null);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const handleFindHelp = () => {
        if (!navigator.geolocation) {
            setStatus('denied');
            return;
        }
        setStatus('loading');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                let closest = null;
                let minDist = Infinity;
                predefinedCounselors.forEach(c => {
                    const d = getDistance(latitude, longitude, c.lat, c.lon);
                    if (d < minDist) {
                        minDist = d;
                        closest = { ...c, distance: Math.round(d) };
                    }
                });
                setNearest(closest);
                setStatus('found');
            },
            () => {
                setStatus('denied');
            }
        );
    };

    return (
        <div className="fade-in" style={{
            textAlign: 'center',
            padding: '16px',
            background: 'linear-gradient(135deg, #e0f2f1, #e8eaf6)',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            margin: '12px auto',
            maxWidth: '360px'
        }}>
            {status === 'idle' && (
                <button
                    onClick={handleFindHelp}
                    style={{
                        padding: '12px 28px',
                        background: 'linear-gradient(135deg, #26a69a, #5c6bc0)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '24px',
                        fontFamily: 'var(--font-hand)',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(38, 166, 154, 0.3)',
                        transition: 'all 0.2s'
                    }}
                >
                    📍 Find help near me
                </button>
            )}

            {status === 'loading' && (
                <p style={{ fontFamily: 'var(--font-hand)', color: '#5a5a7a' }}>
                    Looking for help near you... 🔍
                </p>
            )}

            {status === 'found' && nearest && (
                <div>
                    <p style={{
                        fontFamily: 'var(--font-hand)',
                        fontSize: '1rem',
                        color: '#5a5a7a',
                        marginBottom: '8px'
                    }}>
                        Nearest counseling resource:
                    </p>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '14px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <p style={{ fontWeight: '600', color: '#4a4a6a', marginBottom: '4px' }}>
                            {nearest.name}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '4px' }}>
                            {nearest.city} (~{nearest.distance} km)
                        </p>
                        <a
                            href={`tel:${nearest.phone.replace(/[-\s]/g, '')}`}
                            style={{
                                display: 'inline-block',
                                padding: '8px 20px',
                                background: 'hsl(var(--primary))',
                                color: 'white',
                                borderRadius: '20px',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-hand)',
                                fontSize: '0.9rem',
                                marginTop: '8px'
                            }}
                        >
                            📞 {nearest.phone}
                        </a>
                    </div>
                </div>
            )}

            {status === 'denied' && (
                <div>
                    <p style={{
                        fontFamily: 'var(--font-hand)',
                        fontSize: '0.95rem',
                        color: '#5a5a7a',
                        marginBottom: '10px'
                    }}>
                        Location unavailable. You can also speak to someone you trust. 💙
                    </p>
                    <a
                        href="tel:18005990019"
                        style={{
                            display: 'inline-block',
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #7e57c2, #5c6bc0)',
                            color: 'white',
                            borderRadius: '20px',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-hand)',
                            fontSize: '0.9rem'
                        }}
                    >
                        📞 Call Kiran Helpline
                    </a>
                </div>
            )}

            <p style={{
                fontSize: '0.7rem',
                color: '#bbb',
                marginTop: '10px',
                fontStyle: 'italic'
            }}>
                Your location is never stored.
            </p>
        </div>
    );
};

export default FindHelpNearMe;
