import { useState, useEffect, useRef } from 'react';

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [voiceEmotion, setVoiceEmotion] = useState(null);
    const recognitionRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);

    const [hasSupport, setHasSupport] = useState(false);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn("Browser does not support Speech Recognition");
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasSupport(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
            let currentTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                currentTranscript += event.results[i][0].transcript;
            }
            setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const analyzeVoiceTone = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 2048;

            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            const analyze = () => {
                if (!isListening) return;
                
                analyserRef.current.getByteFrequencyData(dataArray);
                
                const average = dataArray.reduce((a, b) => a + b) / bufferLength;
                const lowFreq = dataArray.slice(0, bufferLength / 4).reduce((a, b) => a + b) / (bufferLength / 4);
                const highFreq = dataArray.slice(bufferLength / 2).reduce((a, b) => a + b) / (bufferLength / 2);
                
                let emotion = 'calm';
                let confidence = 0;
                
                if (average > 80) {
                    emotion = 'stressed';
                    confidence = Math.min(average / 100, 1);
                } else if (highFreq > 60 && average > 50) {
                    emotion = 'excited';
                    confidence = Math.min(highFreq / 80, 1);
                } else if (lowFreq > 40 && average < 50) {
                    emotion = 'sad';
                    confidence = Math.min(lowFreq / 60, 1);
                } else if (average > 40 && average < 70) {
                    emotion = 'calm';
                    confidence = 0.7;
                }
                
                setVoiceEmotion({ 
                    emotion, 
                    intensity: Math.round(average),
                    confidence: Math.round(confidence * 100)
                });
                
                animationFrameRef.current = requestAnimationFrame(analyze);
            };
            
            analyze();
        } catch (err) {
            console.error('Microphone access error:', err);
        }
    };

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            setVoiceEmotion(null);
            recognitionRef.current.start();
            setIsListening(true);
            analyzeVoiceTone();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        }
    };

    const resetTranscript = () => {
        setTranscript('');
    };

    return {
        isListening,
        transcript,
        voiceEmotion,
        startListening,
        stopListening,
        resetTranscript,
        hasRecognitionSupport: hasSupport
    };
};

export default useSpeechRecognition;
