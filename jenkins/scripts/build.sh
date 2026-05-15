#!/bin/bash
set -euo pipefail

# ─── Build Script ─────────────────────────────────────────────────────────────
# Called by Jenkins pipeline Stage 4: Build Images
# Usage: ./jenkins/scripts/build.sh <ECR_REGISTRY> <IMAGE_TAG>

ECR_REGISTRY="${1:?ERROR: ECR_REGISTRY is required}"
IMAGE_TAG="${2:?ERROR: IMAGE_TAG is required}"

FRONTEND_REPO="${ECR_REGISTRY}/devops-app/frontend"
BACKEND_REPO="${ECR_REGISTRY}/devops-app/backend"

echo "========================================"
echo "  Building Docker Images"
echo "  Tag: ${IMAGE_TAG}"
echo "========================================"

echo "[1/2] Building backend image..."
docker build \
  --no-cache \
  --build-arg NODE_ENV=production \
  -t "${BACKEND_REPO}:${IMAGE_TAG}" \
  -t "${BACKEND_REPO}:latest" \
  ./app/backend

echo "[2/2] Building frontend image..."
docker build \
  --no-cache \
  -t "${FRONTEND_REPO}:${IMAGE_TAG}" \
  -t "${FRONTEND_REPO}:latest" \
  ./app/frontend

echo ""
echo "Build complete. Images:"
docker images | grep -E "devops-app|REPOSITORY"