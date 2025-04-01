Emergency AI Assistant for Natural Disasters
Overview
The Emergency AI Assistant for Natural Disasters is a cloud-native web application that provides real-time assistance during natural disaster scenarios. The app uses artificial intelligence to analyze disaster-related data and provide valuable safety information and guidelines. The application is built using Node.js, Dockerized for containerization, and deployed via Docker Compose for consistency and scalability.

This project is part of the SIT737-2025-Prac5P task, which involves Dockerizing a simple web application and ensuring its functionality within containers. This README provides detailed instructions for setting up, building, and running the application in a Dockerized environment.

Table of Contents
Prerequisites

Setup

Dockerization

Running the Application

Health Check Implementation

Testing the Application

Pushing to GitHub

Conclusion

Prerequisites
Before running the application, ensure that the following tools are installed on your machine:

Git - For version control and repository management
Download Git

Node.js - The runtime environment to execute JavaScript code
Download Node.js

Docker - To build and run the Docker containers
Download Docker

Visual Studio Code (VSCode) - For coding and editing project files
Download VSCode

Setup
1. Clone the Repository
To begin, clone the repository to your local machine using Git:


git clone https://github.com/srii03/sit737-2025-prac5p.git
2. Navigate to the Project Directory
Change into the project directory:


cd sit737-2025-prac5p
Dockerization
1. Create a Dockerfile
Inside the project directory, create a file named Dockerfile with the following content:

Dockerfile

# Use the official Node.js image from Docker Hub
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Run the app when the container starts
CMD ["npm", "start"]
2. Create a Docker Compose File
Create a docker-compose.yml file in the same directory with the following content:

yaml

version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    container_name: emergency-ai-assistant
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      retries: 3
      start_period: 5s
      timeout: 10s
This configuration sets up a Docker container for the application, exposes port 3000, and defines a health check to ensure that the application is running properly.

3. Build the Docker Image
Once the Dockerfile is created, run the following command to build the Docker image:


docker-compose build
Running the Application
1. Start the Docker Compose Environment
To run the application in a container, use Docker Compose:


docker-compose up
This will start the container and the application. By default, the app will be accessible on http://localhost:3000.

Health Check Implementation
The Docker Compose file includes a health check configuration that ensures the application is running smoothly. If the health check fails, Docker will automatically attempt to restart the container.

The health check is configured as follows:

yaml

healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  retries: 3
  start_period: 5s
  timeout: 10s
Test: Runs the curl command to check if the /health endpoint is responding.

Interval: The health check runs every 30 seconds.

Retries: If the health check fails, it will retry up to 3 times before considering the container unhealthy.

Start period: The container will wait for 5 seconds after starting before running the health check.

Timeout: Each health check will timeout after 10 seconds.

Testing the Application
Once the application is running, you can test it by navigating to http://localhost:3000. You should see the web application serving data and responding to requests.

To test the health check, you can visit http://localhost:3000/health. A successful response confirms that the application is running correctly.

Pushing to GitHub
Once you have completed the setup and Dockerization of your application, follow these steps to push your code to GitHub.

Initialize the Git repository (if not already done):


git init
Add all the files:


git add .
Commit the changes:


git commit -m "Initial commit"
Push to GitHub:

If you haven't set up the remote repository yet, add the following:


git remote add origin https://github.com/srii03/sit737-2025-prac5p.git
Now, push your code to the main branch:


git push -u origin main
Conclusion
You have successfully Dockerized your web application and deployed it using Docker Compose. The application is now containerized and running with a health check implemented. This setup ensures that your application can be easily scaled, tested, and deployed in different environments.
