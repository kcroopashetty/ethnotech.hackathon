import React, { useState, useEffect, useRef } from 'react';

const VoiceJournal = ({ onTranscript }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [voiceAnalysis, setVoiceAnalysis] = useState(null);
    const recognitionRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcriptPiece = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcriptPiece + ' ';
                } else {
                    interimTranscript += transcriptPiece;
                }
            }

            const fullTranscript = finalTranscript || interimTranscript;
            setTranscript(fullTranscript);
            if (finalTranscript) {
                onTranscript(fullTranscript);
            }
        };

        recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [onTranscript]);

    const analyzeVoice = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 2048;

            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            
            const analyze = () => {
                if (!isListening) return;
                
                analyserRef.current.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                const high = dataArray.slice(dataArray.length / 2).reduce((a, b) => a + b) / (dataArray.length / 2);
                
                let emotion = 'calm';
                if (average > 80) emotion = 'stressed';
                else if (high > 60) emotion = 'excited';
                else if (average < 30) emotion = 'sad';
                
                setVoiceAnalysis({ emotion, intensity: Math.round(average) });
                
                requestAnimationFrame(analyze);
            };
            
            analyze();
        } catch (err) {
            console.error('Microphone access error:', err);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            setIsListening(false);
        } else {
            setTranscript('');
            setVoiceAnalysis(null);
            recognitionRef.current?.start();
            analyzeVoice();
            setIsListening(true);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <button
                onClick={toggleListening}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isListening 
                        ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
                        : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    boxShadow: isListening ? '0 0 20px rgba(255, 107, 107, 0.5)' : 'var(--shadow-soft)',
                    transition: 'all 0.3s',
                    animation: isListening ? 'pulse 1.5s infinite' : 'none'
                }}
                title={isListening ? 'Stop Recording' : 'Start Voice Journal'}
            >
                {isListening ? '⏹️' : '🎤'}
            </button>
            
            {isListening && (
                <div style={{ 
                    fontSize: '0.85rem', 
                    color: 'hsl(var(--text-muted))',
                    textAlign: 'center'
                }}>
                    Listening...
                </div>
            )}

            {voiceAnalysis && (
                <div style={{
                    padding: '8px 16px',
                    background: 'rgba(205, 180, 219, 0.1)',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    color: 'hsl(var(--primary))',
                    fontWeight: '600'
                }}>
                    Voice: {voiceAnalysis.emotion} ({voiceAnalysis.intensity}%)
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
};

export default VoiceJournal;
