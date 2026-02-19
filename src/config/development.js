// Development Configuration
// Automatically loaded during development

const developmentConfig = {
  // Application
  app: {
    name: 'Aura (Development)',
    version: '1.0.0-dev',
    environment: 'development',
  },

  // Performance
  performance: {
    enableSourceMaps: true,
    enableCompression: false,
    chunkSizeWarning: 500,
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
    secureCookies: false,
    httpOnly: false,
    sameSite: 'Lax',
  },

  // API
  api: {
    timeout: 30000,
    retries: 1,
    retryDelay: 500,
  },

  // Logging
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemote: false,
  },

  // Cache
  cache: {
    enabled: false, // Disable in development
    duration: 5 * 60 * 1000, // 5 minutes
  },

  // Storage
  storage: {
    localStorage: true,
    sessionStorage: true,
  },
};

export default developmentConfig;
