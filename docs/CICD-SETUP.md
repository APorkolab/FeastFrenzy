# CI/CD Setup Guide

## Overview

The FeastFrenzy CI/CD pipeline is designed to work with or without external service tokens. All token-dependent steps are optional and will be skipped if tokens are not available.

## Required Setup (Minimum)

The pipeline will run basic functionality without any secrets:

1. **Code Quality**: ESLint, Prettier
2. **Testing**: Unit tests and integration tests
3. **Building**: Application builds
4. **Docker**: Local builds (without pushing to registry)

## Optional Enhancements

### 1. SonarQube Code Quality Analysis

**Repository Secret Required**: `SONAR_TOKEN`

```bash
# In GitHub repository settings > Secrets and variables > Actions
SONAR_TOKEN=your_sonarqube_token_here
```

**Setup Steps**:
1. Create account at [SonarCloud.io](https://sonarcloud.io)
2. Import your GitHub repository
3. Generate token in SonarCloud
4. Add token to GitHub repository secrets

**Benefits**: 
- Advanced code quality metrics
- Security vulnerability detection
- Technical debt analysis

---

### 2. Code Coverage Reports

**Repository Secret Required**: `CODECOV_TOKEN`

```bash
# In GitHub repository settings > Secrets and variables > Actions  
CODECOV_TOKEN=your_codecov_token_here
```

**Setup Steps**:
1. Create account at [Codecov.io](https://codecov.io)
2. Import your GitHub repository
3. Get repository token from Codecov
4. Add token to GitHub repository secrets

**Benefits**:
- Visual coverage reports
- Coverage trend tracking
- PR coverage analysis

---

### 3. Docker Registry (Container Publishing)

**Repository Secrets Required**: 

For GitHub Container Registry (default):
```bash
# GITHUB_TOKEN is automatically available, no setup needed
```

For custom registry:
```bash
DOCKER_REGISTRY_PASSWORD=your_registry_password
```

**Repository Variables (optional)**:
```bash
DOCKER_REGISTRY_URL=your-registry.com
DOCKER_REGISTRY_USERNAME=your-username
```

**Setup Steps for Custom Registry**:
1. Choose your container registry (Docker Hub, AWS ECR, etc.)
2. Create registry credentials
3. Add credentials to GitHub repository secrets
4. Set registry URL and username in repository variables

**Benefits**:
- Automated container builds
- Version-tagged images
- Deploy-ready containers

---

### 4. Deployment (Production/Staging)

**Repository Secrets Required**:
```bash
KUBE_CONFIG_DATA=your_base64_encoded_kubeconfig
DATABASE_URL_STAGING=your_staging_database_url
DATABASE_URL_PRODUCTION=your_production_database_url
```

**Setup Steps**:
1. Set up Kubernetes cluster or deployment target
2. Encode kubeconfig: `cat ~/.kube/config | base64 | pbcopy`
3. Add encoded config to repository secrets
4. Set up staging and production databases
5. Add database URLs to repository secrets

**Benefits**:
- Automated deployments
- Environment-specific configurations
- Blue-green deployments

---

## Current Pipeline Status

Without any tokens, the pipeline will:
- ✅ Run code quality checks (ESLint, Prettier)
- ✅ Execute all tests (backend & frontend)
- ✅ Build applications successfully
- ✅ Create Docker images locally
- ⚠️ Skip SonarQube analysis
- ⚠️ Skip coverage uploads
- ⚠️ Skip Docker registry push
- ⚠️ Skip deployments

## Local Development

All development can be done locally without any external services:

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install --legacy-peer-deps

# Run locally
docker-compose up -d

# Or manually
cd backend && npm run dev    # Terminal 1
cd frontend && npm start     # Terminal 2
```

## Testing the Pipeline

You can test the pipeline at any stage:

1. **Basic pipeline**: Commit and push - basic checks will run
2. **With coverage**: Add `CODECOV_TOKEN` - coverage will be uploaded
3. **With quality**: Add `SONAR_TOKEN` - quality analysis will run
4. **With containers**: Ensure `GITHUB_TOKEN` works - images will be pushed
5. **With deployment**: Add deployment secrets - full automation

## Security Notes

- All secrets are encrypted in GitHub
- Tokens have appropriate scoping and permissions
- Pipeline fails safely if secrets are invalid
- No secrets are exposed in logs
- Optional services gracefully degrade

## Support

If you encounter issues:

1. Check GitHub Actions logs for specific errors
2. Verify token permissions and validity
3. Ensure repository settings allow Actions
4. Check service status (SonarCloud, Codecov, etc.)

For token-specific issues, consult the respective service documentation:
- [SonarCloud Documentation](https://sonarcloud.io/documentation)
- [Codecov Documentation](https://docs.codecov.io/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)