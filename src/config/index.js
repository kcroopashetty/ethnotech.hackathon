// Main Configuration Loader
// Selects appropriate config based on environment

import productionConfig from './production.js';
import developmentConfig from './development.js';

const isProduction = import.meta.env.MODE === 'production';

const config = isProduction ? productionConfig : developmentConfig;

// Merge with environment-specific overrides
const finalConfig = {
  ...config,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  logLevel: import.meta.env.VITE_LOG_LEVEL || config.logging.level,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || null,
  analyticsId: import.meta.env.VITE_ANALYTICS_ID || null,
};

export default finalConfig;
