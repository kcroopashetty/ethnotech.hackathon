import React, { useState } from 'react';

const LoginPage = ({ onLogin, onSignup }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic Email Validation
        if (!email.includes('@') || !email.includes('.')) {
            setError('❌ Enter a valid email address');
            return;
        }

        // Password Length Validation
        if (password.length < 4) {
            setError('❌ Password must be at least 4 characters');
            return;
        }

        if (isSignup) {
            if (!name.trim() || !email.trim() || !password.trim()) return;
            const err = onSignup(email, password, name);
            if (err) setError(`❌ ${err}`);
        } else {
            if (!email.trim() || !password.trim()) return;
            const err = onLogin(email, password);
            if (err) setError(`❌ ${err}`);
        }
    };

    return (
        <div className="fade-in" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '2rem', color: 'hsl(var(--primary-dark))' }}>
                    {isSignup ? "Join Aura" : "Welcome Back"}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {isSignup && (
                        <div style={{ textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="How should we call you?"
                                style={{ width: '100%' }}
                                required={isSignup}
                            />
                        </div>
                    )}

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            style={{ width: '100%' }}
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', paddingRight: '40px' }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    padding: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0.6,
                                    boxShadow: 'none',
                                    width: 'auto',
                                    height: 'auto'
                                }}
                                title={showPassword ? "Hide Password" : "Show Password"}
                            >
                                {showPassword ? '👁️' : '🔒'}
                            </button>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--divider)', margin: '10px 0' }}></div>

                    {error && (
                        <p style={{
                            color: '#ff4d4d',
                            fontSize: '0.85rem',
                            marginBottom: '15px',
                            background: 'rgba(255, 77, 77, 0.1)',
                            padding: '8px',
                            borderRadius: '6px',
                            fontWeight: '500'
                        }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        {isSignup ? "Create Private Account" : "Access Journal"}
                    </button>
                </form>

                <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>
                    {isSignup ? "Already have a space?" : "New here?"}{' '}
                    <span
                        onClick={() => setIsSignup(!isSignup)}
                        style={{ color: 'hsl(var(--primary))', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {isSignup ? "Login" : "Create an account"}
                    </span>
                </p>

                <p style={{ marginTop: '30px', fontSize: '0.75rem', color: '#aaa' }}>
                    All data is stored locally and isolated per user.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
