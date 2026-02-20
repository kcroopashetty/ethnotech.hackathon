/**
 * safeStorage — Production-ready wrapper for localStorage.
 * Handles missing localStorage (incognito/private mode) and malformed JSON.
 */

export const safeGet = (key, defaultValue = null) => {
    try {
        const value = localStorage.getItem(key);
        if (value === null) return defaultValue;
        return JSON.parse(value);
    } catch (error) {
        console.error(`Error reading from localStorage [${key}]:`, error);
        return defaultValue;
    }
};

export const safeSet = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to localStorage [${key}]:`, error);
        return false;
    }
};

export const safeRemove = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage [${key}]:`, error);
        return false;
    }
};
