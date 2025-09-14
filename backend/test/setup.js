const { Sequelize } = require('sequelize');
const { expect } = require('chai');

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
before(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret-key';
  process.env.DB_LOGGING = 'false';

  // Initialize test database
  global.testDb = new Sequelize(testConfig);

  // Import and initialize models
  try {
    // const models = require('../models'); // Will be implemented when models are available
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
after(async () => {
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
      // const { Employee } = require('../models'); // Will be implemented when models are available
      // return await Employee.create(userData);
      console.warn('⚠️  Test user creation skipped: models not available');
      return userData;
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
      // const { Product } = require('../models'); // Will be implemented when models are available
      // return await Product.create(productData);
      console.warn('⚠️  Test product creation skipped: models not available');
      return productData;
    } catch (error) {
      console.warn('⚠️  Test product creation failed:', error.message);
      return productData;
    }
  },

  // Create test purchase
  createTestPurchase: async (employeeId, _items = [], overrides = {}) => {
    const purchaseData = {
      employeeId,
      totalAmount: 25.50,
      status: 'completed',
      purchaseDate: new Date(),
      ...overrides,
    };

    try {
      // const { Purchase } = require('../models'); // Will be implemented when models are available
      // return await Purchase.create(purchaseData);
      console.warn('⚠️  Test purchase creation skipped: models not available');
      return purchaseData;
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

// Test utilities - custom assertions using Chai
global.customAssertions = {
  isValidDate: (received) => {
    expect(received).to.be.an.instanceOf(Date);
    expect(received.getTime()).to.not.be.NaN;
  },

  isWithinRange: (received, floor, ceiling) => {
    expect(received).to.be.at.least(floor);
    expect(received).to.be.at.most(ceiling);
  },

  hasValidId: (received) => {
    expect(received).to.be.an('object');
    expect(received.id).to.be.a('number');
    expect(received.id).to.be.greaterThan(0);
  },
};

// Make expect globally available
global.expect = expect;

// Global error handler for unhandled rejections in tests
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('🧪 Test environment initialized');
