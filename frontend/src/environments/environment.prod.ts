export const environment = {
  production: true,
  apiUrl: 'https://api.feastfrenzy.com',
  appName: 'FeastFrenzy',
  appVersion: '1.0.0',
  
  // Feature flags
  enableLogging: false,
  enableAnalytics: true,
  enablePWA: true,
  enableOfflineMode: true,
  
  // Authentication
  authTokenKey: 'feastfrenzy_auth_token',
  refreshTokenKey: 'feastfrenzy_refresh_token',
  tokenExpiryBuffer: 300, // 5 minutes buffer before token expiry
  
  // UI Configuration
  pageSize: 20,
  maxFileUploadSize: 10485760, // 10MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
  
  // Caching
  cacheTtl: 300000, // 5 minutes
  enableServiceWorker: true,
  
  // External services
  googleAnalyticsId: 'GA_MEASUREMENT_ID',
  sentryDsn: 'SENTRY_DSN_URL',
  
  // API Configuration
  apiTimeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  
  // Logging
  logLevel: 'error',
  enableRemoteLogging: true,
  
  // Security
  enableCSP: true,
  enableXSRFProtection: true,
  
  // Performance
  enablePreloading: true,
  enableLazyLoading: true
};