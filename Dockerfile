# Use the official Node.js 14 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your NestJS application will run (default is 3000)
EXPOSE 3000

# Set the command to start your NestJS application
CMD ["npm", "run", "start:prod"]
