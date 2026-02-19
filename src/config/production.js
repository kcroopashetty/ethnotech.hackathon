// Production Configuration
// Automatically loaded during production builds

const productionConfig = {
  // Application
  app: {
    name: 'Aura',
    version: '1.0.0',
    environment: 'production',
  },

  // Performance
  performance: {
    enableSourceMaps: false, // Hidden source maps for production
    enableCompression: true,
    chunkSizeWarning: 500, // KB
  },

  // Features
  features: {
    facialRecognition: true,
    voiceJournaling: true,
    aiInsights: true,
    games: true,
  },

  // Security
  security: {
    enableCORS: true,
    secureCookies: true,
    httpOnly: true,
    sameSite: 'Strict',
  },

  // API
  api: {
    timeout: 30000, // 30 seconds
    retries: 3,
    retryDelay: 1000, // ms
  },

  // Logging
  logging: {
    level: import.meta.env.VITE_LOG_LEVEL || 'info',
    enableConsole: false,
    enableRemote: false,
  },

  // Cache
  cache: {
    enabled: true,
    duration: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Storage
  storage: {
    localStorage: true,
    sessionStorage: false,
  },
};

export default productionConfig;
