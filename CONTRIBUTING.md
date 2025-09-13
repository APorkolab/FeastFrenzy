# Contributing to FeastFrenzy

We welcome contributions to FeastFrenzy! This document provides guidelines and information for contributors.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Issue Reporting](#issue-reporting)
8. [Security Vulnerabilities](#security-vulnerabilities)

## Code of Conduct

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18+ installed
- Docker and Docker Compose installed
- Git configured with your name and email
- A GitHub account

### First Contributions

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/FeastFrenzy.git
   cd FeastFrenzy
   ```
3. **Add the original repository** as upstream:
   ```bash
   git remote add upstream https://github.com/original-owner/FeastFrenzy.git
   ```

### Finding Issues to Work On

- Look for issues labeled `good-first-issue` for beginners
- Check issues labeled `help-wanted` for areas where we need assistance
- Review the project roadmap for upcoming features

## Development Setup

### Local Environment

1. **Install dependencies:**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd frontend && npm install --legacy-peer-deps
   ```

2. **Set up environment variables:**
   ```bash
   cp backend/.env.example backend/.env
   # Edit .env with your local configuration
   ```

3. **Start services:**
   ```bash
   # Using Docker Compose (recommended)
   docker-compose up -d
   
   # OR manually
   cd backend && npm start
   cd frontend && npm start
   ```

4. **Run tests:**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   ```

### Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes:**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow the single responsibility principle
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Backend Standards (Node.js)

#### Style Guidelines

- Use ES2021+ features
- Follow the existing ESLint configuration
- Use `const` by default, `let` when reassignment is needed
- Prefer arrow functions for anonymous functions
- Use template literals for string interpolation

#### Code Structure

```javascript
// Good
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    logger.error('Error fetching user:', error);
    throw error;
  }
};

// Avoid
function getUserById(id, callback) {
  User.findByPk(id, function(err, user) {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
}
```

#### Database Guidelines

- Use Sequelize migrations for schema changes
- Add proper indexes for query performance
- Use transactions for multi-table operations
- Implement proper error handling

#### API Design

- Follow RESTful conventions
- Use consistent response formats
- Implement proper HTTP status codes
- Add comprehensive input validation
- Include pagination for list endpoints

### Frontend Standards (Angular/TypeScript)

#### Angular Style Guide

Follow the [Angular Style Guide](https://angular.io/guide/styleguide):

- Use kebab-case for file names
- Use PascalCase for class names
- Use camelCase for property and method names
- Use UPPER_SNAKE_CASE for constants

#### TypeScript Guidelines

```typescript
// Good
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  balance: number;
}

class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`/api/employees/${id}`);
  }
}

// Use proper typing
const employees: Employee[] = [];
const employee: Employee | null = null;
```

#### Component Guidelines

- Keep components focused and small
- Use OnPush change detection when possible
- Implement OnDestroy for cleanup
- Use reactive forms for complex forms
- Follow the container/presentation pattern

### Testing Standards

#### Backend Testing

- Use Mocha, Chai, and Supertest
- Aim for 80%+ code coverage
- Test both happy path and error scenarios
- Use factories for test data generation

```javascript
// Example test structure
describe('Employee API', () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });

  afterEach(async () => {
    await cleanupTestDatabase();
  });

  describe('GET /api/employees/:id', () => {
    it('should return employee when found', async () => {
      const employee = await createEmployee();
      
      const response = await request(app)
        .get(`/api/employees/${employee.id}`)
        .expect(200);

      expect(response.body.data).to.include({
        id: employee.id,
        name: employee.name,
      });
    });

    it('should return 404 when employee not found', async () => {
      await request(app)
        .get('/api/employees/999')
        .expect(404);
    });
  });
});
```

#### Frontend Testing

- Use Jasmine and Karma for unit tests
- Test component behavior, not implementation
- Mock external dependencies
- Test user interactions

```typescript
// Example component test
describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      providers: [{ provide: EmployeeService, useValue: spy }],
    });

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    mockEmployeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  it('should display employees', () => {
    const employees = [{ id: 1, name: 'John Doe' }];
    mockEmployeeService.getEmployees.and.returnValue(of(employees));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.employees).toEqual(employees);
  });
});
```

### Documentation Standards

- Use JSDoc for function documentation
- Add inline comments for complex logic
- Update README.md for significant changes
- Document API endpoints in OpenAPI format

```javascript
/**
 * Creates a new employee in the system
 * @param {Object} employeeData - The employee data
 * @param {string} employeeData.name - Employee's full name
 * @param {string} employeeData.email - Employee's email address
 * @param {string} employeeData.department - Employee's department
 * @returns {Promise<Employee>} The created employee object
 * @throws {ValidationError} When input data is invalid
 * @throws {ConflictError} When email already exists
 */
const createEmployee = async (employeeData) => {
  // Implementation here
};
```

## Testing Guidelines

### Test Categories

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test API endpoints and database interactions
3. **E2E Tests**: Test complete user workflows
4. **Performance Tests**: Test system performance under load

### Test Data Management

- Use factories for creating test data
- Clean up test data after each test
- Use separate test database
- Mock external services

### Coverage Requirements

- Backend: Minimum 80% code coverage
- Frontend: Minimum 70% code coverage
- Critical paths: 100% coverage required

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test file
npm test -- --grep "Employee API"
```

## Pull Request Process

### Before Submitting

1. **Update your branch:**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run all checks:**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

3. **Update documentation** if needed

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is properly commented
- [ ] Documentation updated
- [ ] No breaking changes introduced
```

### Review Process

1. **Automated checks** must pass (CI/CD pipeline)
2. **At least one code review** from a maintainer
3. **All conversations resolved** before merging
4. **Squash and merge** preferred for feature branches

### Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Examples:
```
feat: add employee balance tracking
fix: resolve database connection timeout
docs: update API documentation
test: add unit tests for purchase service
```

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should have happened

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., macOS, Ubuntu]
- Node.js version: [e.g., 18.17.0]
- Browser: [e.g., Chrome 115.0]

## Additional Context
Screenshots, logs, or other relevant information
```

### Feature Requests

Use the feature request template:

```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this feature work?

## Alternative Solutions
Other approaches considered

## Additional Context
Mockups, examples, or references
```

### Performance Issues

- Include system specifications
- Provide performance metrics
- Add profiling data if available
- Describe the expected performance

## Security Vulnerabilities

### Reporting Process

1. **DO NOT** create public issues for security vulnerabilities
2. Email security concerns to: security@feastfrenzy.com
3. Include detailed description and reproduction steps
4. Allow time for investigation and fix before disclosure

### Security Best Practices

- Never commit secrets or credentials
- Use parameterized queries to prevent SQL injection
- Validate and sanitize all inputs
- Implement proper authentication and authorization
- Keep dependencies updated

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, backward compatible

### Release Checklist

1. Update version numbers
2. Update CHANGELOG.md
3. Create release notes
4. Tag the release
5. Deploy to staging
6. Run regression tests
7. Deploy to production
8. Announce the release

## Community Guidelines

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: General discussions, questions
- **Pull Requests**: Code contributions

### Getting Help

- Check existing issues and documentation
- Search closed issues for similar problems
- Ask questions in GitHub Discussions
- Be specific and provide context

### Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README
- Annual contribution reports

Thank you for contributing to FeastFrenzy! 🎉