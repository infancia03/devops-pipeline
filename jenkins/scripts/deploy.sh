#!/bin/bash
set -euo pipefail

# ─── Deploy Script ────────────────────────────────────────────────────────────
# Applies Kubernetes manifests and updates image tags
# Usage: ./jenkins/scripts/deploy.sh <ECR_REGISTRY> <IMAGE_TAG> <NAMESPACE>

ECR_REGISTRY="${1:?ERROR: ECR_REGISTRY is required}"
IMAGE_TAG="${2:?ERROR: IMAGE_TAG is required}"
NAMESPACE="${3:-devops-app}"

FRONTEND_REPO="${ECR_REGISTRY}/devops-app/frontend"
BACKEND_REPO="${ECR_REGISTRY}/devops-app/backend"

echo "========================================"
echo "  Deploying to Kubernetes"
echo "  Namespace: ${NAMESPACE}"
echo "  Image Tag: ${IMAGE_TAG}"
echo "========================================"

# Apply all manifests
echo "[1/4] Applying namespace..."
kubectl apply -f k8s/namespace.yaml

echo "[2/4] Applying database manifests..."
kubectl apply -f k8s/database/

echo "[3/4] Applying backend manifests..."
kubectl apply -f k8s/backend/

echo "[4/4] Applying frontend manifests..."
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/ingress/

# Update images to trigger rolling update
echo "Updating image tags..."
kubectl set image deployment/backend \
  backend="${BACKEND_REPO}:${IMAGE_TAG}" \
  -n "${NAMESPACE}"

kubectl set image deployment/frontend \
  frontend="${FRONTEND_REPO}:${IMAGE_TAG}" \
  -n "${NAMESPACE}"

# Wait for rollouts
echo "Waiting for backend rollout to complete..."
kubectl rollout status deployment/backend -n "${NAMESPACE}" --timeout=180s

echo "Waiting for frontend rollout to complete..."
kubectl rollout status deployment/frontend -n "${NAMESPACE}" --timeout=180s

echo ""
echo "Deployment complete. Pod status:"
kubectl get pods -n "${NAMESPACE}"