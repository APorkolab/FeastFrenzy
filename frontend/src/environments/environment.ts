export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  appName: 'FeastFrenzy',
  appVersion: '1.0.0',
  
  // Feature flags
  enableLogging: true,
  enableAnalytics: false,
  enablePWA: false,
  enableOfflineMode: false,
  
  // Authentication
  authTokenKey: 'feastfrenzy_auth_token',
  refreshTokenKey: 'feastfrenzy_refresh_token',
  tokenExpiryBuffer: 300, // 5 minutes buffer before token expiry
  
  // UI Configuration
  pageSize: 20,
  maxFileUploadSize: 10485760, // 10MB
  supportedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
  
  // Caching
  cacheTtl: 60000, // 1 minute for dev
  enableServiceWorker: false,
  
  // External services
  googleAnalyticsId: '',
  sentryDsn: '',
  
  // API Configuration
  apiTimeout: 10000, // 10 seconds for dev
  retryAttempts: 2,
  retryDelay: 500, // 0.5 second
  
  // Logging
  logLevel: 'debug',
  enableRemoteLogging: false,
  
  // Security
  enableCSP: false,
  enableXSRFProtection: false,
  
  // Performance
  enablePreloading: false,
  enableLazyLoading: true
};