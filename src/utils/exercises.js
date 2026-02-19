// Exercise bank with 5+ exercises per mood
const exerciseBank = {
    sad: [
        "Write a self-compassion letter to yourself",
        "List 3 things you survived that were hard",
        "Write about someone who cares about you",
        "Describe a safe place in detail",
        "What would you tell a friend who feels like this?",
        "Write down 3 qualities you like about yourself",
        "Remember a time you felt proud of yourself"
    ],
    anxious: [
        "4-7-8 breathing for 2 minutes",
        "Name 5 things you can see",
        "Write worry → worst case → realistic case",
        "Break task into 3 tiny steps",
        "Clench and release muscle groups",
        "Ground yourself: 5 things you see, 4 you hear, 3 you touch",
        "Write down what you can control right now"
    ],
    stress: [
        "5-minute brain dump",
        "Do one tiny task only",
        "Stretch neck and shoulders",
        "Drink water and step away",
        "Write what is in your control vs not",
        "Set a timer for 5 minutes and do nothing",
        "List 3 things that can wait until tomorrow"
    ],
    happy: [
        "Write a gratitude note to future you",
        "Capture this moment in 3 sentences",
        "What made today good?",
        "Send a kind message to someone",
        "Save one happy memory",
        "Write down what you want to remember about today",
        "Share your joy with someone you love"
    ],
    neutral: [
        "One intention for the day",
        "Reflect: what did you learn today?",
        "Plan one small self-care action",
        "What are you avoiding?",
        "What gave you energy today?",
        "Write about something you're curious about",
        "Set one small goal for tomorrow"
    ],
    calm: [
        "Write about what's working well right now",
        "Plan something you're looking forward to",
        "Reflect on a recent win",
        "What are you grateful for in this moment?",
        "Write a kind note to yourself"
    ]
};

export const getExercise = (mood) => {
    const normalizedMood = mood.toLowerCase();
    const exercises = exerciseBank[normalizedMood] || exerciseBank.neutral;
    
    // Get used exercises from localStorage
    const storageKey = `used_exercises_${normalizedMood}`;
    const usedExercises = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Filter out used exercises
    let availableExercises = exercises.filter(ex => !usedExercises.includes(ex));
    
    // If all used, reset
    if (availableExercises.length === 0) {
        localStorage.removeItem(storageKey);
        availableExercises = exercises;
    }
    
    // Pick random from available
    const selected = availableExercises[Math.floor(Math.random() * availableExercises.length)];
    
    // Save to used list
    const updatedUsed = [...usedExercises, selected];
    localStorage.setItem(storageKey, JSON.stringify(updatedUsed));
    
    return selected;
};

export const markExerciseDone = (mood) => {
    // Exercise already marked as used when getExercise was called
    return true;
};
