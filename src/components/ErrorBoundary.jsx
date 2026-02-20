import React from 'react';

/**
 * ErrorBoundary - Catches runtime errors in the component tree
 * and shows a fallback UI instead of a blank screen.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'hsl(var(--bg-warm))',
                    padding: '20px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔮</div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}>
                        Something went wrong
                    </h1>
                    <p style={{ color: 'hsl(var(--text-muted))', maxWidth: '400px', marginBottom: '30px' }}>
                        Aura encountered a small hiccup. Don't worry, your journal entries are safe.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px',
                            background: 'hsl(var(--primary))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-soft)'
                        }}
                    >
                        Refresh Page
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <details style={{ marginTop: '20px', textAlign: 'left', background: 'white', padding: '10px', borderRadius: '8px' }}>
                            <summary>Error Details</summary>
                            <pre style={{ fontSize: '10px', overflow: 'auto' }}>
                                {this.state.error && this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
