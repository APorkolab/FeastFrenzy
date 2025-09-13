/**
 * Production-Ready FeastFrenzy Backend Server
 * 
 * This server includes all production-ready features:
 * - Graceful shutdown handling
 * - Health checks for load balancers
 * - Performance monitoring with Prometheus
 * - Security middleware
 * - Structured logging
 * - Error tracking
 */

const express = require('express');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

// Import custom utilities
const logger = require('./utils/logger');
const { gracefulShutdown, commonHandlers } = require('./utils/graceful-shutdown');
const { healthCheckService, commonChecks } = require('./utils/health-checks');
const { performanceMiddleware, metricsEndpoint } = require('./utils/performance-monitoring');
const { securityMiddleware } = require('./utils/security-middleware');

// Database connection
const sequelize = require('./models');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

/**
 * Initialize production-ready server
 */
async function initializeServer() {
  try {
    logger.info('Starting FeastFrenzy Backend Server...', {
      nodeEnv: process.env.NODE_ENV,
      port,
      pid: process.pid,
    });

    // Apply security middleware first
    app.use(securityMiddleware());
    
    // Performance monitoring
    app.use(performanceMiddleware);

    // Standard middleware
    app.use(compression());
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:4200',
      credentials: true,
      optionsSuccessStatus: 200,
    }));

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Graceful shutdown middleware - reject new requests during shutdown
    app.use(gracefulShutdown.middleware());

    // Health check endpoints (before authentication)
    const healthMiddleware = healthCheckService.middleware();
    app.get('/health', healthMiddleware.health);
    app.get('/health/liveness', healthMiddleware.liveness);
    app.get('/health/readiness', healthMiddleware.readiness);

    // Metrics endpoint for Prometheus
    app.get('/metrics', metricsEndpoint);

    // Request logging middleware
    app.use((req, res, next) => {
      const startTime = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.info('HTTP Request', {
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          duration,
          userAgent: req.get('User-Agent'),
          ip: req.ip,
          contentLength: res.get('content-length'),
        });
      });

      next();
    });

    // API Routes
    const authRoutes = require('./routes/auth');
    const employeeRoutes = require('./routes/employees');
    const productRoutes = require('./routes/products');
    const purchaseRoutes = require('./routes/purchases');

    app.use('/api/auth', authRoutes);
    app.use('/api/employees', employeeRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/purchases', purchaseRoutes);

    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        message: 'FeastFrenzy Backend API',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        documentation: '/api/docs',
        health: '/health',
        metrics: '/metrics',
      });
    });

    // 404 handler
    app.use('*', (req, res) => {
      logger.warn('Route not found', { 
        method: req.method, 
        url: req.originalUrl,
        ip: req.ip,
      });
      
      res.status(404).json({
        success: false,
        error: {
          code: 'ROUTE_NOT_FOUND',
          message: `Route ${req.method} ${req.originalUrl} not found`,
        },
        timestamp: new Date().toISOString(),
      });
    });

    // Global error handler
    app.use((error, req, res, next) => {
      const statusCode = error.statusCode || error.status || 500;
      const isDevelopment = process.env.NODE_ENV === 'development';

      logger.error('Unhandled error in request', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        statusCode,
        ip: req.ip,
      });

      res.status(statusCode).json({
        success: false,
        error: {
          code: error.code || 'INTERNAL_SERVER_ERROR',
          message: isDevelopment ? error.message : 'Internal server error',
          ...(isDevelopment && { stack: error.stack }),
        },
        timestamp: new Date().toISOString(),
      });
    });

    // Test database connection
    logger.info('Testing database connection...');
    await sequelize.authenticate();
    logger.info('Database connection established successfully');

    // Register health checks
    setupHealthChecks();

    // Setup graceful shutdown handlers
    setupGracefulShutdown();

    // Start the server
    const server = app.listen(port, () => {
      logger.info(`Server is running on port ${port}`, {
        environment: process.env.NODE_ENV,
        pid: process.pid,
        memory: process.memoryUsage(),
      });
    });

    // Configure server for production
    server.keepAliveTimeout = 65000; // Slightly higher than ALB timeout
    server.headersTimeout = 66000;   // Slightly higher than keepAliveTimeout

    // Handle server errors
    server.on('error', (error) => {
      logger.error('Server error', { error });
      process.exit(1);
    });

    // Handle client errors (like malformed requests)
    server.on('clientError', (error, socket) => {
      logger.warn('Client error', { error: error.message });
      
      if (!socket.writableEnded) {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      }
    });

    return { app, server };

  } catch (error) {
    logger.error('Failed to initialize server', { error });
    process.exit(1);
  }
}

/**
 * Setup health checks for various system components
 */
function setupHealthChecks() {
  // Database health check
  healthCheckService.register(
    'database',
    commonChecks.database(sequelize),
    5000
  );

  // Memory usage check
  healthCheckService.register(
    'memory',
    commonChecks.memoryUsage(0.9), // Alert if memory usage > 90%
    1000
  );

  // File system check for critical directories
  healthCheckService.register(
    'filesystem',
    commonChecks.fileSystem('./logs'),
    2000
  );

  logger.info('Health checks registered successfully');
}

/**
 * Setup graceful shutdown handlers
 */
function setupGracefulShutdown() {
  const { app, server } = require('./server.prod'); // Will be available after initialization

  // Register shutdown handlers in proper order
  commonHandlers.closeServer(server);
  commonHandlers.closeDatabase(sequelize);
  commonHandlers.closeLogger(logger);

  // Custom cleanup handler
  gracefulShutdown.register('cleanup', async () => {
    logger.info('Performing final cleanup...');
    
    // Clear any intervals or timeouts
    // Cancel any ongoing operations
    // Close file handles
    // etc.
    
    logger.info('Cleanup completed');
  }, 3000);

  logger.info('Graceful shutdown handlers registered successfully');
}

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error });
  // Let graceful shutdown handle the exit
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
  // Let graceful shutdown handle the exit
});

// Export the initialization function
module.exports = initializeServer;

// Start the server if this file is run directly
if (require.main === module) {
  initializeServer().catch((error) => {
    logger.error('Failed to start server', { error });
    process.exit(1);
  });
}