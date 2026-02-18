// Basic local sentiment analysis (keyword-based)

const keywords = {
  stress: ['stress', 'overwhelmed', 'deadline', 'exam', 'fail', 'pressure', 'burnout', 'busy', 'workload', 'burdened'],
  anxious: ['anxious', 'worried', 'panic', 'nervous', 'scared', 'dread', 'fret', 'uneasy', 'tense', 'apprehensive'],
  calm: ['relax', 'peace', 'calm', 'breathe', 'meditate', 'quiet', 'sleep', 'rest', 'serene', 'tranquil'],
  sad: ['sad', 'depressed', 'lonely', 'cry', 'hopeless', 'tired', 'exhausted', 'gloomy', 'miserable', 'heartbroken'],
  happy: ['happy', 'joy', 'excited', 'good', 'great', 'love', 'proud', 'accomplished', 'wonderful', 'fantastic']
};

export const analyzeSentiment = (text, voiceEmotion = null) => {
  const lowerText = text.toLowerCase();
  const scores = {
    stress: 0,
    anxious: 0,
    calm: 0,
    sad: 0,
    happy: 0
  };

  Object.keys(keywords).forEach(category => {
    keywords[category].forEach(word => {
      if (lowerText.includes(word)) {
        scores[category]++;
      }
    });
  });

  // Incorporate voice emotion if available
  if (voiceEmotion && voiceEmotion.emotion) {
    const voiceWeight = voiceEmotion.confidence / 100 || 0.5;
    const emotionMap = {
      'stressed': 'stress',
      'excited': 'happy',
      'sad': 'sad',
      'calm': 'calm'
    };

    const mappedEmotion = emotionMap[voiceEmotion.emotion];
    if (mappedEmotion && scores[mappedEmotion] !== undefined) {
      scores[mappedEmotion] += voiceWeight * 2;
    }
  }

  // Calculate dominant emotion
  let dominant = 'neutral';
  let maxScore = 0;

  Object.entries(scores).forEach(([emotion, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominant = emotion;
    }
  });

  // Simple logic to determine if intervention is needed
  // If stress, sad, or anxious score is high, recommend intervention
  const criticalMoods = scores.stress + scores.sad + scores.anxious;
  const positiveMoods = scores.happy + scores.calm;
  const needsIntervention = criticalMoods > 0 && criticalMoods >= positiveMoods;

  return {
    scores,
    dominant,
    needsIntervention
  };
};
