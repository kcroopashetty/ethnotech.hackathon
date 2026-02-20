/**
 * Safe Feature Utilities — v1
 * All functions are try/catch wrapped and fail silently.
 * All use localStorage only, read-only to existing moodHistory.
 */

// ========================================
// FEATURE 1 — Positive Reflection Memory
// ========================================

const GRATITUDE_KEYWORDS = ['grateful', 'thankful', 'proud', 'achieved', 'win', 'happy about'];

export function savePositiveMemory(text) {
    try {
        if (!text || typeof text !== 'string') return;
        const lower = text.toLowerCase();
        const hasGratitude = GRATITUDE_KEYWORDS.some(kw => lower.includes(kw));
        if (!hasGratitude) return;

        const stored = localStorage.getItem('positiveMemory_v1');
        const memories = stored ? JSON.parse(stored) : [];

        memories.push({
            date: new Date().toISOString(),
            text: text.slice(0, 300) // cap length
        });

        // Keep only last 20
        const trimmed = memories.slice(-20);
        localStorage.setItem('positiveMemory_v1', JSON.stringify(trimmed));
    } catch {
        // fail silently
    }
}

export function getRandomPositiveMemories(count = 3) {
    try {
        const stored = localStorage.getItem('positiveMemory_v1');
        if (!stored) return [];
        const memories = JSON.parse(stored);
        if (!Array.isArray(memories) || memories.length === 0) return [];

        // Shuffle and pick up to `count`
        const shuffled = [...memories].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    } catch (e) {
        return [];
    }
}

// ========================================
// FEATURE 2 — Emotional Recovery Time
// ========================================

const NEGATIVE_MOODS = ['sad', 'anxious', 'stressed', 'stress', 'angry'];

export function computeRecoveryDays(moodHistory) {
    try {
        if (!Array.isArray(moodHistory) || moodHistory.length < 2) return null;

        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        // Filter to last 14 days, sort oldest first
        const recent = moodHistory
            .filter(e => e && e.date && new Date(e.date).getTime() >= fourteenDaysAgo.getTime())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (recent.length < 2) return null;

        // Find last negative followed by first non-negative
        let lastNegativeDate = null;
        let firstRecoveryDate = null;

        for (let i = recent.length - 1; i >= 0; i--) {
            const mood = recent[i].mood === 'stress' ? 'stressed' : recent[i].mood;
            if (!NEGATIVE_MOODS.includes(mood) && lastNegativeDate) {
                firstRecoveryDate = new Date(recent[i].date);
                break;
            }
            if (NEGATIVE_MOODS.includes(mood) && !lastNegativeDate) {
                lastNegativeDate = new Date(recent[i].date);
            }
        }

        // Try forward scan: find last negative, then first non-negative AFTER it
        lastNegativeDate = null;
        firstRecoveryDate = null;
        for (let i = 0; i < recent.length; i++) {
            const mood = recent[i].mood === 'stress' ? 'stressed' : recent[i].mood;
            if (NEGATIVE_MOODS.includes(mood)) {
                lastNegativeDate = new Date(recent[i].date);
                firstRecoveryDate = null; // reset
            } else if (lastNegativeDate && !firstRecoveryDate) {
                firstRecoveryDate = new Date(recent[i].date);
            }
        }

        if (!lastNegativeDate || !firstRecoveryDate) return null;

        const diffMs = firstRecoveryDate.getTime() - lastNegativeDate.getTime();
        const diffDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));

        localStorage.setItem('lastRecoveryDays_v1', JSON.stringify(diffDays));
        return diffDays;
    } catch (e) {
        return null;
    }
}

export function getStoredRecoveryDays() {
    try {
        const stored = localStorage.getItem('lastRecoveryDays_v1');
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
}

// ========================================
// FEATURE 3 — Weekly AI Summary (Template)
// ========================================

function getCurrentWeekId() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
    const weekNum = Math.ceil((dayOfYear + 1) / 7);
    return `${now.getFullYear()}-W${weekNum}`;
}

export function computeWeeklySummary(moodHistory) {
    try {
        if (!Array.isArray(moodHistory)) return null;

        const currentWeekId = getCurrentWeekId();

        // Check if already shown this week
        const lastShown = localStorage.getItem('lastWeeklySummaryDate_v1');
        if (lastShown === currentWeekId) return null;

        // Filter to last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentEntries = moodHistory.filter(e =>
            e && e.date && new Date(e.date).getTime() >= sevenDaysAgo.getTime()
        );

        if (recentEntries.length < 7) return null;

        // Count moods
        let happyDays = 0;
        let negativeDays = 0;
        let exercisesCompleted = 0;
        const moodCounts = {};

        recentEntries.forEach(entry => {
            const mood = entry.mood === 'stress' ? 'stressed' : entry.mood;
            moodCounts[mood] = (moodCounts[mood] || 0) + 1;

            if (mood === 'happy') happyDays++;
            if (NEGATIVE_MOODS.includes(mood)) negativeDays++;
            if (entry.game_completed) exercisesCompleted++;
        });

        // Find most common mood
        let mostCommonMood = 'neutral';
        let maxCount = 0;
        for (const mood in moodCounts) {
            if (moodCounts[mood] > maxCount) {
                maxCount = moodCounts[mood];
                mostCommonMood = mood;
            }
        }

        // Save week ID
        localStorage.setItem('lastWeeklySummaryDate_v1', currentWeekId);

        return {
            happyDays,
            negativeDays,
            mostCommonMood,
            exercisesCompleted,
            totalEntries: recentEntries.length
        };
    } catch (e) {
        return null;
    }
}

// ========================================
// FEATURE 4 — Night Mode Intervention
// ========================================

export function checkNightIntervention(textMood) {
    try {
        if (!textMood) return false;

        const hour = new Date().getHours();
        if (hour < 23) return false;

        const negativeMoods = ['sad', 'anxious', 'stressed', 'stress', 'angry'];
        const normalizedMood = textMood === 'stress' ? 'stressed' : textMood;
        if (!negativeMoods.includes(normalizedMood)) return false;

        const today = new Date().toLocaleDateString();
        const lastShown = localStorage.getItem('nightInterventionDate_v1');
        if (lastShown === today) return false;

        // Mark as shown for today
        localStorage.setItem('nightInterventionDate_v1', today);
        return true;
    } catch (e) {
        return false;
    }
}
