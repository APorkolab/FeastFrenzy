module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
  ],
  
  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.js',
    'controllers/**/*.js',
    'models/**/*.js',
    'services/**/*.js',
    'utils/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/test/**',
    '!**/*.test.js',
    '!**/*.spec.js',
  ],
  
  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.js',
  ],
  
  // Module paths
  modulePaths: [
    '<rootDir>/src',
    '<rootDir>',
  ],
  
  // Test timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
  
  // Error handling
  errorOnDeprecated: true,
  
  // Mock configuration
  clearMocks: true,
  restoreMocks: true,
  resetMocks: false,
  
  // Transform configuration for ES modules
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};