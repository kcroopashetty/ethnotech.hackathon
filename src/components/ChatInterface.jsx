import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = ({ onSendMessage, messages, isTyping }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSendMessage(input);
        setInput('');
    };

    return (
        <div className="glass-card animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '600px',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0'
        }}>
            {/* Header */}
            <div style={{
                padding: '20px',
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                }}>
                    🤖
                </div>
                <div>
                    <h3 style={{ margin: 0 }}>Mindful Bot</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Always here to listen.</p>
                </div>
            </div>

            {/* Messages Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`chat-bubble ${msg.sender === 'user' ? 'chat-user' : 'chat-bot'}`}
                    >
                        {msg.text}
                        <div style={{
                            fontSize: '0.7rem',
                            marginTop: '4px',
                            opacity: 0.7,
                            textAlign: 'right'
                        }}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="chat-bubble chat-bot" style={{ width: '60px' }}>
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} style={{
                padding: '20px',
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                gap: '10px'
            }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: '12px 20px',
                        borderRadius: '30px',
                        border: 'none',
                        background: 'var(--glass-input)',
                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                        outline: 'none',
                        fontFamily: 'inherit'
                    }}
                />
                <button
                    type="submit"
                    className="btn-primary"
                    style={{
                        borderRadius: '50%',
                        width: '46px',
                        height: '46px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                    }}
                >
                    ➤
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
