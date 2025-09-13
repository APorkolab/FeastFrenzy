# FeastFrenzy Deployment Guide

This guide covers deployment options for FeastFrenzy from local development to production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Docker Deployment](#docker-deployment)
4. [Staging Deployment](#staging-deployment)
5. [Production Deployment](#production-deployment)
6. [Environment Configuration](#environment-configuration)
7. [Monitoring Setup](#monitoring-setup)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Docker**: Version 20.x or higher
- **Docker Compose**: Version 2.x or higher
- **MySQL**: Version 8.0 or higher (for non-Docker deployments)
- **Git**: For code management

### System Requirements

#### Minimum Requirements
- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 20 GB available space
- **Network**: Internet connection for dependencies

#### Recommended Requirements
- **CPU**: 4+ cores
- **RAM**: 8+ GB
- **Storage**: 50+ GB available space
- **Network**: High-speed internet connection

## Local Development

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FeastFrenzy
   ```

2. **Setup Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env file with your database credentials
   npm install
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

### Database Setup

1. **Create MySQL database**
   ```sql
   CREATE DATABASE feastfrenzy;
   CREATE USER 'feastfrenzy_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON feastfrenzy.* TO 'feastfrenzy_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Run migrations**
   ```bash
   cd backend
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all  # Optional: seed initial data
   ```

## Docker Deployment

### Development with Docker Compose

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f [service-name]
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

4. **Rebuild services**
   ```bash
   docker-compose up --build -d
   ```

### Production Docker Setup

1. **Build production images**
   ```bash
   # Backend
   docker build -t feastfrenzy/backend:latest -f backend/Dockerfile backend/
   
   # Frontend
   docker build -t feastfrenzy/frontend:latest -f frontend/Dockerfile frontend/
   ```

2. **Run with production compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Staging Deployment

### Prerequisites

- Kubernetes cluster or Docker Swarm
- Container registry access
- SSL certificates
- Domain name configured

### Kubernetes Deployment

1. **Create namespace**
   ```bash
   kubectl create namespace feastfrenzy-staging
   ```

2. **Apply configurations**
   ```bash
   kubectl apply -f k8s/staging/ -n feastfrenzy-staging
   ```

3. **Verify deployment**
   ```bash
   kubectl get pods -n feastfrenzy-staging
   kubectl get services -n feastfrenzy-staging
   ```

### Environment Variables

Create a ConfigMap and Secret for staging:

```bash
kubectl create configmap feastfrenzy-config \
  --from-env-file=.env.staging \
  -n feastfrenzy-staging

kubectl create secret generic feastfrenzy-secrets \
  --from-env-file=.env.staging.secrets \
  -n feastfrenzy-staging
```

## Production Deployment

### Infrastructure Requirements

#### Cloud Provider Setup (AWS Example)

1. **RDS Database**
   - MySQL 8.0 Multi-AZ deployment
   - Automated backups enabled
   - Performance Insights enabled

2. **EKS Cluster**
   - Multiple availability zones
   - Auto-scaling groups
   - Network load balancer

3. **ElastiCache**
   - Redis cluster mode
   - Automatic failover

4. **Monitoring**
   - CloudWatch integration
   - Prometheus stack

### Deployment Steps

1. **Prepare production images**
   ```bash
   # Tag and push to registry
   docker tag feastfrenzy/backend:latest your-registry/feastfrenzy/backend:v1.0.0
   docker tag feastfrenzy/frontend:latest your-registry/feastfrenzy/frontend:v1.0.0
   
   docker push your-registry/feastfrenzy/backend:v1.0.0
   docker push your-registry/feastfrenzy/frontend:v1.0.0
   ```

2. **Update Kubernetes manifests**
   ```yaml
   # Update image tags in k8s/production/
   image: your-registry/feastfrenzy/backend:v1.0.0
   ```

3. **Deploy to production**
   ```bash
   kubectl apply -f k8s/production/ -n feastfrenzy-prod
   ```

4. **Verify deployment**
   ```bash
   kubectl rollout status deployment/feastfrenzy-backend -n feastfrenzy-prod
   kubectl rollout status deployment/feastfrenzy-frontend -n feastfrenzy-prod
   ```

### Database Migration in Production

1. **Backup current database**
   ```bash
   mysqldump -h prod-db-host -u username -p feastfrenzy > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Run migrations**
   ```bash
   kubectl exec -it deployment/feastfrenzy-backend -n feastfrenzy-prod -- npm run migrate
   ```

3. **Verify data integrity**
   ```bash
   kubectl exec -it deployment/feastfrenzy-backend -n feastfrenzy-prod -- npm run db:verify
   ```

## Environment Configuration

### Environment Files

#### Development (.env.development)
```bash
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
LOG_LEVEL=debug
ENABLE_SWAGGER=true
```

#### Staging (.env.staging)
```bash
NODE_ENV=staging
DB_HOST=staging-db.internal
DB_PORT=3306
LOG_LEVEL=info
ENABLE_SWAGGER=false
```

#### Production (.env.production)
```bash
NODE_ENV=production
DB_HOST=prod-db.internal
DB_PORT=3306
LOG_LEVEL=warn
ENABLE_SWAGGER=false
```

### Secrets Management

Use Kubernetes secrets or cloud provider secret managers:

```bash
# Create secret from file
kubectl create secret generic db-credentials \
  --from-literal=username=feastfrenzy_user \
  --from-literal=password=secure_password \
  -n feastfrenzy-prod
```

## Monitoring Setup

### Prometheus and Grafana

1. **Deploy monitoring stack**
   ```bash
   # Using Helm
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring
   ```

2. **Configure service monitors**
   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: ServiceMonitor
   metadata:
     name: feastfrenzy-backend
   spec:
     selector:
       matchLabels:
         app: feastfrenzy-backend
     endpoints:
     - port: metrics
   ```

### Log Aggregation

1. **Deploy ELK stack**
   ```bash
   helm repo add elastic https://helm.elastic.co
   helm install elasticsearch elastic/elasticsearch -n logging
   helm install kibana elastic/kibana -n logging
   ```

2. **Configure log forwarding**
   ```yaml
   apiVersion: logging.coreos.com/v1
   kind: ClusterLogForwarder
   metadata:
     name: feastfrenzy-logs
   spec:
     outputs:
     - name: elasticsearch
       type: elasticsearch
       url: http://elasticsearch:9200
   ```

### Health Checks

1. **Application health endpoints**
   - Backend: `GET /health`
   - Database: Connection verification
   - Cache: Redis ping

2. **Kubernetes probes**
   ```yaml
   livenessProbe:
     httpGet:
       path: /health
       port: 3000
     initialDelaySeconds: 30
     periodSeconds: 10
   
   readinessProbe:
     httpGet:
       path: /health
       port: 3000
     initialDelaySeconds: 5
     periodSeconds: 5
   ```

## CI/CD Pipeline

### GitHub Actions Setup

1. **Repository secrets**
   ```
   DOCKER_REGISTRY_URL
   DOCKER_REGISTRY_USERNAME
   DOCKER_REGISTRY_PASSWORD
   KUBE_CONFIG_DATA
   DATABASE_URL_STAGING
   DATABASE_URL_PRODUCTION
   ```

2. **Workflow triggers**
   - Push to `main` → Production deployment
   - Push to `develop` → Staging deployment
   - Pull requests → Testing and validation

### Deployment Strategy

1. **Blue-Green Deployment**
   ```bash
   # Switch traffic gradually
   kubectl patch service feastfrenzy-frontend -p '{"spec":{"selector":{"version":"green"}}}'
   ```

2. **Rolling Updates**
   ```bash
   kubectl set image deployment/feastfrenzy-backend backend=new-image:tag
   kubectl rollout status deployment/feastfrenzy-backend
   ```

3. **Rollback Strategy**
   ```bash
   kubectl rollout undo deployment/feastfrenzy-backend
   kubectl rollout history deployment/feastfrenzy-backend
   ```

## SSL/TLS Configuration

### Certificate Management

1. **Using cert-manager**
   ```bash
   helm repo add jetstack https://charts.jetstack.io
   helm install cert-manager jetstack/cert-manager --set installCRDs=true -n cert-manager
   ```

2. **Certificate issuer**
   ```yaml
   apiVersion: cert-manager.io/v1
   kind: ClusterIssuer
   metadata:
     name: letsencrypt-prod
   spec:
     acme:
       server: https://acme-v02.api.letsencrypt.org/directory
       email: admin@feastfrenzy.com
       privateKeySecretRef:
         name: letsencrypt-prod
   ```

## Backup and Recovery

### Database Backups

1. **Automated backups**
   ```bash
   # CronJob for daily backups
   kubectl apply -f k8s/cronjobs/db-backup.yml
   ```

2. **Backup verification**
   ```bash
   # Test restore from backup
   mysql -h localhost -u root -p < backup_20240101_120000.sql
   ```

### Application Data

1. **Volume snapshots**
   ```bash
   kubectl create volumesnapshot app-data-snapshot \
     --volumesnapshotclass=csi-snapclass \
     --source-pvc=app-data-pvc
   ```

## Troubleshooting

### Common Issues

#### Container Issues
```bash
# Check container logs
docker logs <container-id>

# Debug container
docker exec -it <container-id> /bin/sh

# Check resource usage
docker stats
```

#### Kubernetes Issues
```bash
# Check pod status
kubectl get pods -o wide

# Describe problematic pod
kubectl describe pod <pod-name>

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp
```

#### Database Connection Issues
```bash
# Test database connectivity
mysql -h <host> -u <user> -p <database>

# Check connection pool
kubectl exec -it <backend-pod> -- npm run db:status
```

### Performance Troubleshooting

1. **High CPU Usage**
   ```bash
   # Check resource limits
   kubectl top pods
   kubectl describe pod <pod-name>
   ```

2. **Memory Issues**
   ```bash
   # Check memory usage
   kubectl top nodes
   kubectl top pods --sort-by=memory
   ```

3. **Database Performance**
   ```sql
   -- Check slow queries
   SHOW PROCESSLIST;
   SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
   ```

### Recovery Procedures

#### Application Recovery
1. Check health endpoints
2. Restart affected services
3. Verify database connectivity
4. Check logs for errors
5. Validate data integrity

#### Database Recovery
1. Stop application traffic
2. Restore from latest backup
3. Run integrity checks
4. Resume application traffic
5. Monitor for issues

## Security Considerations

### Network Security
- Use network policies in Kubernetes
- Configure firewall rules
- Enable HTTPS only
- Implement rate limiting

### Application Security
- Regular security scans
- Dependency updates
- Secret rotation
- Access logging

### Compliance
- Data encryption at rest
- Audit logging
- Access controls
- Regular security assessments

For additional support or questions, refer to the project documentation or contact the development team.