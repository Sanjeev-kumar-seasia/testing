# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
