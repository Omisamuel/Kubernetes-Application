This project demonstrates the deployment of a full-stack application on a Kubernetes cluster using Minikube. It includes monitoring with Prometheus, visualization with Grafana, security scanning with Snyk, and alerting with Slack. The application is packaged in Docker containers, and Helm is used for managing Kubernetes deployments.


### Table of Contents

1. Prerequisites

2. Architecture

3. Setup and Installation

   * Installing Minikube
   * Setting Up Kubernetes Cluster
   * Installing Prometheus and Grafana

4. CI/CD Pipeline

5. Deployment

   * Building Docker Images
   * Applying Kubernetes Manifests
   * Deploying with Helm

6. Monitoring and Alerts

   * Setting Up Prometheus
   * Setting Up Grafana
   * Creating Dashboards

7. Security Scanning with Snyk

   * Integrating Snyk in CI/CD
   * Interpreting Snyk Results

8. Slack Integration for Notifications

   * Setting Up Slack Notifications

9. Troubleshooting




## Prerequisites

### 1. Operating System: macOS, Linux, or Windows with WSL2.

### 2. Tools:

   * Docker
   * Kubernetes (via Minikube)
   * Helm
   * kubectl
   * GitHub Actions (for CI/CD)
   * Snyk CLI
   * Slack (for notifications)

### 3. Set up Local Environment


### 4. Accounts:

   * GitHub (for repository and CI/CD)
   * Docker Hub (for container registry)
   * Snyk (for security scanning)
   * Slack (for notifications)

### 5. Architecture

   * Frontend: Vue.js application (vue-material-kit).
   * Monitoring: Prometheus for metrics collection.
   * Visualization: Grafana for dashboards and alerts.
   * Security: Snyk for vulnerability scanning.
   * Alerting: Slack for CI/CD notifications.




### 1. Setup and Installation

**1. Local Environment**

   * Fork the Repository and clone your fork

       `git clone https://github.com/omilabs/Kubernetes-Application.git`
 

**2. Test on Local Env**

   * Run

        `npm install`
        
        `npm run dev`


**3. Create Dockerfile**

  * Stage 1: Build the Vue application

  * Stage 2: Serve the built application with Nginx


**4. Build and test the Docker image**

`docker build -t vue-material-kit . `

`docker run -p 3000:3000 vue-material-kit`



#### 2. **Installing Minikube**

   * Download and Install Minikube:
     * For macOS:
       * `curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64`
       * `sudo install minikube-darwin-amd64 /usr/local/bin/minikube`
       * `minikube version`
     
     Start Minikube Cluster:
        * `minikube start --cpus 4 --memory 8192 --vm-driver hyperkit`
        * `kubectl create namespace monitoring`
   
   * Installing Prometheus and Grafana
     * Add Helm Repositories:
     
        `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
     
        `helm repo update`
     
     * Install Prometheus Stack:
     
       `helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring `


### 2. CI/CD Pipeline

The CI/CD pipeline is configured using GitHub Actions to automate the building, testing, and deployment of the application. It includes Snyk for security scanning and Slack for notifications.

#### Pipeline Steps

  * Trigger: On push or pull request to the main branch.
  * Jobs:
    * Tests: Runs unit tests for the application.
    * Build and Push Docker Image: Builds the Docker image and pushes it to Docker Hub.
    * Security Scan: Uses Snyk to scan for vulnerabilities.
    * Deploy: Deploys the application to the Kubernetes cluster using Helm.

  #### GitHub Actions Workflow File
    
        `.github
        └── workflows
            ├── ci-cd-pipeline.yml
            ├── deploy.yml
            └── run_tests.yml`


### 3. Deployment

* Building Docker Images

    * Ensure Docker is running and Minikube is properly configured to use Docker’s environment.
  
* Applying Kubernetes Manifests

    * Deploy the application to Kubernetes by applying deployment and service manifests located in the kubernetes directory.
    
    
* Deploying with Helm

    * Use Helm charts for easy deployment and management of applications, like Prometheus for monitoring.




### 4. Monitoring and Alerts

* Setting Up Prometheus

    * Prometheus scrapes metrics from applications and Kubernetes nodes, providing detailed insights into performance and health.

* Setting Up Grafana

    * Grafana visualizes the metrics collected by Prometheus, allowing you to create dashboards and set up alerts.

      * Creating Dashboards

        1. Access Grafana:

           * Port-forward Grafana service to access the dashboard:

             * `kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring`
             * Visit http://localhost:3000 in your browser.
        
        2. Create Dashboards:
        
           * Use Prometheus queries to add panels to Grafana dashboards.

### 5. Security Scanning with Snyk

* Integrating Snyk in CI/CD

    * Snyk is used in the CI/CD pipeline to scan Docker images for vulnerabilities before deployment. 
  
    * Open SNYK Account 
      * Go to Account Settings 
      * General 
        * Copy the Token and add it to Action Repository secrets
        

### 6. Slack Integration for Notifications

Setting Up Slack Notifications

* Slack notifications are configured in the CI/CD pipeline using the Slack GitHub Action.

* Run the following command to extract AlertManager from the installed Prometheus Stack


`kubectl get all --namespace <namespace> | grep alertmanager`

`kubectl get secret -n monitoring`

`kubectl get secret alertmanager-prometheus-kube-prometheus-alertmanager -n <namespace> -o jsonpath='{.data.alertmanager\.yaml}' | base64 --decode > alertmanager.yaml`

**After updating the configuration, apply it using the same method as before:**

`kubectl create secret generic alertmanager-prometheus-kube-prometheus-alertmanager --from-file=alertmanager.yaml=alertmanager-values.yaml -n monitoring -o yaml --dry-run=client | kubectl replace -f -`

**Restart the AlertManager pod:**

`kubectl rollout restart statefulset alertmanager-prometheus-kube-prometheus-alertmanager -n  monitoring`



