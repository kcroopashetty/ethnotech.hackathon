/**
 * Multimodal Mood Cross-Verification Utility
 * Compares text sentiment and facial emotion to produce a combined insight.
 */

// Normalize mood labels between text and facial systems
const normalizeMood = (mood) => {
    if (!mood) return null;
    const map = {
        stress: 'stressed',
        stressed: 'stressed',
        sad: 'sad',
        happy: 'happy',
        anxious: 'anxious',
        calm: 'calm',
        neutral: 'neutral',
        angry: 'stressed',
        fear: 'anxious',
        surprise: 'neutral',
        disgusted: 'stressed'
    };
    return map[mood.toLowerCase()] || 'neutral';
};

// Mood emoji lookup
const moodEmojis = {
    happy: '😄',
    neutral: '😐',
    stressed: '😵',
    sad: '😔',
    anxious: '😰',
    calm: '😌'
};

// Categorize moods
const getMoodCategory = (mood) => {
    if (!mood) return null;
    const negative = ['sad', 'stressed', 'anxious'];
    const positive = ['happy', 'calm'];
    const normalized = normalizeMood(mood);
    if (negative.includes(normalized)) return 'negative';
    if (positive.includes(normalized)) return 'positive';
    return 'neutral';
};

/**
 * Get final mood insight by comparing text and facial moods.
 * Handles mixed emotions with special messages for edge cases.
 * @param {string|null} textMood - Dominant text mood
 * @param {string|null} faceMood - Detected facial mood
 * @returns {{ type: string, message?: string } | null}
 */
export const getFinalMoodInsight = (textMood, faceMood) => {
    // If no facial mood detected, return normal insight
    if (!faceMood) {
        return null;
    }

    const normText = normalizeMood(textMood);
    const normFace = normalizeMood(faceMood);

    // If both are null or same, return normal insight
    if (!normText || normText === normFace) {
        return null;
    }

    // Mixed emotion detected
    const textCat = getMoodCategory(normText);
    const faceCat = getMoodCategory(normFace);

    // Edge case: Negative text + Positive face (masking positive)
    if (textCat === 'negative' && faceCat === 'positive') {
        return {
            type: 'mixed',
            message: "You may be putting on a brave face. Your feelings still matter — what you wrote deserves attention. 💙"
        };
    }

    // Edge case: Positive text + Negative face (tired or low)
    if (textCat === 'positive' && faceCat === 'negative') {
        return {
            type: 'mixed',
            message: "You sound okay, but your expression suggests you may be tired or low. It's okay to acknowledge both — the words and the feelings. 🌿"
        };
    }

    // General mixed emotion
    return {
        type: 'mixed',
        message: "Your words and expressions seem different. You might be masking how you feel. Take a gentle moment to check in with yourself. 🧭"
    };
};


/**
 * Cross-verify text mood against facial mood.
 * @param {string|null} textMood - Dominant text mood (e.g. 'happy', 'sad', 'stress')
 * @param {string|null} facialMood - Detected facial mood label (e.g. 'happy', 'neutral')
 * @returns {{ status, label, textMood, facialMood, textEmoji, facialEmoji, combinedMood }}
 */
export const crossVerifyMoods = (textMood, facialMood) => {
    const normText = normalizeMood(textMood);
    const normFace = normalizeMood(facialMood);

    // Case C: Only text available
    if (normText && !normFace) {
        return {
            status: 'text_only',
            label: null,
            textMood: normText,
            facialMood: null,
            textEmoji: moodEmojis[normText] || '✨',
            facialEmoji: null,
            combinedMood: normText
        };
    }

    // Case D: Only facial available
    if (!normText && normFace) {
        return {
            status: 'facial_only',
            label: null,
            textMood: null,
            facialMood: normFace,
            textEmoji: null,
            facialEmoji: moodEmojis[normFace] || '✨',
            combinedMood: normFace
        };
    }

    // Neither available
    if (!normText && !normFace) {
        return { status: 'none', label: null, textMood: null, facialMood: null, combinedMood: null };
    }

    // Both available — compare
    const aligned = normText === normFace;

    return {
        status: aligned ? 'aligned' : 'mismatch',
        label: aligned ? '✔ Mood Aligned' : '⚠ Mixed Signals',
        textMood: normText,
        facialMood: normFace,
        textEmoji: moodEmojis[normText] || '✨',
        facialEmoji: moodEmojis[normFace] || '✨',
        combinedMood: normText // text takes priority for storage
    };
};

/**
 * Generate a gentle combined insight message based on the cross-verification result.
 */
export const generateCombinedInsight = (status, textMood, facialMood) => {
    if (status === 'text_only') return null; // Normal flow — no extra insight needed
    if (status === 'facial_only') return "Detected mood from your expression. You can write to confirm how you're feeling.";
    if (status === 'none') return null;

    if (status === 'aligned') {
        const alignedMessages = {
            happy: "Your words and expressions both reflect positivity. That's wonderful — keep nurturing that energy! 🌟",
            sad: "Your writing and expression both suggest you're carrying something heavy. It's okay to feel this way. 💙",
            stressed: "Both your words and expression show tension. A short pause or breathing exercise might help you reset. 🌿",
            anxious: "Your words and expression both reflect unease. Grounding yourself with a slow breath can make a difference. 🍃",
            calm: "Your words and expressions seem peacefully aligned. Hold onto this tranquility. 🕊️",
            neutral: "Your words and expressions seem consistent. A steady state is a good place to reflect from."
        };
        return alignedMessages[normalizeMood(textMood)] || "Your words and expressions seem consistent.";
    }

    // Mismatch — tailored insights for common pairings
    const t = normalizeMood(textMood);
    const f = normalizeMood(facialMood);

    const mismatchInsights = {
        'anxious_neutral': "You may be holding tension internally even if it's not visible. A short grounding exercise might help.",
        'sad_neutral': "Your words carry weight, but your expression isn't showing it. Sometimes we hold pain quietly — and that's okay to acknowledge.",
        'stressed_neutral': "You're describing pressure, but your face appears calm. You might be coping well, or holding it in. Check in with yourself gently.",
        'stressed_happy': "You wrote about stress, but your expression looks positive. Perhaps you're finding resilience even in difficulty — that's strength.",
        'sad_happy': "Your writing suggests sadness, but your expression tells a different story. It's okay if your feelings are complex — they often are.",
        'happy_sad': "Your words are uplifting, but your expression seems heavier. Sometimes we write what we wish we felt. There's no pressure to match.",
        'happy_stressed': "You're writing positively, but your face shows some tension. Check if something beneath the surface needs attention.",
        'happy_anxious': "Your words are bright, but your expression hints at worry. It's okay to hold both feelings at once.",
        'anxious_happy': "You described worry, but your expression looks lighter. Maybe things aren't as overwhelming as they seem. 🌿",
        'calm_stressed': "Your words reflect peace, but your expression shows some tension. A quiet moment of breathing could help bridge the gap.",
        'calm_anxious': "You wrote about feeling calm, but your face suggests some unease. Gently check in with how your body feels right now.",
        'neutral_sad': "Your writing feels measured, but your expression carries emotion. It's okay to let your feelings come through in words too.",
        'neutral_stressed': "Your words are steady, but your expression reflects some pressure. Writing more about what's on your mind might help."
    };

    const key = `${t}_${f}`;
    return mismatchInsights[key]
        || "Your writing and expression suggest different feelings. You might be masking something. Would you like to explore it?";
};

