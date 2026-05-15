#!/bin/bash
set -euo pipefail

# ─── Test Script ──────────────────────────────────────────────────────────────
# Runs tests for backend and frontend before building images
# Usage: ./jenkins/scripts/test.sh

echo "========================================"
echo "  Running Test Suites"
echo "========================================"

echo "[1/2] Backend tests..."
cd app/backend
npm ci
npm run test:ci
cd ../..

echo "[2/2] Frontend tests..."
cd app/frontend
npm ci
npm test -- --watchAll=false --ci --passWithNoTests
cd ../..

echo ""
echo "All tests passed!"