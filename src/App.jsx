import React, { useState, useEffect } from 'react';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import JournalInterface from './components/JournalInterface';
import InteractiveDiary from './components/InteractiveDiary';
import AIInsight from './components/AIInsight';
import MoodDashboard from './components/MoodDashboard';
import Interventions from './components/Interventions';
import BreathingExercise from './components/BreathingExercise';
import PanicButton from './components/PanicButton';
import AuraControlPanel from './components/AuraControlPanel';
import FacialMoodCapture from './components/FacialMoodCapture';
import Doodle from './components/Doodle';
import Onboarding from './components/Onboarding';
import ActivityModal from './components/activities/ActivityModal';
import { analyzeSentiment } from './utils/sentiment';
import { crossVerifyMoods, generateCombinedInsight, getFinalMoodInsight } from './utils/moodCrossVerify';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// --- Protected Routes ---
const ProtectedRoute = ({ children, currentUser, requireContext = false }) => {
    if (!currentUser) return <Navigate to="/login" replace />;
    if (requireContext && !currentUser?.userContext) return <Navigate to="/context" replace />;
    return children;
};

function App() {
    // Auth State
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('aura_users');
        return saved ? JSON.parse(saved) : {};
    });
    const [currentUserEmail, setCurrentUserEmail] = useState(() => {
        return localStorage.getItem('aura_currentUser') || null;
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Application State (Derived from current user)
    const currentUser = currentUserEmail ? users[currentUserEmail] : null;

    // UI State
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const [showBreathing, setShowBreathing] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [facialMood, setFacialMood] = useState(null);
    const [fusionLabel, setFusionLabel] = useState("");
    const [diaryMode, setDiaryMode] = useState('interactive'); // 'interactive' or 'classic'

    // --- Persist Users & Session ---
    useEffect(() => {
        localStorage.setItem('aura_users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUserEmail) {
            localStorage.setItem('aura_currentUser', currentUserEmail);
        } else {
            localStorage.removeItem('aura_currentUser');
        }
    }, [currentUserEmail]);


    // --- Auth Handlers ---
    const handleSignup = (email, password, name) => {
        if (users[email]) {
            return "User already exists";
        }
        const newUser = {
            email,
            password,
            name,
            moodHistory: [],
            journalEntries: [],
            streak: 0,
            lastEntryDate: null,
            gratitudeNotes: [],
            selfCompassionNotes: []
        };
        setUsers(prev => ({ ...prev, [email]: newUser }));
        setCurrentUserEmail(email);
        navigate('/context');
        return null;
    };

    const handleLogin = (email, password) => {
        if (users[email] && users[email].password === password) {
            setCurrentUserEmail(email);
            if (!users[email].userContext) {
                navigate('/context');
            } else {
                navigate('/journal');
            }
            return null;
        }
        return "Invalid email or password";
    };

    const handleLogout = () => {
        setCurrentUserEmail(null);
        navigate('/');
    };

    // --- Data Management Helpers ---
    const updateUserState = (updates) => {
        if (!currentUserEmail) return;
        setUsers(prev => ({
            ...prev,
            [currentUserEmail]: { ...prev[currentUserEmail], ...updates }
        }));
    };

    // --- Core Logic ---
    const generateResponse = (result) => {
        if (result.dominant === 'stress') return "I hear that you're feeling stressed. That sounds really heavy. Remember to take it one step at a time.";
        if (result.dominant === 'sad') return "I'm sorry you're feeling down. I'm here for you. Be gentle with yourself today.";
        if (result.dominant === 'happy') return "That's wonderful! I'm so glad to hear you're feeling good. Hold onto that feeling!";
        if (result.dominant === 'calm') return "It sounds like you're in a good headspace. Peaceful moments are so valuable.";
        return "Thank you for sharing. Writing it out is the first step.";
    };

    const handleAnalyzeEntry = (text, voiceEmotion = null) => {
        setIsAnalyzing(true);
        setCurrentAnalysis(null);
        setFusionLabel("");

        // Simulate AI analysis delay
        setTimeout(() => {
            let result;
            const lowerText = text.toLowerCase();
            const gameIntents = ['game', 'play', 'activity', 'distraction', 'calm game'];
            const isGameRequested = gameIntents.some(intent => lowerText.includes(intent));

            if (text.trim()) {
                result = analyzeSentiment(text, voiceEmotion);

                if (isGameRequested) {
                    result.response = "Here’s a 1-minute calming activity. Ready?";
                    result.isGameRequested = true;
                } else {
                    result.response = generateResponse(result);
                }

                result = { ...result, voiceEmotion };
            } else if (facialMood) {
                // Facial-only analysis
                result = {
                    dominant: facialMood.label,
                    scores: { [facialMood.label]: 0.8 },
                    response: facialMood.label === 'happy'
                        ? "Your smile is contagious! It's wonderful that you're feeling good."
                        : "I noticed you're looking a bit " + facialMood.label + ". Remember that I'm here for you.",
                    isFacialOnly: true
                };
            } else {
                setIsAnalyzing(false);
                return;
            }

            // --- Multimodal Mood Cross-Verification ---
            const crossResult = crossVerifyMoods(
                text.trim() ? result.dominant : null,
                facialMood ? facialMood.label : null
            );
            const combinedInsight = generateCombinedInsight(
                crossResult.status,
                result.dominant,
                facialMood ? facialMood.label : null
            );
            result.crossVerification = {
                ...crossResult,
                combinedInsight
            };

            // --- Mixed Emotion Detection ---
            const mixedMoodInsight = getFinalMoodInsight(
                text.trim() ? result.dominant : null,
                facialMood ? facialMood.label : null
            );
            if (mixedMoodInsight) {
                result.mixedMoodInsight = mixedMoodInsight;
            }

            // Set fusion label from cross-verification
            if (crossResult.status === 'mismatch') {
                setFusionLabel(crossResult.label);
            } else if (crossResult.status === 'aligned' && facialMood) {
                setFusionLabel(crossResult.label);
            }

            // Voice + Text fusion (additional signal)
            const negativeMoods = ['stress', 'sad', 'anxious'];
            if (voiceEmotion && text.trim()) {
                const voiceNegative = ['stressed', 'sad'].includes(voiceEmotion.emotion);
                if (negativeMoods.includes(result.dominant) && voiceNegative) {
                    setFusionLabel("Voice & text indicate distress");
                }
            }

            setCurrentAnalysis(result);
            setIsAnalyzing(false);

            if (result.dominant !== 'neutral') {
                const newMoodEntry = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    mood: result.dominant,
                    scores: result.scores
                };

                // Update specific user data
                const updatedHistory = [newMoodEntry, ...(currentUser.moodHistory || [])];

                // Streak Logic
                const today = new Date().toLocaleDateString();
                const lastEntry = currentUser.lastEntryDate;
                let newStreak = currentUser.streak || 0;

                if (lastEntry !== today) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    if (lastEntry === yesterday.toLocaleDateString()) {
                        newStreak++;
                    } else {
                        newStreak = 1;
                    }
                }

                updateUserState({
                    moodHistory: updatedHistory,
                    streak: newStreak,
                    lastEntryDate: today
                });
            }
        }, 2000);
    };

    const handleSaveGratitude = (note) => {
        if (!currentUser) return;
        const updatedNotes = [
            { id: Date.now(), text: note, date: new Date().toISOString() },
            ...(currentUser.gratitudeNotes || [])
        ];
        updateUserState({ gratitudeNotes: updatedNotes });
    };

    const handleSaveSelfCompassionNote = (text) => {
        if (!currentUser) return;
        const today = new Date().toLocaleDateString();
        const notes = currentUser.selfCompassionNotes || [];

        let updatedNotes;
        const todayIndex = notes.findIndex(n => new Date(n.date).toLocaleDateString() === today);

        if (todayIndex !== -1) {
            updatedNotes = [...notes];
            updatedNotes[todayIndex] = { ...updatedNotes[todayIndex], text, date: new Date().toISOString() };
        } else {
            updatedNotes = [{ id: Date.now(), text, date: new Date().toISOString() }, ...notes];
        }

        updateUserState({ selfCompassionNotes: updatedNotes });
    };

    const handleExerciseComplete = () => {
        if (!currentUser || !currentUser.moodHistory || currentUser.moodHistory.length === 0) return;

        const updatedHistory = [...currentUser.moodHistory];
        updatedHistory[0] = { ...updatedHistory[0], game_completed: true };

        updateUserState({ moodHistory: updatedHistory });
    };

    const handleOnboardingComplete = (context) => {
        updateUserState({ userContext: context });
        navigate('/journal');
    };

    return (
        <Routes>
            <Route path="/" element={<WelcomePage onStart={() => navigate('/login')} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} onSignup={handleSignup} />} />
            <Route
                path="/context"
                element={
                    <ProtectedRoute currentUser={currentUser}>
                        <Onboarding onComplete={handleOnboardingComplete} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/journal"
                element={
                    <ProtectedRoute currentUser={currentUser} requireContext={true}>
                        <DashboardContent
                            currentUser={currentUser}
                            onLogout={handleLogout}
                            currentAnalysis={currentAnalysis}
                            isAnalyzing={isAnalyzing}
                            facialMood={facialMood}
                            setFacialMood={setFacialMood}
                            fusionLabel={fusionLabel}
                            handleAnalyzeEntry={handleAnalyzeEntry}
                            showBreathing={showBreathing}
                            setShowBreathing={setShowBreathing}
                            onSaveGratitude={handleSaveGratitude}
                            onSaveSelfCompassionNote={handleSaveSelfCompassionNote}
                            onExerciseComplete={handleExerciseComplete}
                            diaryMode={diaryMode}
                            setDiaryMode={setDiaryMode}
                        />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

// Sub-component for Dashboard to keep App.jsx clean
const DashboardContent = ({
    currentUser, onLogout,
    currentAnalysis, isAnalyzing, facialMood, setFacialMood,
    fusionLabel, handleAnalyzeEntry, showBreathing, setShowBreathing,
    onSaveGratitude, onSaveSelfCompassionNote, onExerciseComplete, diaryMode, setDiaryMode
}) => {
    const navigate = useNavigate();
    const [showControlPanel, setShowControlPanel] = useState(false);
    const [activeActivity, setActiveActivity] = useState(null);

    const handleTriggerExercise = (exerciseId) => {
        // Map exercise IDs to activity IDs
        const activityMap = {
            'breathing': 'breathing',
            'grounding': 'grounding',
            'compassion': 'compassion',
            'breakdown': 'breakdown',
            'bubble': 'bubble',
            'focus': 'focus',
            'color': 'color'
        };

        const activityId = activityMap[exerciseId];
        if (activityId) {
            setActiveActivity(activityId);
        }
    };

    return (
        <div className="app-container fade-in" style={{
            padding: '40px 20px',
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <header className="header-glass" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Welcome, {currentUser.name}</h1>
                        {currentUser.userContext && (
                            <span
                                onClick={() => navigate('/context')}
                                style={{
                                    fontSize: '0.75rem',
                                    background: 'rgba(205, 180, 219, 0.2)',
                                    color: 'hsl(var(--primary))',
                                    padding: '4px 12px',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    border: '1px solid hsl(var(--primary) / 0.1)',
                                    transition: 'all 0.2s'
                                }}
                                title="Click to edit your context"
                            >
                                {currentUser.userContext} ✏️
                            </span>
                        )}
                    </div>
                    <p style={{ color: 'hsl(var(--text-muted))', margin: 0 }}>
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    {/* Diary Mode Toggle */}
                    <button
                        onClick={() => setDiaryMode(prev => prev === 'interactive' ? 'classic' : 'interactive')}
                        style={{
                            fontSize: '1rem',
                            padding: '8px 16px',
                            background: 'hsl(var(--card-bg))',
                            borderRadius: '20px',
                            boxShadow: 'var(--shadow-soft)',
                            border: '1px solid var(--divider)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            color: 'hsl(var(--primary))'
                        }}
                        title={diaryMode === 'interactive' ? 'Switch to Classic Journal' : 'Switch to Interactive Diary'}
                    >
                        {diaryMode === 'interactive' ? '💬' : '📖'}
                    </button>

                    {/* Aura Controls Button */}
                    <button
                        onClick={() => setShowControlPanel(true)}
                        style={{
                            fontSize: '0.9rem',
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, rgba(205, 180, 219, 0.2), rgba(162, 210, 255, 0.2))',
                            borderRadius: '20px',
                            boxShadow: 'var(--shadow-soft)',
                            border: '1px solid hsl(var(--primary) / 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            color: 'hsl(var(--primary))',
                            transition: 'all 0.2s'
                        }}
                        title="Manage your journal, exercises, and data"
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(205, 180, 219, 0.4)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                        }}
                    >
                        ⚙️ Controls
                    </button>

                    <div style={{
                        background: 'hsl(var(--card-white))',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        boxShadow: 'var(--shadow-soft)',
                        fontWeight: '600',
                        color: 'hsl(var(--secondary))'
                    }}>
                        🔥 {currentUser.streak || 0} Days
                    </div>
                    {/* Removed Logout button from header. Items are now aligned right with equal spacing. */}
                </div>
            </header>

            {/* Main "Open Book" Layout */}
            <main style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'stretch',
                minHeight: '500px'
            }}>
                {/* Left Page (Journal) */}
                <section>
                    {showBreathing ? (
                        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <BreathingExercise onClose={() => {
                                setShowBreathing(false);
                            }} />
                        </div>
                    ) : diaryMode === 'interactive' ? (
                        <InteractiveDiary
                            onAnalyze={handleAnalyzeEntry}
                            userContext={currentUser.userContext}
                        />
                    ) : (
                        <JournalInterface onAnalyze={handleAnalyzeEntry} />
                    )}
                </section>

                {/* Right Page (Insight & History) */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Multimodal Card */}
                    <div className="fade-in">
                        <FacialMoodCapture
                            facialMood={facialMood}
                            onMoodDetected={(mood) => setFacialMood(mood)}
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <AIInsight
                            sentiment={currentAnalysis}
                            isAnalyzing={isAnalyzing}
                            fusionLabel={fusionLabel}
                            facialMood={facialMood}
                            onTriggerIntervention={() => setShowBreathing(true)}
                            onSaveGratitude={onSaveGratitude}
                            onSaveSelfCompassionNote={onSaveSelfCompassionNote}
                            onExerciseComplete={onExerciseComplete}
                        />
                    </div>

                    {/* Mini Dashboard */}
                    <div style={{ height: '300px' }}>
                        <MoodDashboard history={currentUser.moodHistory || []} />
                    </div>
                </aside>
            </main>

            {/* Decorative Doodles */}
            <Doodle type="sun" color="#FFDAC1" style={{ position: 'fixed', top: '50px', left: '50px', width: '60px', zIndex: -1, opacity: 0.5 }} />
            <Doodle type="flower" color="#B5EAD7" style={{ position: 'fixed', bottom: '100px', left: '100px', width: '50px', zIndex: -1, opacity: 0.5 }} />
            <Doodle type="star" color="#C7CEEA" style={{ position: 'fixed', top: '150px', right: '100px', width: '40px', zIndex: -1, opacity: 0.5 }} />
            <Doodle type="heart" color="#FF9AA2" style={{ position: 'fixed', bottom: '50px', right: '50px', width: '50px', zIndex: -1, opacity: 0.5 }} />

            {/* Footer */}
            <footer style={{ marginTop: '60px', textAlign: 'center', color: 'hsl(var(--text-muted))', fontSize: '0.8rem', fontFamily: 'var(--font-body-hand)' }}>
                <p>Made with ❤️ for your mind. Not a medical tool.</p>
            </footer>

            <PanicButton onOpenControlPanel={() => setShowControlPanel(true)} />

            <AuraControlPanel
                isOpen={showControlPanel}
                onClose={() => setShowControlPanel(false)}
                onLogout={onLogout}
                onTriggerExercise={handleTriggerExercise}
                currentUser={currentUser}
            />

            {/* Activity Modal */}
            <ActivityModal
                activeActivity={activeActivity}
                onClose={() => setActiveActivity(null)}
            />

            {/* Mobile Responsive */}
            <style>{`
        @media (max-width: 900px) {
          main {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}

export default App;
