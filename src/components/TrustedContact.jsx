import React, { useState, useEffect } from 'react';

/**
 * TrustedContactSettings — for onboarding or settings.
 * Allows user to save/edit one trusted contact.
 * Stored in localStorage as 'aura_trusted_contact'.
 */
const TrustedContactSettings = ({ onSave }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [saved, setSaved] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('aura_trusted_contact');
        if (stored) {
            setSaved(JSON.parse(stored));
        }
    }, []);

    const handleSave = () => {
        if (!name.trim() || !phone.trim()) return;
        const contact = { name: name.trim(), phone: phone.trim() };
        localStorage.setItem('aura_trusted_contact', JSON.stringify(contact));
        setSaved(contact);
        setEditing(false);
        setName('');
        setPhone('');
        if (onSave) onSave(contact);
    };

    const handleRemove = () => {
        localStorage.removeItem('aura_trusted_contact');
        setSaved(null);
        setEditing(false);
        if (onSave) onSave(null);
    };

    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #e0d8f0',
        borderRadius: '10px',
        fontFamily: 'var(--font-body-hand)',
        fontSize: '0.9rem',
        outline: 'none',
        background: 'white',
        boxSizing: 'border-box'
    };

    return (
        <div className="fade-in" style={{
            padding: '14px',
            background: 'linear-gradient(135deg, #f5f0ff, #fce4ec80)',
            borderRadius: '14px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            maxWidth: '340px'
        }}>
            <p style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '0.95rem',
                color: '#5a5a7a',
                marginBottom: '10px',
                textAlign: 'center'
            }}>
                🤝 Trusted Contact
            </p>

            {saved && !editing ? (
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                        marginBottom: '8px'
                    }}>
                        <p style={{ fontWeight: '600', color: '#4a4a6a', fontSize: '0.95rem' }}>
                            {saved.name}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#999' }}>
                            {saved.phone}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button onClick={() => { setEditing(true); setName(saved.name); setPhone(saved.phone); }}
                            style={{ background: 'none', border: 'none', color: '#7e57c2', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>
                            Edit
                        </button>
                        <button onClick={handleRemove}
                            style={{ background: 'none', border: 'none', color: '#999', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input type="text" placeholder="Contact name" value={name}
                        onChange={e => setName(e.target.value)} style={inputStyle} />
                    <input type="tel" placeholder="Phone number" value={phone}
                        onChange={e => setPhone(e.target.value)} style={inputStyle} />
                    <button onClick={handleSave}
                        disabled={!name.trim() || !phone.trim()}
                        style={{
                            padding: '8px 16px', border: 'none', borderRadius: '16px',
                            background: (!name.trim() || !phone.trim()) ? '#ddd' : 'hsl(var(--primary))',
                            color: 'white', fontFamily: 'var(--font-hand)', fontSize: '0.9rem',
                            cursor: (!name.trim() || !phone.trim()) ? 'default' : 'pointer'
                        }}>
                        Save 💙
                    </button>
                    {editing && (
                        <button onClick={() => setEditing(false)}
                            style={{ background: 'none', border: 'none', color: '#999', fontSize: '0.8rem', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    )}
                </div>
            )}
            <p style={{ fontSize: '0.7rem', color: '#bbb', textAlign: 'center', marginTop: '6px', fontStyle: 'italic' }}>
                Optional. This person may be suggested during moments of distress.
            </p>
        </div>
    );
};

export default TrustedContactSettings;
