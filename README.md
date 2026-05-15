# DevOps Pipeline — Jenkins + Docker + Kubernetes + AWS EC2

A production-grade CI/CD pipeline deploying a multi-container application
(React frontend, Node.js backend, PostgreSQL database) on AWS EC2.

## Architecture
- **Jenkins Server** — t2.medium EC2 (CI/CD automation)
- **K8s Master**     — t2.medium EC2 (control plane)
- **K8s Worker**     — t2.micro  EC2 (workloads)
- **Amazon ECR**     — Docker image registry

## Quick Start
1. Provision EC2 instances (see docs/phase1-aws.md)
2. Install Jenkins (phase2)
3. Bootstrap Kubernetes with kubeadm (phase4)
4. Push code → GitHub webhook triggers Jenkins → deploys to K8s

## Access the App
http://<WORKER_PUBLIC_IP>:30080