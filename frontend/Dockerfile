# Use an official Node.js runtime as a base image
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Copy gsap-bonus.tgz to the working directory
COPY gsap-bonus.tgz ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Command to run the application
RUN npm run build

# Command to run the application
CMD ["npm", "run", "start"]
