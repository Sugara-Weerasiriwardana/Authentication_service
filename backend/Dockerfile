# Use an official Node.js runtime as a parent image
FROM node:18.20.5

# Set the working directory in the container
WORKDIR /backend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 4000

# Define the command to run the application
CMD ["node", "app.js"]
