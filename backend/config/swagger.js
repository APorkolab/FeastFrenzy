const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

/**
 * Swagger/OpenAPI 3.0 Documentation Configuration
 * Provides comprehensive API documentation with examples and schemas
 */

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FeastFrenzy API',
      version: process.env.npm_package_version || '1.0.0',
      description: `
# FeastFrenzy Backend API

A comprehensive REST API for managing employee purchases in factory canteens.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **Employee Management**: CRUD operations for employee data
- **Product Catalog**: Dynamic product management with categories
- **Purchase System**: Real-time transaction processing
- **Reporting**: Advanced analytics and consumption reports
- **Balance Management**: Automatic employee balance tracking

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Error Handling

All endpoints return standardized error responses:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  },
  "timestamp": "2023-12-01T10:30:00.000Z"
}
\`\`\`

## Rate Limiting

API endpoints are rate-limited:
- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute
- **Bulk operations**: 10 requests per minute

## Pagination

List endpoints support pagination:
- \`page\`: Page number (default: 1)
- \`limit\`: Items per page (default: 10, max: 100)
- \`sort\`: Sort field
- \`order\`: Sort order ('asc' or 'desc')

Response includes pagination metadata:
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
\`\`\`
      `,
      contact: {
        name: 'FeastFrenzy Team',
        email: 'support@feastfrenzy.com',
        url: 'https://github.com/dr.porkolabadam/FeastFrenzy',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.feastfrenzy.com',
        description: 'Production server',
      },
      {
        url: 'https://staging-api.feastfrenzy.com',
        description: 'Staging server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authentication token',
        },
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
          description: 'API key for service-to-service communication',
        },
      },
      schemas: {
        // Employee schemas
        Employee: {
          type: 'object',
          required: ['name', 'email', 'employeeId', 'role'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier',
              example: 1,
            },
            employeeId: {
              type: 'string',
              description: 'Employee ID (unique)',
              example: 'EMP001',
              pattern: '^EMP[0-9]{3,}$',
            },
            name: {
              type: 'string',
              description: 'Full name',
              example: 'John Doe',
              minLength: 2,
              maxLength: 100,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
              example: 'john.doe@company.com',
            },
            role: {
              type: 'string',
              enum: ['employee', 'manager', 'admin'],
              description: 'User role',
              example: 'employee',
            },
            balance: {
              type: 'number',
              format: 'float',
              description: 'Current balance in currency',
              example: 150.50,
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the employee is active',
              example: true,
            },
            department: {
              type: 'string',
              description: 'Department name',
              example: 'Engineering',
              maxLength: 50,
            },
            hireDate: {
              type: 'string',
              format: 'date',
              description: 'Hire date',
              example: '2023-01-15',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record creation timestamp',
              example: '2023-01-15T10:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Record last update timestamp',
              example: '2023-12-01T10:30:00.000Z',
            },
          },
        },

        // Product schemas
        Product: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Product name',
              example: 'Coffee',
              minLength: 1,
              maxLength: 100,
            },
            description: {
              type: 'string',
              description: 'Product description',
              example: 'Premium coffee blend',
              maxLength: 500,
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Product price',
              example: 2.50,
              minimum: 0,
            },
            category: {
              type: 'string',
              description: 'Product category',
              example: 'Beverages',
              maxLength: 50,
            },
            isAvailable: {
              type: 'boolean',
              description: 'Whether the product is available',
              example: true,
            },
            stock: {
              type: 'integer',
              description: 'Current stock quantity',
              example: 100,
              minimum: 0,
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              description: 'Product image URL',
              example: 'https://example.com/images/coffee.jpg',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-15T10:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-12-01T10:30:00.000Z',
            },
          },
        },

        // Purchase schemas
        Purchase: {
          type: 'object',
          required: ['employeeId', 'items'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier',
              example: 1,
            },
            employeeId: {
              type: 'integer',
              description: 'Employee ID',
              example: 1,
            },
            employee: {
              $ref: '#/components/schemas/Employee',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/PurchaseItem',
              },
            },
            totalAmount: {
              type: 'number',
              format: 'float',
              description: 'Total purchase amount',
              example: 15.75,
            },
            status: {
              type: 'string',
              enum: ['pending', 'completed', 'cancelled', 'refunded'],
              description: 'Purchase status',
              example: 'completed',
            },
            paymentMethod: {
              type: 'string',
              enum: ['balance', 'card', 'cash'],
              description: 'Payment method used',
              example: 'balance',
            },
            notes: {
              type: 'string',
              description: 'Additional notes',
              maxLength: 500,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-12-01T10:30:00.000Z',
            },
          },
        },

        PurchaseItem: {
          type: 'object',
          required: ['productId', 'quantity', 'unitPrice'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            productId: {
              type: 'integer',
              description: 'Product ID',
              example: 1,
            },
            product: {
              $ref: '#/components/schemas/Product',
            },
            quantity: {
              type: 'integer',
              description: 'Quantity purchased',
              example: 2,
              minimum: 1,
            },
            unitPrice: {
              type: 'number',
              format: 'float',
              description: 'Unit price at time of purchase',
              example: 2.50,
            },
            subtotal: {
              type: 'number',
              format: 'float',
              description: 'Subtotal (quantity * unitPrice)',
              example: 5.00,
            },
          },
        },

        // Authentication schemas
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'admin@company.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'SecurePassword123',
              minLength: 8,
            },
            rememberMe: {
              type: 'boolean',
              description: 'Extended session duration',
              example: false,
            },
          },
        },

        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'JWT access token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                refreshToken: {
                  type: 'string',
                  description: 'JWT refresh token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                expiresIn: {
                  type: 'integer',
                  description: 'Token expiration in seconds',
                  example: 3600,
                },
                user: {
                  $ref: '#/components/schemas/Employee',
                },
              },
            },
          },
        },

        // Common schemas
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
            message: {
              type: 'string',
              description: 'Response message',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2023-12-01T10:30:00.000Z',
            },
          },
        },

        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Error code',
                  example: 'VALIDATION_ERROR',
                },
                message: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Validation failed',
                },
                details: {
                  type: 'object',
                  description: 'Additional error details',
                },
              },
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2023-12-01T10:30:00.000Z',
            },
          },
        },

        Pagination: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              example: 1,
            },
            limit: {
              type: 'integer',
              example: 10,
            },
            total: {
              type: 'integer',
              example: 150,
            },
            totalPages: {
              type: 'integer',
              example: 15,
            },
            hasNext: {
              type: 'boolean',
              example: true,
            },
            hasPrev: {
              type: 'boolean',
              example: false,
            },
          },
        },

        // Health check schemas
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['healthy', 'unhealthy'],
              example: 'healthy',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2023-12-01T10:30:00.000Z',
            },
            uptime: {
              type: 'object',
              properties: {
                seconds: {
                  type: 'integer',
                  example: 86400,
                },
                human: {
                  type: 'string',
                  example: '1d 0h 0m 0s',
                },
              },
            },
            checks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'database',
                  },
                  healthy: {
                    type: 'boolean',
                    example: true,
                  },
                  duration: {
                    type: 'integer',
                    example: 45,
                  },
                  timestamp: {
                    type: 'string',
                    format: 'date-time',
                  },
                },
              },
            },
          },
        },
      },

      responses: {
        UnauthorizedError: {
          description: 'Authentication token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'UNAUTHORIZED',
                  message: 'Authentication required',
                },
                timestamp: '2023-12-01T10:30:00.000Z',
              },
            },
          },
        },
        ForbiddenError: {
          description: 'Insufficient permissions',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'FORBIDDEN',
                  message: 'Insufficient permissions',
                },
                timestamp: '2023-12-01T10:30:00.000Z',
              },
            },
          },
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'NOT_FOUND',
                  message: 'Resource not found',
                },
                timestamp: '2023-12-01T10:30:00.000Z',
              },
            },
          },
        },
        ValidationError: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'VALIDATION_ERROR',
                  message: 'Validation failed',
                  details: {
                    field: 'email',
                    message: 'Invalid email format',
                  },
                },
                timestamp: '2023-12-01T10:30:00.000Z',
              },
            },
          },
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'INTERNAL_SERVER_ERROR',
                  message: 'Internal server error',
                },
                timestamp: '2023-12-01T10:30:00.000Z',
              },
            },
          },
        },
      },

      parameters: {
        PageParam: {
          name: 'page',
          in: 'query',
          description: 'Page number for pagination',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1,
          },
        },
        LimitParam: {
          name: 'limit',
          in: 'query',
          description: 'Number of items per page',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10,
          },
        },
        SortParam: {
          name: 'sort',
          in: 'query',
          description: 'Field to sort by',
          required: false,
          schema: {
            type: 'string',
            default: 'createdAt',
          },
        },
        OrderParam: {
          name: 'order',
          in: 'query',
          description: 'Sort order',
          required: false,
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
            default: 'desc',
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'Authentication and authorization endpoints',
      },
      {
        name: 'Employees',
        description: 'Employee management operations',
      },
      {
        name: 'Products',
        description: 'Product catalog management',
      },
      {
        name: 'Purchases',
        description: 'Purchase transaction operations',
      },
      {
        name: 'Reports',
        description: 'Analytics and reporting endpoints',
      },
      {
        name: 'Health',
        description: 'Health check and monitoring endpoints',
      },
      {
        name: 'Admin',
        description: 'Administrative operations',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, '../controllers/*.js'),
    path.join(__dirname, '../models/*.js'),
    path.join(__dirname, '../docs/swagger/*.yaml'),
  ],
};

// Generate OpenAPI specification
const specs = swaggerJsdoc(options);

// Save the generated spec to a file for external use
const outputPath = path.join(__dirname, '../docs/openapi.json');
try {
  fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));
} catch (error) {
  console.warn('Could not write OpenAPI spec to file:', error.message);
}

// Custom CSS for Swagger UI
const customCss = `
  .swagger-ui .topbar { display: none; }
  .swagger-ui .info .title { color: #3b82f6; }
  .swagger-ui .info .description p { font-size: 14px; line-height: 1.6; }
  .swagger-ui .info .description h1 { color: #1f2937; margin-top: 20px; }
  .swagger-ui .info .description h2 { color: #374151; margin-top: 16px; }
  .swagger-ui .opblock.opblock-post { border-color: #059669; }
  .swagger-ui .opblock.opblock-get { border-color: #3b82f6; }
  .swagger-ui .opblock.opblock-put { border-color: #f59e0b; }
  .swagger-ui .opblock.opblock-delete { border-color: #ef4444; }
`;

const swaggerOptions = {
  customCss,
  customSiteTitle: 'FeastFrenzy API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  },
};

module.exports = {
  specs,
  swaggerUi,
  swaggerOptions,
};
