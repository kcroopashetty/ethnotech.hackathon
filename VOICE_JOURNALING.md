# Voice Journaling Feature

## Overview
Voice journaling allows users to speak their thoughts instead of typing, with real-time voice tone and pitch analysis for emotional context.

## Features

### 1. Speech-to-Text
- Click the microphone button (🎙️) to start recording
- Speak naturally - your words will be transcribed in real-time
- Click the stop button (⏹️) to finish recording
- Transcribed text appears in the journal entry field

### 2. Voice Emotion Analysis
- Real-time analysis of voice tone and pitch
- Detects emotional states:
  - **Calm**: Steady, moderate voice levels
  - **Stressed**: High intensity, elevated pitch
  - **Excited**: High frequency, energetic tone
  - **Sad**: Low frequency, subdued tone
- Displays emotion with confidence percentage

### 3. Multimodal Fusion
- Combines voice emotion with text sentiment analysis
- Enhanced accuracy by analyzing both what you say and how you say it
- Triggers alerts when voice and text both indicate distress

## How to Use

1. **Start Voice Journaling**
   - Click the microphone icon in the journal header
   - Grant microphone permissions when prompted

2. **Speak Your Thoughts**
   - Talk naturally about your day, feelings, or experiences
   - Watch the voice emotion indicator update in real-time

3. **Review & Analyze**
   - Your speech is automatically transcribed
   - Click "Analyze ✨" to get AI insights
   - Voice emotion data enhances the sentiment analysis

## Browser Compatibility

- **Speech Recognition**: Chrome, Edge, Safari (latest versions)
- **Audio Analysis**: All modern browsers with Web Audio API support

## Privacy

- All voice processing happens locally in your browser
- No audio is recorded or stored
- Only transcribed text is saved to your journal

## Technical Details

- Uses Web Speech API for speech-to-text
- Web Audio API for voice tone/pitch analysis
- Real-time frequency analysis (FFT) for emotion detection
- Confidence scoring based on audio intensity patterns
