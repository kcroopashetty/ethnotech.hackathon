import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from '@vladmandic/face-api';

const FacialMoodCapture = ({ onMoodDetected, facialMood }) => {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [localMood, setLocalMood] = useState(facialMood);
    const [cameraError, setCameraError] = useState(null);
    const videoRef = useRef(null);

    const moodMap = {
        happy: { label: 'Happy', emoji: '😄' },
        neutral: { label: 'Neutral', emoji: '😐' },
        sad: { label: 'Sad', emoji: '😔' },
        angry: { label: 'Stressed', emoji: '😵' },
        fear: { label: 'Anxious', emoji: '😰' },
        surprise: { label: 'Neutral', emoji: '😐' },
        disgusted: { label: 'Stressed', emoji: '😵' }
    };



    const startCamera = async () => {
        setCameraError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setCameraError("Camera unavailable on this device");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraActive(false);
        }
    };

    const captureMood = async () => {
        if (!videoRef.current) return;

        const detections = await faceapi.detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceExpressions();

        if (detections && detections.expressions) {
            // Find dominant emotion
            const expressions = detections.expressions;
            const dominant = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);

            const mood = moodMap[dominant] || moodMap.neutral;
            const detectedMood = {
                emotion: dominant,
                label: mood.label.toLowerCase(),
                emoji: mood.emoji
            };

            setLocalMood(detectedMood);
            onMoodDetected(detectedMood);
            stopCamera();
        } else {
            alert("Could not detect any face. Please try again.");
        }
    };

    useEffect(() => {
        const loadModels = async () => {
            setIsModelLoading(true);
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceExpressionNet.loadFromUri('/models');
            } catch (error) {
                console.error("Error loading face models:", error);
            }
            setIsModelLoading(false);
        };
        loadModels();
        return () => stopCamera();
    }, []);

    return (
        <div className="card facial-mood-card" style={{
            padding: '15px',
            marginBottom: '20px',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: '600', color: 'hsl(var(--primary))' }}>
                Capture Facial Mood (Optional)
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Use your camera to detect your current mood. Image is processed locally and not stored.
            </p>

            <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#000', height: isCameraActive ? '200px' : '0', transition: 'height 0.3s' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    onCanPlay={() => videoRef.current.play()}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                {!isCameraActive ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                            onClick={startCamera}
                            disabled={isModelLoading || cameraError}
                            className="btn-secondary"
                            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem' }}
                        >
                            {isModelLoading ? '⏳ Loading Models...' : '📷 Start Camera'}
                        </button>
                        {cameraError && (
                            <small style={{ color: '#ff4d4d', fontSize: '0.75rem' }}>{cameraError}</small>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                            onClick={captureMood}
                            className="btn-primary"
                            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem', background: '#CDB4DB', border: 'none' }}
                        >
                            🎯 Capture Mood
                        </button>
                        <button
                            onClick={stopCamera}
                            className="btn-secondary"
                            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '0.85rem' }}
                        >
                            Cancel
                        </button>
                    </>
                )}

                {localMood && (
                    <div style={{
                        marginLeft: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'white',
                        padding: '6px 12px',
                        borderRadius: '50px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                        border: '1px solid #eee'
                    }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#555' }}>Detected:</span>
                        <span className="mood-badge" style={{
                            padding: '4px 10px',
                            fontSize: '0.8rem',
                            textTransform: 'capitalize'
                        }}>
                            {localMood.emoji} {localMood.label}
                        </span>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    Your image is processed locally for emotion detection and is not saved.
                </small>
            </div>
        </div>
    );
};

export default FacialMoodCapture;
