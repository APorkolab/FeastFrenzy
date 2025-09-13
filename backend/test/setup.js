const { Sequelize } = require('sequelize');
const { execSync } = require('child_process');

// Test database configuration
const testConfig = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: false,
  },
};

// Global test variables
global.testDb = null;
global.app = null;
global.request = null;

// Setup before all tests
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret-key';
  process.env.DB_LOGGING = 'false';

  // Initialize test database
  global.testDb = new Sequelize(testConfig);

  // Import and initialize models
  try {
    const models = require('../models');
    await global.testDb.sync({ force: true });
    console.log('✅ Test database synchronized');
  } catch (error) {
    console.error('❌ Test database setup failed:', error);
    throw error;
  }

  // Initialize app for API testing
  try {
    global.app = require('../server');
    global.request = require('supertest')(global.app);
    console.log('✅ Test server initialized');
  } catch (error) {
    console.warn('⚠️  Server initialization skipped:', error.message);
  }
});

// Cleanup after all tests
afterAll(async () => {
  if (global.testDb) {
    await global.testDb.close();
    console.log('✅ Test database closed');
  }
});

// Reset database before each test
beforeEach(async () => {
  if (global.testDb) {
    try {
      await global.testDb.sync({ force: true });
    } catch (error) {
      console.warn('⚠️  Database reset failed:', error.message);
    }
  }
});

// Test utilities
global.testUtils = {
  // Create test user
  createTestUser: async (overrides = {}) => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      department: 'IT',
      balance: 1000,
      ...overrides,
    };

    try {
      const { Employee } = require('../models');
      return await Employee.create(userData);
    } catch (error) {
      console.warn('⚠️  Test user creation failed:', error.message);
      return userData;
    }
  },

  // Create test product
  createTestProduct: async (overrides = {}) => {
    const productData = {
      name: 'Test Product',
      description: 'Test product description',
      price: 10.99,
      category: 'test',
      availability: true,
      ...overrides,
    };

    try {
      const { Product } = require('../models');
      return await Product.create(productData);
    } catch (error) {
      console.warn('⚠️  Test product creation failed:', error.message);
      return productData;
    }
  },

  // Create test purchase
  createTestPurchase: async (employeeId, items = [], overrides = {}) => {
    const purchaseData = {
      employeeId,
      totalAmount: 25.50,
      status: 'completed',
      purchaseDate: new Date(),
      ...overrides,
    };

    try {
      const { Purchase } = require('../models');
      return await Purchase.create(purchaseData);
    } catch (error) {
      console.warn('⚠️  Test purchase creation failed:', error.message);
      return purchaseData;
    }
  },

  // Generate JWT token for testing
  generateTestToken: (payload = {}) => {
    const jwt = require('jsonwebtoken');
    const defaultPayload = {
      id: 1,
      email: 'test@example.com',
      role: 'employee',
      ...payload,
    };
    return jwt.sign(defaultPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  },

  // Wait for async operations
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Generate random data
  randomString: (length = 10) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  randomEmail: () => `test${Date.now()}@example.com`,
  randomPrice: () => Math.round((Math.random() * 100) * 100) / 100,
};

// Enhanced matchers for better assertions
expect.extend({
  toBeValidDate(received) {
    const pass = received instanceof Date && !isNaN(received.getTime());
    return {
      message: () =>
        pass
          ? `Expected ${received} not to be a valid date`
          : `Expected ${received} to be a valid date`,
      pass,
    };
  },

  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    return {
      message: () =>
        pass
          ? `Expected ${received} not to be within range ${floor} - ${ceiling}`
          : `Expected ${received} to be within range ${floor} - ${ceiling}`,
      pass,
    };
  },

  toHaveValidId(received) {
    const pass = received && typeof received.id === 'number' && received.id > 0;
    return {
      message: () =>
        pass
          ? `Expected object not to have a valid ID`
          : `Expected object to have a valid ID`,
      pass,
    };
  },
});

// Global error handler for unhandled rejections in tests
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('🧪 Test environment initialized');