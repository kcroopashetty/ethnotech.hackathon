import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import Doodle from './Doodle';
import { generateAuraResponse, saveMessage, getConversations, detectRisk, careResponses } from '../utils/auraResponses';
import SafetyCheckInCard from './SafetyCheckInCard';
import CareBreathingAnimation from './CareBreathingAnimation';
import HelplineButton from './HelplineButton';
import FindHelpNearMe from './FindHelpNearMe';


const InteractiveDiary = forwardRef(({ onAnalyze, userContext, onTriggerExercise }, ref) => {
    const [entry, setEntry] = useState('');
    const [todayMessages, setTodayMessages] = useState([]);
    const [pastConversations, setPastConversations] = useState([]);
    const [isThinking, setIsThinking] = useState(false);

    // CARE MODE state
    const [isCareMode, setIsCareMode] = useState(false);
    const [careStep, setCareStep] = useState(null);
    const [showBreathing, setShowBreathing] = useState(false);


    const { isListening, transcript, voiceEmotion, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition();
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);
    const chatScrollRef = useRef(null);

    // Expose focusInput() and reloadMessages() to parent via ref
    useImperativeHandle(ref, () => ({
        focusInput() {
            if (chatScrollRef.current) {
                chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
            }
            textareaRef.current?.focus();
        },
        reloadMessages() {
            loadData();
        }
    }));

    // Load conversations on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const allConversations = getConversations();
        const today = new Date().toISOString().split('T')[0];

        const todayConvo = allConversations.find(c => c.date === today);
        setTodayMessages(todayConvo ? todayConvo.messages : []);

        const past = allConversations.filter(c => c.date !== today);
        setPastConversations(past);
    };

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [todayMessages, isThinking]);

    const prompts = [
        "Today I am grateful for...",
        "I feel stressed because...",
        "Something that made me smile today...",
        "What's one thing I want to let go of?",
        "How did I show kindness today?"
    ];

    const detectEmotion = (text) => {
        const lower = text.toLowerCase();
        if (lower.match(/stress|overwhelm|pressure|deadline|busy/)) return 'stress';
        if (lower.match(/sad|depressed|lonely|cry|down/)) return 'sad';
        if (lower.match(/happy|joy|excited|great|love|wonderful/)) return 'happy';
        if (lower.match(/anxious|worried|nervous|panic|scared/)) return 'anxious';
        if (lower.match(/calm|peace|relax|serene/)) return 'calm';
        return 'neutral';
    };

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const currentText = isListening ? (entry + ' ' + transcript).trim() : entry;

    const handleAnalyze = () => {
        if (isListening) stopListening();
        if (!currentText.trim()) return;

        const userText = currentText;
        const mood = detectEmotion(userText);

        // 1. Add User Message immediately
        saveMessage('user', userText);
        setEntry(''); // Clear input
        loadData(); // Reload to show new message

        setIsThinking(true);

        // 2. Check for risk FIRST
        if (detectRisk(userText)) {
            setTimeout(() => {
                const careResponse = careResponses[Math.floor(Math.random() * careResponses.length)];
                saveMessage('aura', careResponse);
                setIsThinking(false);
                setIsCareMode(true);
                setCareStep('check_in');
                loadData();
                onAnalyze(userText, voiceEmotion);
            }, 1500);
            return;
        }

        // 3. Check for specific triggers (Exercises / Games)
        const exerciseKeywords = ["exercise", "coping", "help me relax", "stress activity", "grounding", "breathe", "breathing"];
        const gameKeywords = ["game", "play", "distract me", "something fun"];

        const lowerText = userText.toLowerCase();

        if (exerciseKeywords.some(kw => lowerText.includes(kw))) {
            setTimeout(() => {
                saveMessage('aura', "Here are some exercises that might help you feel more grounded and relaxed. [SHOW_EXERCISES]");
                setIsThinking(false);
                loadData();
                onAnalyze(userText, voiceEmotion);
            }, 1000);
            return;
        }

        if (gameKeywords.some(kw => lowerText.includes(kw))) {
            setTimeout(() => {
                saveMessage('aura', "Playing a little game can be a great way to take your mind off things. [SHOW_GAMES]");
                setIsThinking(false);
                loadData();
                onAnalyze(userText, voiceEmotion);
            }, 1000);
            return;
        }

        // 4. Normal Aura Response
        setTimeout(() => {
            const recentHistory = todayMessages.slice(-3);
            const response = generateAuraResponse(userText, mood, userContext, recentHistory);
            saveMessage('aura', response);
            setIsThinking(false);
            loadData();
            onAnalyze(userText, voiceEmotion);
        }, 1500);
    };

    // CARE MODE handlers
    const handleSafe = () => {
        saveMessage('aura', "I'm glad you're safe. Let's take a calming moment together. 🌿");
        loadData();
        setCareStep('safe_breathing');
        setShowBreathing(true);
    };

    const handleUnsure = () => {
        saveMessage('aura', "That's okay. Let's ground you first, then I'll share some support options. 💙");
        loadData();
        setCareStep('unsure_breathing');
        setShowBreathing(true);
    };

    const handleNeedHelp = () => {
        saveMessage('aura', "You're brave for reaching out. Here are some people who can help right now. 💙");
        loadData();
        setCareStep('need_help');
    };

    const handleBreathingComplete = () => {
        setShowBreathing(false);
        if (careStep === 'safe_breathing') {
            setIsCareMode(false);
            setCareStep(null);
        } else if (careStep === 'unsure_breathing') {
            setCareStep('continue_support');
        }
    };



    const handlePrompt = () => {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setEntry(randomPrompt);
    };

    useEffect(() => {
        if (!isListening && transcript) {
            setEntry(prev => (prev + ' ' + transcript).trim());
        }
    }, [isListening]);

    // Format Date for Past Reflections
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="card" style={{
            height: '110vh',
            maxHeight: '110vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative', // Keep relative for tape/doodles
            transform: 'rotate(-1deg)',
            border: '3px solid hsl(var(--primary) / 0.3)',
            boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
            background: 'hsl(var(--card-bg))',
            overflow: 'hidden' // Contain children
        }}>
            {/* Privacy Disclaimer */}
            <div style={{
                position: 'absolute',
                top: '5px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7rem',
                color: 'hsl(var(--text-muted))',
                opacity: 0.8,
                zIndex: 25,
                background: 'rgba(255,255,255,0.8)',
                padding: '2px 8px',
                borderRadius: '10px'
            }}>
                🛡️ Your reflections are stored locally for 30 days.
            </div>

            <button
                onClick={handlePrompt}
                style={{
                    position: 'absolute',
                    top: '-45px',
                    right: '10px',
                    background: '#CDB4DB',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    zIndex: 20,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
            >
                💡 Need a prompt?
            </button>

            <div className="tape-strip" style={{ top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>

            {/* Binding Binding Visual */}
            <div style={{
                position: 'absolute',
                left: '10px',
                top: '20px',
                bottom: '20px',
                width: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                zIndex: 10
            }}>
                {[...Array(12)].map((_, i) => (
                    <div key={i} style={{
                        width: '30px',
                        height: '10px',
                        background: 'linear-gradient(to right, #555, #777, #555)',
                        borderRadius: '50px',
                        boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        transform: 'rotate(-5deg)'
                    }} />
                ))}
            </div>

            <header style={{
                marginBottom: '10px',
                borderBottom: '2px solid var(--secondary)',
                paddingBottom: '15px',
                paddingLeft: '50px',
                paddingTop: '30px', // Extra space for disclaimer
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div>
                    <h3 style={{ fontWeight: '400', fontFamily: 'var(--font-hand)', fontSize: '1.8rem', color: 'hsl(var(--text-dark))' }}>
                        Dear Diary...
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-body-hand)', color: 'hsl(var(--text-muted))' }}>
                            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                    </div>
                </div>

                {hasRecognitionSupport && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            onClick={handleMicClick}
                            title={isListening ? "Stop Recording" : "Start Voice Journaling"}
                            style={{
                                background: isListening ? '#dc3545' : 'transparent',
                                color: isListening ? 'white' : 'hsl(var(--text-muted))',
                                border: isListening ? 'none' : '2px dashed var(--divider)',
                                borderRadius: '50%',
                                width: '45px',
                                height: '45px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                animation: isListening ? 'pulse 1.5s infinite' : 'none',
                                fontSize: '1.2rem'
                            }}
                        >
                            {isListening ? '⏹️' : '🎙️'}
                        </button>
                    </div>
                )}
            </header>


            {/* Main Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: 0
            }}>
                {/* Scrollable Messages Area */}
                <div ref={chatScrollRef} style={{
                    flex: 1,
                    overflowY: 'auto',
                    minHeight: 0,
                    paddingLeft: '50px',
                    paddingRight: '15px',
                    paddingBottom: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'hsl(var(--primary) / 0.3) transparent'
                }}>
                    <style>{`
                        /* Webkit Scrollbar Styling */
                        div::-webkit-scrollbar {
                            width: 6px;
                        }
                        div::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        div::-webkit-scrollbar-thumb {
                            background-color: hsl(var(--primary) / 0.3);
                            border-radius: 20px;
                        }
                    `}</style>

                    {/* 1. Today's Conversation History */}
                    {todayMessages.map((msg, idx) => {
                        const hasExercises = msg.text.includes('[SHOW_EXERCISES]');
                        const hasGames = msg.text.includes('[SHOW_GAMES]');
                        const displayText = msg.text.replace('[SHOW_EXERCISES]', '').replace('[SHOW_GAMES]', '');

                        return (
                            <div key={idx} className="fade-in" style={{
                                marginBottom: '10px',
                                borderBottom: msg.role === 'user' ? '1px dashed rgba(0,0,0,0.1)' : 'none',
                                paddingBottom: msg.role === 'user' ? '10px' : '0'
                            }}>
                                {msg.role === 'aura' && (
                                    <div style={{
                                        fontFamily: 'var(--font-hand)',
                                        fontSize: '0.9rem',
                                        color: 'hsl(var(--primary))',
                                        marginBottom: '4px',
                                        opacity: 0.8
                                    }}>
                                        Aura ✨
                                    </div>
                                )}
                                <div style={{
                                    fontFamily: 'var(--font-body-hand)',
                                    fontSize: '1.3rem',
                                    lineHeight: '2.3rem',
                                    color: msg.role === 'user' ? 'hsl(var(--text-dark))' : 'hsl(var(--primary))',
                                    fontStyle: msg.role === 'aura' ? 'italic' : 'normal',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {displayText}
                                </div>

                                {/* Render Exercise Buttons if triggered */}
                                {hasExercises && onTriggerExercise && (
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                                        {[
                                            { id: 'breathing', label: '🌬️ Breathing', color: 'hsl(190, 80%, 40%)', bg: 'hsl(190, 80%, 95%)' },
                                            { id: 'grounding', label: '🧘 Grounding', color: 'hsl(150, 70%, 35%)', bg: 'hsl(150, 70%, 95%)' },
                                            { id: 'compassion', label: '💙 Compassion', color: 'hsl(210, 80%, 50%)', bg: 'hsl(210, 80%, 95%)' },
                                            { id: 'breakdown', label: '📝 Breakdown', color: 'hsl(30, 80%, 45%)', bg: 'hsl(30, 80%, 95%)' }
                                        ].map(btn => (
                                            <button
                                                key={btn.id}
                                                onClick={() => onTriggerExercise(btn.id)}
                                                style={{
                                                    padding: '8px 16px',
                                                    background: btn.bg,
                                                    color: btn.color,
                                                    border: `1px solid ${btn.color}`,
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.95rem',
                                                    fontWeight: '600',
                                                    transition: 'all 0.2s',
                                                    fontFamily: 'inherit'
                                                }}
                                                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                                                onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Render Game Buttons if triggered */}
                                {hasGames && onTriggerExercise && (
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                                        {[
                                            { id: 'bubble', label: '🫧 Bubbles', color: 'hsl(280, 70%, 50%)', bg: 'hsl(280, 70%, 95%)' },
                                            { id: 'focus', label: '🎯 Focus Tap', color: 'hsl(0, 70%, 55%)', bg: 'hsl(0, 70%, 95%)' },
                                            { id: 'color', label: '🎨 Color Slow', color: 'hsl(40, 90%, 40%)', bg: 'hsl(40, 90%, 95%)' }
                                        ].map(btn => (
                                            <button
                                                key={btn.id}
                                                onClick={() => onTriggerExercise(btn.id)}
                                                style={{
                                                    padding: '8px 16px',
                                                    background: btn.bg,
                                                    color: btn.color,
                                                    border: `1px solid ${btn.color}`,
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.95rem',
                                                    fontWeight: '600',
                                                    transition: 'all 0.2s',
                                                    fontFamily: 'inherit'
                                                }}
                                                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                                                onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* 2. Loading Indicator */}
                    {isThinking && (
                        <div style={{ padding: '10px 0' }}>
                            <div style={{
                                fontFamily: 'var(--font-hand)',
                                fontSize: '0.9rem',
                                color: 'hsl(var(--primary))',
                                marginBottom: '4px',
                                opacity: 0.8
                            }}>
                                Aura ✨
                            </div>
                            <span className="typing-dot">●</span>
                            <span className="typing-dot" style={{ animationDelay: '0.2s' }}>●</span>
                            <span className="typing-dot" style={{ animationDelay: '0.4s' }}>●</span>
                        </div>
                    )}

                    {/* 3. CARE MODE UI */}
                    {isCareMode && careStep === 'check_in' && (
                        <SafetyCheckInCard
                            onSafe={handleSafe}
                            onUnsure={handleUnsure}
                            onNeedHelp={handleNeedHelp}
                        />
                    )}


                    {/* Breathing Animation */}
                    {showBreathing && (
                        <CareBreathingAnimation onComplete={handleBreathingComplete} />
                    )}

                    {/* Continue Support: helpline + find help after breathing (unsure flow) */}
                    {careStep === 'continue_support' && (
                        <>
                            <HelplineButton />
                            <FindHelpNearMe />
                        </>
                    )}

                    {/* Need Help: helpline + find help directly */}
                    {careStep === 'need_help' && (
                        <>
                            <HelplineButton />
                            <FindHelpNearMe />
                        </>
                    )}


                    {/* Invisible anchor for scrolling */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area — plain flex child, pinned at bottom of panel */}
                <div style={{
                    flexShrink: 0,
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    paddingLeft: '50px',
                    paddingRight: '15px',
                    borderTop: '2px dashed var(--divider)',
                    background: 'hsl(var(--card-bg))'
                }}>
                    <div style={{ position: 'relative', height: '80px' }}>
                        <textarea
                            ref={textareaRef}
                            value={currentText}
                            onChange={(e) => setEntry(e.target.value)}
                            placeholder={todayMessages.length > 0 ? "Reply to Aura..." : "Write freely... I'm listening like a friend 💙"}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                background: 'transparent',
                                resize: 'none',
                                fontSize: '1.4rem',
                                fontFamily: 'var(--font-body-hand)',
                                lineHeight: '2.0rem',
                                color: 'hsl(var(--text-dark))',
                                padding: '10px 0',
                                outline: 'none',
                            }}
                            spellCheck="false"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAnalyze();
                                }
                            }}
                        />
                        <button
                            onClick={handleAnalyze}
                            disabled={!currentText.trim() && !isListening}
                            style={{
                                position: 'absolute',
                                right: '0',
                                bottom: '10px',
                                background: 'hsl(var(--primary))',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-soft)',
                                opacity: (!currentText.trim() && !isListening) ? 0.5 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            ✨
                        </button>
                        <Doodle type="scribble" color="#FFB7B2" style={{ position: 'absolute', bottom: '10px', right: '50px', width: '40px', opacity: 0.4, pointerEvents: 'none' }} />
                    </div>
                </div>
            </div>





            <style>{`
                .typing-dot {
                    animation: typing 1.4s infinite;
                    color: hsl(var(--primary));
                    margin: 0 2px;
                    display: inline-block;
                }
                @keyframes typing {
                    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
                    30% { opacity: 1; transform: translateY(-3px); }
                }
            `}</style>
        </div >
    );
});

export default InteractiveDiary;
