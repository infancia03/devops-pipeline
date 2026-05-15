# DevOps Pipeline — Jenkins + Docker + Kubernetes + AWS EC2

A production-grade CI/CD pipeline deploying a multi-container application
(React frontend, Node.js backend, PostgreSQL database) on AWS EC2.

## Architecture
- **Jenkins Server** 
- **K8s Master**     
- **K8s Worker**     
- **Amazon ECR**     

## Quick Start
1. Provision EC2 instances (see docs/phase1-aws.md)
2. Install Jenkins (phase2)
3. Bootstrap Kubernetes with kubeadm (phase4)
4. Push code → GitHub webhook triggers Jenkins → deploys to K8s

## Access the App
http://<WORKER_PUBLIC_IP>:30080
