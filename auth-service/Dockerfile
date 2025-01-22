# Use an official Node.js runtime as a parent image
FROM node:18.20.5

# Set the working directory in the container
WORKDIR /auth-service

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Build the React app for production
RUN npm run build

# Serve the React app using serve package
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose port 3000
EXPOSE 3000
