// Friend-like diary responses based on mood & context
const responses = {
    sad: [
        "I'm really glad you told me this. Your feelings matter so much. 💙",
        "That sounds like a lot to carry. I'm here with you.",
        "You don't have to go through this alone. What would help you feel a little lighter?",
        "I hear you. It's okay to feel this way. What's one small thing that might bring comfort?"
    ],
    anxious: [
        "I can feel the weight of this. Let's take it one breath at a time. 🌬️",
        "You're safe right now. What's one thing you can control in this moment?",
        "That sounds overwhelming. What's the smallest step you could take?",
        "I'm here. Your worries are valid. What would ground you right now?"
    ],
    stress: [
        "That's a lot on your plate. What's one tiny thing you could do right now?",
        "I hear you. You're doing your best. What can wait until tomorrow?",
        "You're handling so much. What would help you feel a bit lighter?",
        "Take a breath. What's in your control right now?"
    ],
    happy: [
        "I love seeing you like this! What made today so good? ✨",
        "Your joy is beautiful! Hold onto this feeling.",
        "This is wonderful! What do you want to remember most about today?",
        "I'm so happy for you! What made you smile the biggest?"
    ],
    neutral: [
        "Thanks for sharing this with me. What's on your mind?",
        "I'm listening. What else are you noticing today?",
        "What's one thing you learned about yourself today?",
        "How are you really feeling right now?"
    ],
    calm: [
        "This peaceful energy is lovely. What's working well for you?",
        "I'm glad you're in this space. What are you grateful for?",
        "This sounds grounding. What's helping you feel this way?",
        "Beautiful. What do you want to carry forward from today?"
    ]
};

const exercises = {
    anxious: "Try this: Breathe in for 4s, hold for 4s, exhale for 4s. 🌬️",
    stress: "Suggestion: Set a timer for 5 mins and focus on just one thing. ⏱️",
    sad: "Gentle thought: Treat yourself with the same kindness you'd show a friend. 💙",
    happy: "Idea: Write down three things you're grateful for right now. 🌟"
};

// --- CARE MODE: Risk Detection ---
const riskKeywords = [
    'end it all', 'kill myself', 'want to die', 'no reason to live',
    'better off dead', 'can\'t go on', 'suicide', 'self harm', 'self-harm',
    'hurt myself', 'give up on life', 'no point in living', 'don\'t want to be here',
    'want to disappear', 'hopeless', 'nothing matters anymore', 'end my life'
];

export const detectRisk = (text) => {
    const lower = text.toLowerCase();
    return riskKeywords.some(keyword => lower.includes(keyword));
};

export const careResponses = [
    "I'm really glad you told me. You're not alone. 💙\nYour safety matters. Let's take this one small step at a time.",
    "Thank you for trusting me with this. What you're feeling is valid. 💙\nYou don't have to face this alone. Let's take a breath together.",
    "I hear you, and I'm here with you right now. 💙\nYour wellbeing matters more than anything. Let's slow down together."
];

// 4. Intent Detection to steer conversation
const detectIntent = (text) => {
    const lower = text.toLowerCase();

    // Off-topic / Factual / Entertainment requests
    const offTopicKeywords = ['joke', 'fact', 'weather', 'news', 'code', 'politics', 'sports', 'who are you', 'what are you'];
    if (offTopicKeywords.some(w => lower.includes(w))) return 'off_topic';

    // General activities (sharing an event without explicit emotion)
    const generalKeywords = ['watched', 'ate', 'went', 'played', 'read', 'cooked', 'saw', 'visited', 'bought'];
    if (generalKeywords.some(w => lower.includes(w))) return 'general_activity';

    return 'emotional';
};

// Start of generateAuraResponse
// eslint-disable-next-line no-unused-vars
export const generateAuraResponse = (text, mood, userContext, history = []) => {
    const intent = detectIntent(text);

    // Handle Off-topic
    if (intent === 'off_topic') {
        const offTopicResponses = [
            "I'm here mainly to support your reflections. Would you like to share how your day was?",
            "I'm focusing on your wellbeing right now. How are you feeling today?",
            "That's outside my journaling focus, but I'm all ears if you want to talk about how you're doing."
        ];
        return offTopicResponses[Math.floor(Math.random() * offTopicResponses.length)];
    }

    // Handle General Activity (Steer to emotion)
    if (intent === 'general_activity' && mood === 'neutral') {
        const generalResponses = [
            "That sounds interesting. How did it make you feel?",
            "Thanks for sharing. What was the best part of that experience?",
            "It's good to note these daily moments. Did that leave you feeling rested or energized?"
        ];
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    // 1. Empathy / Validation (Existing Logic)
    const moodResponses = responses[mood] || responses.neutral;
    let baseResponse = moodResponses[Math.floor(Math.random() * moodResponses.length)];

    // 2. Context Awareness (Simple injection if available)
    if (userContext) {
        const lowerContext = userContext.toLowerCase();
        if ((lowerContext.includes('student') || lowerContext.includes('study')) && (mood === 'stress' || mood === 'anxious')) {
            baseResponse += " School can be so demanding.";
        } else if (lowerContext.includes('work') && (mood === 'stress')) {
            baseResponse += " Work pressure is real.";
        }
    }

    // 3. Exercise Suggestion (Inline)
    if (exercises[mood]) {
        baseResponse += ` ${exercises[mood]}`;
    }

    return baseResponse;
};

// --- Storage Logic ---

export const getConversations = () => {
    return JSON.parse(localStorage.getItem('aura_journal_conversations') || '[]');
};

export const saveMessage = (role, text) => {
    const conversations = getConversations();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    let todayEntry = conversations.find(c => c.date === today);

    if (!todayEntry) {
        todayEntry = { date: today, messages: [] };
        conversations.unshift(todayEntry); // Add to beginning (newest first)
    }

    todayEntry.messages.push({ role, text, timestamp: new Date().toISOString() });

    // Store updated conversations
    localStorage.setItem('aura_journal_conversations', JSON.stringify(conversations));

    // Cleanup old entries
    cleanupOldConversations();
};

export const cleanupOldConversations = () => {
    const conversations = getConversations();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];

    const filtered = conversations.filter(c => c.date >= cutoffDate);

    if (filtered.length !== conversations.length) {
        localStorage.setItem('aura_journal_conversations', JSON.stringify(filtered));
    }
};

export const clearTodayConversation = () => {
    const conversations = getConversations();
    const today = new Date().toISOString().split('T')[0];
    const filtered = conversations.filter(c => c.date !== today);
    localStorage.setItem('aura_journal_conversations', JSON.stringify(filtered));
}
